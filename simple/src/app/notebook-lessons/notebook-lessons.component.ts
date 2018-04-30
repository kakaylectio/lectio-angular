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
		  private route:  ActivatedRoute, 
		  private dialog: MatDialog,
		  private notebookService:  NotebookService ) {

  }

  
  ngOnInit() {
	  
      this.notebookService.getNotebookRep().subscribe(notebookRep => {
    	  if (notebookRep) {
	          this.notebookId = notebookRep.notebook.id;
	          console.log("Notebook-lessons has params = " + JSON.stringify(this.notebookId));
			  this.showTopicsWithLesson(this.notebookId);
	    	 }

      });
  }
  
  
  showTopicsWithLesson(notebookId: number) {
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
	  			console.log("Error getting active topics with lessons. " + JSON.stringify(error.error));
	  		}
	  	);
  }
  
  rescanTopicList() {
	  console.log("NotebookLessonsComponent.subscription.closed = " + this.notebookRepSubscription.closed);
	  //this.showTopicsWithLesson(this.notebookId);
  }
  

}
