import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

class EmailPassword{
	  public email: string;
	  public password:string;
}

class LoginResponse{
	public token: string;
	public name: string;
    public expiration: string;
}


@Injectable()
export class LoginService {
	  
  private configUrl: string;
  

  constructor(private httpClient: HttpClient) { 
	  this.configUrl = 'http://localhost:8888';
	  
  }
  
  getToken(): string {
	  var token : string;
	  token = localStorage.getItem('token');
	  
	  // TODO:  Check if token is expired. If expired, clear the local storage
	  // and set it to null;
	  return token;
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
	  				if (loginResponse) {
	  					localStorage.setItem('token', loginResponse.token);
	  				}
	  		});
	  	return observable;
	  }

}
