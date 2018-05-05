import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { LectioBackendService } from '../lectio-backend.service';
import { NotebookRep } from '../model/notebookrep';
import { User } from '../model/user';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(private loginService: LoginService, 
		  private backendService: LectioBackendService, private router:  Router) { }

  ngOnInit() {
	  console.log("Logging in");
	  this.loginService.getUserObservable().subscribe(
			  user => { 
				  if (user) 
			  	{
				  			this.onUserLoggedIn(user);
			  	}
				  else {
					  this.router.navigate(['/login']);
				  }
			  },
			  error => {console.log("Error logging in." + JSON.stringify(error));}
			  );
//	  this.loginService.login('aral@vorkosigan.com', 'cordelia');
//	  this.loginService.login('miles@dendarii.com', 'naismith', this.onUserLoggedIn);

  }
  
  onUserLoggedIn = (user:User) => 
     {
    	 if (user) {
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

}
