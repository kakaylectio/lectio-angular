import { Injectable } from '@angular/core';
import { Topic, Lesson, Notebook } from './model/lectio-model.module';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Subject, BehaviorSubject } from 'rxjs/Rx';
import { LectioBackendService } from './lectio-backend.service';
import { NotebookService} from './notebook/notebook.service';

// When information about a notebook is retrieved, the last lesson on each topic is also retrieved.
// Sometimes, when the last lesson is at today's date, the second last lesson is already retrieved.
// For efficiency, when user requests all lesson notes to be retrieved for a topic, it is inefficient
// to retrieve the last two lessons again.  This service is to cache the last two lessons to save
// the lessons from retrieval again.

// The Notebook with Active Topics view calls setData to set what it knows about the lessons.
// This service is a Resolve object that is used in the app routing.    
// The Topic History component subscribes to the route data to retrieve this object.

// I don't like this implementation.  I want to change this to use Subject Observables instead.
@Injectable()
export class TopicCacheService {
  private topic : Topic;
  private lessonList : Lesson[] = [];
  private lastLesson : Lesson;
  private secondLastLesson : Lesson;
  private notebook : Notebook;
  
  // nextLesson is retrieved but not pushed as part of the observable because
  // it is used to test whether or not there are more Lessons after the last lesson.
  // If nextLesson is null, that means there are no more lessons.
  private nextLesson : Lesson;  
  
  private topicObservable : BehaviorSubject <{topic : Topic, lessonList: Lesson[], hasMoreLessons : boolean, notebook : Notebook}> 
	  = new BehaviorSubject(
		  {
		  topic: undefined, 
		  lessonList: [],
		  hasMoreLessons: false,
		  notebook : undefined}
	  );
	
  constructor(private lectioBackendService : LectioBackendService,
		  private notebookService: NotebookService) { }
  
  // Checks that this service is set to the right topic.  If not, then change topic.
  setTopicId(topicId : number) {
  	if (this.topic) {
  		if (this.topic.id == topicId) {
  			// This service is already set to the correct ID.  So return.
  			return;
  		}
  	}
  	
  	// This service is not set to the right topic.  So find the topic and set up the service.
	this.lectioBackendService.findTopicByIdWithNotebook(topicId).subscribe(
		data =>{
			console.log("topicCacheService calling lectioBackendService.findTopicById = " +JSON.stringify(data));
			this.setData(data, null, null);
 		},
		 error => {
		 	console.log("Error finding topic by ID " + topicId);
		 });

  }
  
  setData (  theTopic : Topic, theLastLesson : Lesson, theSecondLastLesson : Lesson ) : void {
	  this.topic = theTopic;

	  this.notebookService.getNotebookRep().subscribe( 
		  notebookRep=> {
			  // Make sure the topic is in sync with the notebook in NotebookService.
			  if (notebookRep) {
				  console.log("topic-cache-service ")
				  console.log("  notebookService.notebookRep.notebook.id = " + this.notebookService.notebookRep.notebook.id);
				  console.log("  theTopic.notebook = " + theTopic.notebook);
				  this.notebook = notebookRep.notebook;
				  if (theTopic.notebook.id != notebookRep.notebook.id) {
					  this.topicObservable.error("Wrong URL containing notebook ID " + notebookRep.notebook.id + " and topic ID " 
							  + theTopic.id + " combination.");
					  return;
				  }
				  
				  this.lessonList = []; 
				  if (theLastLesson) {
				     this.lessonList.push(theLastLesson);
				  }
				  if (theSecondLastLesson) {
				  	  this.lessonList.push(theSecondLastLesson);
				  }
				  this.topicObservable.next({topic: this.topic, lessonList: this.lessonList, hasMoreLessons: true, notebook: this.notebook});
				  this.loadMoreLessons();
				  
				  this.lastLesson = theLastLesson;
				  this.secondLastLesson = theSecondLastLesson;
			  }
		  },
	      error => {
	    	  this.topicObservable.error(error);
	      });

  }
  
  getTopicLessonObservable() {
  	return this.topicObservable;
  } 
  
  loadMoreLessons() :void {
  	  this.nextLesson = undefined;
	  this.lectioBackendService.findLessons(this.topic.id, this.lessonList.length, 6).subscribe(
		 data => {
			 data.forEach((lesson, index) => {
				 if (index < 6-1) {
					 this.lessonList.push(lesson);
				 }
				 else {
					 this.nextLesson = lesson;
				 }
			 });// End of forEach
			 this.topicObservable.next({
			 	topic: this.topic, 
			 	lessonList : this.lessonList, 
			 	hasMoreLessons: !(this.nextLesson == null),
			 	notebook: this.notebook});
				
		 },  // end of data=>
		 error => {
			 console.log("Error retrieving more lessons.");
		 }
	  );// end of subscribe
  }

}


