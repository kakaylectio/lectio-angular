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
	  this.path = '/lectio/notebook/371/activetopics/withlessons';
	  this.username = 'aral@vorkosigan.com';
	  this.password = 'cordelia';
  }
  
  
  

  getActiveTopicsWithLessons(): Observable<NotebookRep> {
    var tokenEncodedString: string;
  	
  	
    tokenEncodedString = this.loginService.getToken();
    
    var httpOptions = {headers:  new HttpHeaders ({
    	'Content-Type': 'application/json',
//    	'Authorization': 'Basic ' + encodedString,
    	'Authorization': 'Token ' + tokenEncodedString
    	})};
  	return this.httpClient.get<NotebookRep>(this.configUrl + this.path, httpOptions);
  }
}
