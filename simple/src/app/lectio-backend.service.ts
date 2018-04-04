import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NotebookRep } from './model/notebookrep';

@Injectable()
export class LectioBackendService {

	configUrl:string;
	path: string;
	username: string;
	password: string;

	

  constructor(private httpClient: HttpClient) {
	  this.configUrl = 'http://localhost:8888';
	  this.path = '/lectio/notebook/3/activetopics/withlessons';
	  this.username = 'aral@vorkosigan.com';
	  this.password = 'cordelia';
  }

  getActiveTopicsWithLessons(): Observable<NotebookRep> {
	var  encodedString: string;
    encodedString = btoa(this.username + ":" + this.password);
    var httpOptions = {headers:  new HttpHeaders ({
    	'Content-Type': 'application/json',
    	'Authorization': 'Basic ' + encodedString,
    })};
  	return this.httpClient.get<NotebookRep>(this.configUrl + this.path, httpOptions);
  }
}
