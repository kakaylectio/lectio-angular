import { Injectable } from '@angular/core';
import { Topic } from './model/topic';
import { Lesson } from './model/lesson';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class TopicCacheService implements Resolve<{topic:Topic, lastLesson:Lesson, secondLastLesson:Lesson}>{
  private topic : Topic;
  private lastLesson : Lesson;
  private secondLastLesson : Lesson;
	
  constructor() { }
  
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
  	  
  	  // TODO:  Get the topic.
	 let newTopic : Topic;
  	  newTopic = new Topic();
     newTopic.id = topicId;
     newTopic.name = "Bogus Name";
     return of({topic:newTopic, lastLesson: undefined, secondLastLesson: undefined});
  }

}

@Injectable()
export class LastLessonResolver implements Resolve<Lesson>{
	constructor(private topicCacheService : TopicCacheService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Lesson> {
  	  let topicId = route.params.topicId;
  	  if (this.topicCacheService.getTopic().id == topicId) {
  	  		return of(this.topicCacheService.getLastLesson());
	  }  	  
		
	}
}

@Injectable()
export class SecondLastLessonResolver implements Resolve<Lesson>{
	constructor(private topicCacheService : TopicCacheService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Lesson> {
  	  let topicId = route.params.topicId;
  	  if (this.topicCacheService.getTopic().id == topicId) {
  	  		return of(this.topicCacheService.getSecondLastLesson());
	  }  	  
		
	}
}
