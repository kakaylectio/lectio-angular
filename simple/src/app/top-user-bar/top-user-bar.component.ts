import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule} from '@angular/flex-layout';
import { User } from '../model/lectio-model.module';
import { LoginService } from '../login.service';
import { LectioNgMatModule } from '../lectio-ng-mat/lectio-ng-mat.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-user-bar',
  templateUrl: './top-user-bar.component.html',
  styleUrls: ['./top-user-bar.component.css']
})
export class TopUserBarComponent implements OnInit {
  user: User;
  constructor(private loginService : LoginService, private router : Router) { }

  ngOnInit() {
	  this.loginService.getUserObservable().subscribe( activeUser => {
		  this.setUser(activeUser);
	  });
  }

  setUser(user) :void {
	  this.user = user;
	  console.log(JSON.stringify(this.user));

	  if (!this.user) {;
		  	console.log("Redirecting to login page.")
		 	 this.router.navigate(['/login']);

	  }
  }
  
  onLogoutClicked() : void{
	  console.log("Logging out.");
	  this.loginService.logout();
  }
}
