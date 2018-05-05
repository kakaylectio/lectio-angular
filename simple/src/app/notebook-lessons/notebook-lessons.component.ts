import { Component, OnInit, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LectioBackendService } from '../lectio-backend.service';
import { Router,ActivatedRoute  } from '@angular/router';
import { FlexLayoutModule} from '@angular/flex-layout';
import { LectioNgMatModule } from '../lectio-ng-mat/lectio-ng-mat.module';
import { Topic, User, Notebook, NotebookRep } from '../model/lectio-model.module';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { NewTopicDialogComponent } from '../new-topic-dialog/new-topic-dialog.component';
import { NotebookService } from '../notebook/notebook.service';
import { Subscription } from 'rxjs/Subscription';
import { TopUserBarComponent } from '../top-user-bar/top-user-bar.component';

@Component({
  selector: 'app-notebook-lessons',
  templateUrl: './notebook-lessons.component.html',
  styleUrls: ['./notebook-lessons.component.css']
})


// NotebookLessonsComponent contains the listing of all active topics
// and their last lesson in a notebook.  This is where lessons can be added to a topic.
export class NotebookLessonsComponent implements OnInit {
  notebookData : string;
  notebook : Notebook;
  notebookId : number;
  topicList : Topic[];
  role : string;
  notebookRepSubscription : Subscription;

  
  constructor( 
		  private lectioBackendService : LectioBackendService,
		  private router: Router,
		  private route:  ActivatedRoute, 
		  private dialog: MatDialog,
		  private notebookService:  NotebookService ) {

  }

  
  ngOnInit() {
	  
	  this.notebookRepSubscription = this.notebookService.getNotebookRep()
	  	.subscribe(response => 
	  		{
	  			if (response) {
		  			var notebookRep : NotebookRep = response;
		  			this.notebook = notebookRep.notebook;
		  			this.notebookId = this.notebook.id;
		  			this.topicList = notebookRep.topicList;	
		  			this.role = notebookRep.userRole;
		  			console.log("showTopicsWithLesson received topic list with " + this.topicList.length + " items.");
	  			}
	  		},
	  		error => {
	  			if (error.status == 401) {
	  				console.log("Unauthorized access.");
	  				this.router.navigate(['/login']);
	  			}
	  			else {
	  				console.log("Error getting active topics with lessons. " + JSON.stringify(error));
	  			}
	  		}
	  	);
  }
  
  newTopicClicked(preError: string) : void {
	  const dialogConfig = new MatDialogConfig();
	  dialogConfig.autoFocus = true;
	  dialogConfig.data = {preError: preError };
	  console.log(JSON.stringify(dialogConfig));
	  const dialogRef = this.dialog.open(NewTopicDialogComponent, dialogConfig);
	  dialogRef.afterClosed().subscribe(
			  data => {
				  if (data) {
					  if (data.topicName) {
						  let subscription : Subscription;
						  subscription = this.notebookService.getTopicCreateError().subscribe(
								  
								  error => {
									  subscription.unsubscribe();
									  console.log(JSON.stringify(error));
									  console.log("error.status = " + error.status);
									  if (error.status){
										  if (error.status == 409) {
											  // Constraint violation.  Reopen the dialog with the error message.
											  this.newTopicClicked(error.error);
											  return;
										  }
									  }
									  console.log( error.message);
								  }
								  );
						  this.notebookService.createTopic(data.topicName);
					  }
			  	  }
			  }

	  );

  }
  
  rescanTopicList() {
	  console.log("NotebookLessonsComponent.subscription.closed = " + this.notebookRepSubscription.closed);
  }
  

}
