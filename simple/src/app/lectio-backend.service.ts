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
	  this.configUrl = 'http://localhost:8888';
	  this.username = 'aral@vorkosigan.com';
	  this.password = 'cordelia';
  }
  
 getHttpOptions() {
	 let options = {};
	 options['headers'] = this.loginService.getHttpHeaders();
	 return (options);
 } 
  
  getUserNotebooks():Observable<NotebookRep[]> {
	  let userId = this.loginService.getUser().id;
	  let path = '/lectio/user/' + userId + '/notebooks';
	  return this.httpClient.get<NotebookRep[]>(this.configUrl + path, this.getHttpOptions());
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
  
}
