import { Component, OnInit, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LectioBackendService } from '../lectio-backend.service';
import { Router,ActivatedRoute  } from '@angular/router';
import { FlexLayoutModule} from '@angular/flex-layout';
import { LectioNgMatModule } from '../lectio-ng-mat/lectio-ng-mat.module';
import { Topic, User, Notebook, NotebookRep } from '../model/lectio-model.module';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { NewTopicDialogComponent } from '../new-topic-dialog/new-topic-dialog.component';

@Component({
  selector: 'app-notebook-lessons',
  templateUrl: './notebook-lessons.component.html',
  styleUrls: ['./notebook-lessons.component.css']
})


// NotebookLessonsComponent contains the listing of all active topics
// and their last lesson in a notebook.  This is where lessons can be added to a topic.
export class NotebookLessonsComponent implements OnInit {
  private notebookData : string;
  private notebook : Notebook;
  private notebookId : number;
  private topicList : Topic[];
  private role : string;
  

  
  constructor(private lectioBackendService: LectioBackendService, 
		  private route:  ActivatedRoute, 
		  private dialog: MatDialog) {

  }

  
  ngOnInit() {
      this.route.params.subscribe(params => {

          this.notebookId = params['notebookId'];
		  this.showTopicsWithLesson(this.notebookId);

      });
  }
  
  
  showTopicsWithLesson(notebookId: number) {
	  this.lectioBackendService.getActiveTopicsWithLessons(notebookId)
	  	.subscribe(response => 
	  		{
	  			var notebookRep : NotebookRep = response;
	  			this.notebook = notebookRep.notebook;
	  			this.notebookId = this.notebook.id;
	  			this.topicList = notebookRep.topicList;	
	  			this.role = notebookRep.userRole;
	  			console.log("showTopicsWithLesson received topic list with " + this.topicList.length + " items.");
	  		},
	  		error => {
	  			console.log("Error getting active topics with lessons. " + JSON.stringify(error.error));
	  		}
	  	);
  }
  
  rescanTopicList() {
	  this.showTopicsWithLesson(this.notebookId);
  }
  
  newTopicClicked(preError: string) {
	  console.log("newTopicClicked preError = " + preError);
	  const dialogConfig = new MatDialogConfig();
	  dialogConfig.autoFocus = true;
	  dialogConfig.data = {preError: preError };
	  console.log(JSON.stringify(dialogConfig));
	  const dialogRef = this.dialog.open(NewTopicDialogComponent, dialogConfig);
	  
	  dialogRef.afterClosed().subscribe(
			  data => {
				  if (data) {
					  if (data.topicName) {
						  this.lectioBackendService.createTopic(this.notebookId, data.topicName).subscribe(
						     createTopicData => {
						    	 this.topicList.splice(0, 0, createTopicData);
						     },
						     createTopicError => {
						    	 if (createTopicError.status) {
						    		 if (createTopicError.status == 409) {
						    			 if (createTopicError.error) {
						    				 this.newTopicClicked(createTopicError.error);
						    			 }
						    		 }
						    	 }
						    	 console.log("Create topic had an error. ", JSON.stringify(createTopicError));
						     }
						  );
					  }
			  	  }
			  }
	  );
  }
  
  
  

}
