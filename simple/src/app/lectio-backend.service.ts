import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NotebookRep } from './model/notebookrep';
import { LoginService } from './login.service';

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
	 return ({'headers': this.loginService.getHttpHeaders()});
 } 
  
  getUserNotebooks():Observable<NotebookRep[]> {
	  let userId = this.loginService.getUser().id;
	  let path = '/lectio/user/' + userId + '/notebooks';
	  let httpOptions = {'headers':this.loginService.getHttpHeaders()};
	  return this.httpClient.get<NotebookRep[]>(this.configUrl + path, this.getHttpOptions());
  }
  

  getActiveTopicsWithLessons(notebookId: number): Observable<NotebookRep> {
  	   let path = '/lectio/notebook/' + notebookId + '/activetopics/withlessons';
  	   return this.httpClient.get<NotebookRep>(this.configUrl + path, this.getHttpOptions());
  }
}
