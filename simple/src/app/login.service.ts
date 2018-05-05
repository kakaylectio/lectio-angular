import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { User } from './model/user';
import { Subject, BehaviorSubject } from 'rxjs/Rx';


class EmailPassword{
	  public email: string;
	  public password:string;
}

class LoginResponse{
	public token: string;
	public name: string;
    public expiration: string;
	public userId: number;
}


@Injectable()
export class LoginService {
	  
  private configUrl: string;
  private user: User;
  private httpHeaders: HttpHeaders;
  userObservable : BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private httpClient: HttpClient) { 
	  this.configUrl = 'http://localhost:8888';
	  
	  let username = localStorage.getItem('username');
	  let userid = localStorage.getItem('userid');
	  this.user = null;

	  if (username != null && userid != null)  {
		  this.user = new User();
		  this.user.name = username;
		  this.user.id = parseInt(userid);
	  }
	  let token = this.getToken();
	  if (token == null) {
	  	this.httpHeaders = new HttpHeaders();
	  }
	  else {
		  this.httpHeaders = new HttpHeaders({
				  	'Content-Type': 'application/json',
				  	'Authorization': 'Token ' + token
		  });
		  
	  }
	  if (this.user != null) {
		  this.userObservable.next(this.user);
	  }	
  }
  
  getHttpHeaders() : HttpHeaders  {
	  return this.httpHeaders;
  }
  
  
  getUser(): User {
	  return this.user;
  }
  
  getUserObservable(): BehaviorSubject<User> {
	  return this.userObservable;
  }
  
  private getToken(): string {
	  var token : string;
	  token = localStorage.getItem('token');
	  
	  // TODO:  Check if token is expired. If expired, clear the local storage
	  // and set it to null;
	  return token;
  }
  
  private handleError(error: HttpErrorResponse) {
	  console.log("Handling problem.")
	  if (error.status == 401) {
		  console.log("Clearing token.");
		  localStorage.removeItem('token');
		  this.user = null;
		  this.userObservable.next(this.user);
		  return new ErrorObservable("Login failed.");
		  
	  }

	  return new ErrorObservable("Error from http ${error.error}");
  }

  public login(email: string, password: string, callback:(this: void, userParam: User) => void): Observable<LoginResponse> {
	   var emailPassword : EmailPassword;
       emailPassword = new EmailPassword();
   		emailPassword.email = email;
   		emailPassword.password = password;
   		var observable: Observable<LoginResponse>;
   		console.log("About to post.");
	  	observable =  this.httpClient.post<LoginResponse>(this.configUrl + '/login', emailPassword);
	  	console.log("About to subscribe.");
	  	observable.subscribe(loginResponse => {
	  				console.log("Response received.");
	  				if (loginResponse) {
	  					this.setupUser(loginResponse);
	  					this.user.email = email;
	  					callback(this.user);
	  				}
	  			},
	  			error => {
					console.log("Error logging in.", error.error);
					this.handleError(error);
				}
	  	)
	  	return observable;
	  }
  
  setupUser (loginResponse: LoginResponse) :void{
	  if (loginResponse == null) {
		  localStorage.removeItem('token');
		  this.user = null;
		  this.httpHeaders = new HttpHeaders();
	  }
	  else {
			console.log("Storing token.");
			localStorage.setItem('token', loginResponse.token);
			localStorage.setItem('username', loginResponse.name);
			localStorage.setItem('userid', "" + loginResponse.userId);
			this.user = new User();
			this.user.name = loginResponse.name;
			this.user.id = loginResponse.userId;
			this.httpHeaders = new HttpHeaders(
					{
					  	'Content-Type': 'application/json',
					  	'Authorization': 'Token ' + loginResponse.token
					 });
			console.log("loginResponse.userId = " + loginResponse.userId);
			console.log("user.id = " + this.user.id);
    		  this.userObservable.next(this.user);
	  }
  }
  
  logout() : void {
		localStorage.removeItem('token');
		localStorage.removeItem('username');
		localStorage.removeItem('userid');
	  	this.httpHeaders = new HttpHeaders();

		
		this.user = null;
        this.userObservable.next(this.user);
  }
		  

}
