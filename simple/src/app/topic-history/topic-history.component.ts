import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LectioBackendService } from '../lectio-backend.service';
import { TopicCacheService } from '../topic-cache.service';
import {Location} from '@angular/common';
import { LectioNgMatModule } from '../lectio-ng-mat/lectio-ng-mat.module';
import { Topic, Lesson } from '../model/lectio-model.module';
import { NotebookService } from '../notebook/notebook.service';

@Component({
  selector: 'app-topic-history',
  templateUrl: './topic-history.component.html',
  styleUrls: ['./topic-history.component.css']
})
export class TopicHistoryComponent implements OnInit {

  @Input() topic : Topic;
  hasMoreLessons : boolean;
  lessonList : Lesson[];

  constructor(  private route: ActivatedRoute,
		  private router: Router,
		  private lectioBackendService : LectioBackendService,
		  private topicCacheService : TopicCacheService ,
		  private notebookService: NotebookService,
		  private _location: Location) { 
	  
  }

  ngOnInit() {
	  if (this.topic) {
		  console.log("TopicHistoryComponent ngOnInit has topic.");
		  this.fillList(this.topic.id);
	  }
	  else {
		  this.route.params.subscribe(params => {
			  console.log('TopicHistoryComponent route params');
	    	  let topicId : number;
	    	  topicId = params['topicId'];
	    	  this.fillList(topicId);
	      });
	  }
	  
  }
  
  loadMoreLessons() : void {
	  this.topicCacheService.loadMoreLessons();
  }
  
  fillList(topicId : number) : void{
	  this.topicCacheService.checkTopicId(topicId);
	  this.topicCacheService.getTopicLessonObservable().subscribe(
			  data => {
				  this.topic = data['topic'];
				  this.lessonList = data['lessonList'];
				  this.hasMoreLessons = data['hasMoreLessons'];
			  }
	  );
  }
  
  
  clickBack():void {
	  this._location.back();
  }

}
