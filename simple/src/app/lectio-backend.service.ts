import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NotebookRep } from './model/notebookrep';
import { LoginService } from './login.service';
import { Lesson } from './model/lesson';
import { Topic } from './model/topic';

@Injectable()
export class LectioBackendService {

	configUrl:string;
	path: string;
	username: string;
	password: string;

 
  constructor(private httpClient: HttpClient, private loginService: LoginService) {
	  this.configUrl = 'https://localhost:8889';
	  this.username = 'aral@vorkosigan.com';
	  this.password = 'cordelia';
  }
  
 getHttpOptions() {
	 let options = {};
	 options['headers'] = this.loginService.getHttpHeaders();
	 return (options);
 } 
  
  getUserNotebooks():Observable<NotebookRep[]> {
	  let user = this.loginService.getUser();
	  if (user) {
		  let userId = this.loginService.getUser().id;
		  let path = '/lectio/user/' + userId + '/notebooks';
		  return this.httpClient.get<NotebookRep[]>(this.configUrl + path, this.getHttpOptions());
	  }
	  else {
		  return null;
	  }
  }
  

  getActiveTopicsWithLessons(notebookId: number): Observable<NotebookRep> {
  	   let path = '/lectio/notebook/' + notebookId + '/activetopics/withlessons';
  	   return this.httpClient.get<NotebookRep>(this.configUrl + path, this.getHttpOptions());
  }
  
  createLesson(topicId: number, content: string): Observable<Lesson> {
 	   let path = '/lectio/topic/' + topicId + '/createlessonnote';
 	   return this.httpClient.post<Lesson>(this.configUrl + path, {'content': content}, this.getHttpOptions());
  }
  
  updateLesson(lessonId: number, content: string): Observable<Lesson> {
	   let path = '/lectio/lessonnote/' + lessonId + '/updatecontent';
 	   return this.httpClient.post<Lesson>(this.configUrl + path, {'content': content}, this.getHttpOptions());
  }
  
  // Topic ID is the topic to which the lesson belongs.
  // Lesson ID is the lesson right after the one that you're searching for.
  findLessonBefore(topicId: number, lessonId: number): Observable<Lesson> {
	  let path = '/lectio/topic/' + topicId + "/findlessonnote";
	  let httpOptions = this.getHttpOptions();
	  let query = new HttpParams().set('afterid',lessonId.toString());
	  httpOptions['params'] =  query;
	  return this.httpClient.get<Lesson>(this.configUrl + path, httpOptions);
  }
  
  // Get the whole history in pages.
  findLessons(topicId: number, startIndex: number, numLessons: number) : Observable<Lesson[]> {
	  let path = '/lectio/topic/' + topicId + "/findlessonnotes";
	  let httpOptions = this.getHttpOptions();
	  let query = new HttpParams().set('startindex', startIndex.toString());
	  query = query.set('numitems', numLessons.toString());
	  httpOptions['params'] = query;
	  return this.httpClient.get<Lesson[]>(this.configUrl + path, httpOptions);
  }
  
  findTopicById(topicId:number) : Observable<Topic> {
	  let path = '/lectio/topic/' + topicId + "/findtopicbyid";
	  let httpOptions = this.getHttpOptions();
	  return this.httpClient.get<Topic>(this.configUrl + path, httpOptions);
  }
  
  findTopicByIdWithNotebook(topicId:number) : Observable<Topic> {
	  let path = '/lectio/topic/' + topicId + "/findtopicbyid/withnotebook";
	  let httpOptions = this.getHttpOptions();
	  return this.httpClient.get<Topic>(this.configUrl + path, httpOptions);
  }
  archiveTopic(topicId:number) : Observable<Topic> {
	  let path = '/lectio/topic/' + topicId + '/archive';
	  let httpOptions = this.getHttpOptions();
	  return this.httpClient.post<Topic>(this.configUrl + path, {}, httpOptions);
  }
  
  createTopic(notebookId:number, topicName:string) : Observable<Topic> {
	  let path = '/lectio/notebook/' + notebookId + '/createtopic';
	  let httpOptions = this.getHttpOptions();
	  return this.httpClient.post<Topic>(this.configUrl+path, topicName, httpOptions);
  }
  
}
