import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Topic } from '../model/topic';
import { Lesson } from '../model/lesson';
import { LectioBackendService } from '../lectio-backend.service';
import { TopicCacheService } from '../topic-cache.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {Location} from '@angular/common';
import { LectioNgMatModule } from '../lectio-ng-mat/lectio-ng-mat.module';

@Component({
  selector: 'app-topic-history',
  templateUrl: './topic-history.component.html',
  styleUrls: ['./topic-history.component.css']
})
export class TopicHistoryComponent implements OnInit {

  @Input() topic : Topic;
  @Input() lastLesson : Lesson;
  @Input() secondLastLesson : Lesson;
  private nextLesson : Lesson;
  private lessonList : Lesson[];

  constructor(  private route: ActivatedRoute,
		  private router: Router,
		  private lectioBackendService : LectioBackendService,
		  private topicCacheService : TopicCacheService ,
		  private _location: Location) { 
	  
  }

  ngOnInit() {
	  
	  this.route.data.subscribe((data: {topic:Topic, lastLesson:Lesson, secondLastLesson:Lesson}) => {
		  console.log("Data resolved." + JSON.stringify(data));
		  let topicCache =  data['topicCache'];
		  this.topic = topicCache['topic'];
		  if (!this.topic) {
			  // Topic was not cached.  So retrieve the topic and 
			  // fill out the list.
			 let topicId = this.route.snapshot.params.topicId;
			 this.lectioBackendService.findTopicById(topicId).subscribe(data =>{
					 	this.topic = data;
					 	if (this.topic) {
  						  this.lessonList = [];
  						  this.nextLesson = undefined;
					 		this.fillList();
					 	}
			 		},
					 error => {
					 	console.log("Error finding topic by ID " + topicId);
					 });

		  }
		  else {
			  // Topic was cached.  Retrieve last lesson and second last lesson in case
			  // those were cached as well.  Topics are cached when they were already
			  // retrieved from listing topics in notebook view.
			  this.lastLesson = topicCache['lastLesson'];
			  this.secondLastLesson = topicCache['secondLastLesson'];
			  this.lessonList = [];
			  this.nextLesson = undefined;
			  if (this.lastLesson) {
				  this.lessonList.push(this.lastLesson);
			  }
			  if (this.secondLastLesson) {
				  this.lessonList.push(this.secondLastLesson);
			  }
			  this.fillList();
	  	}
	  });



  }
  
  fillList() {
	 if (this.nextLesson) {
		 this.lessonList.push(this.nextLesson);
		 this.nextLesson = undefined;
	 }
	  this.lectioBackendService.findLessons(this.topic.id, this.lessonList.length, 6).subscribe(
		 data => {
			 data.forEach((lesson, index) => {
				 if (index < 6-1) {
					 this.lessonList.push(lesson);
				 }
				 else {
					 this.nextLesson = lesson;
				 }
			 });
		 },
		 error => {
			 console.log("Error retrieving more lessons.");
		 }
	  );
  }
  
  clickBack():void {
	  this._location.back();
  }

}
