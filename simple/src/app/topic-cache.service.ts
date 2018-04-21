import { Injectable } from '@angular/core';
import { Topic } from './model/topic';
import { Lesson } from './model/lesson';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { LectioBackendService } from './lectio-backend.service';

@Injectable()
export class TopicCacheService implements Resolve<{topic:Topic, lastLesson:Lesson, secondLastLesson:Lesson}>{
  private topic : Topic;
  private lastLesson : Lesson;
  private secondLastLesson : Lesson;
	
  constructor(private lectioBackendService : LectioBackendService) { }
  
  setData ( theTopic : Topic, theLastLesson : Lesson, theSecondLastLesson : Lesson ) : void {
	  this.topic = theTopic;
	  this.lastLesson = theLastLesson;
	  this.secondLastLesson = theSecondLastLesson;
  }
  
  getTopic () : Topic {
	  return this.topic;
  }
  
  getLastLesson() : Lesson {
	  return this.lastLesson;
  }
  
  getSecondLastLesson() : Lesson {
	  return this.secondLastLesson;
  }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{topic:Topic, lastLesson:Lesson, secondLastLesson:Lesson}> {
	  let retrievingTopic : Topic;
  	  let topicId = route.params.topicId;
  	  if (this.topic) {
  		  if (this.topic.id == topicId) {
  		  		console.log("topic-cache-service this.topic.id = " + this.topic.id);
  		  		console.log("last lesson = " + this.lastLesson);
  			  return of({topic:this.topic, lastLesson: this.lastLesson, secondLastLesson: this.secondLastLesson});
  		  }
  	  }
  	  else {
  	  	return of({topic:undefined, lastLesson: undefined, secondLastLesson: undefined});
  	  }
  	  
  }

}


