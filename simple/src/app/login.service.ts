import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { User } from './model/user';


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

  constructor(private httpClient: HttpClient) { 
	  this.configUrl = 'http://localhost:8888';
	  this.user = null;
  }
  
  getToken(): string {
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
		  return new ErrorObservable("Login failed.");
	  }

	  return new ErrorObservable("Error from http ${error.error}");
  }

  public login(email: string, password: string): Observable<LoginResponse> {
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
	  					console.log("Storing token.");
	  					localStorage.setItem('token', loginResponse.token);
	  					this.user = new User();
	  					this.user.name = loginResponse.name;
	  					this.user.email = email;
	  					this.user.id = loginResponse.userId;
	  				}
	  		});
	  	observable.pipe(
	  		      catchError(this.handleError)
	  	    );;
	  	return observable;
	  }

}
