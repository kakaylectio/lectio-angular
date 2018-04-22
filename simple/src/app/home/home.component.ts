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
	  this.loginService.login('aral@vorkosigan.com', 'cordelia', this.onUserLoggedIn);
//	  this.loginService.login('miles@dendarii.com', 'naismith', this.onUserLoggedIn);
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
				 	 this.router.navigate(['/notebookview', notebookRep.notebook.id]);
				 } 
			  },
			  error => {
				  console.log("Error getting user notebooks. " + error.error);
			  }
	  );
	  
	  console.log("About to navigate to lessons");
	  this.router.navigate(['/notebookview']);
	  
  }

}
