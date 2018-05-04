import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../login.service';
import { LectioBackendService } from '../lectio-backend.service';
import { NotebookRep, User } from '../model/lectio-model.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	email: string;
	password: string;
  constructor(private loginService: LoginService, 
		  private backendService: LectioBackendService,
		  private router:  Router) { }

  ngOnInit() {
  }

  login() {
	  console.log("Log in email = " + this.email + " password = " + this.password);
	  this.loginService.login(this.email, this.password, this.onUserLoggedIn);

  }
  
  onUserLoggedIn = (user:User) => 
  {
	  // For now, assume that the user has access to only one notebook
	  // and go into that notebook.
	  this.backendService.getUserNotebooks ().subscribe(
			  data => {
				 if (data.length > 0) {
					 let notebookRep : NotebookRep;
				 	 notebookRep = data[0];
				 	 console.log("The notebook id is " + notebookRep.notebook.id);
				 	 this.router.navigate(['/notebook', notebookRep.notebook.id]);
				 	 console.log("navigated");
				 } 
			  },
			  error => {
				  console.log("Error getting user notebooks. " + error.error);
			  }
	  );
}

}
