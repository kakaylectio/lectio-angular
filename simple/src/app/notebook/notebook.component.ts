import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute  } from '@angular/router';
import { Notebook, NotebookRep } from '../model/lectio-model.module';
import { LectioBackendService } from '../lectio-backend.service';
import { FlexLayoutModule} from '@angular/flex-layout';
import { NotebookService } from './notebook.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { NewTopicDialogComponent } from '../new-topic-dialog/new-topic-dialog.component';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.css']
})
export class NotebookComponent implements OnInit {
	 notebook : Notebook;
	 notebookId : number;

	 role : string;
	 notebookRepSubscription : Subscription;

  constructor(private route:  ActivatedRoute , private lectioBackendService: LectioBackendService,
		  private notebookService: NotebookService,
		  private dialog: MatDialog) { }

  ngOnInit() {
	  console.log("Notebook ngOnInit");
	  this.notebookRepSubscription = this.notebookService.getNotebookRep().subscribe(
    		  notebookRep => {
    			  if (notebookRep) {
	    			  this.notebook = notebookRep.notebook;
	    			  this.role = notebookRep.userRole;
    			  }
    		  },
    		  error => {console.log("Error in notebookService.");}
    	);

	  this.route.params.subscribe(params => {
    	  console.log(JSON.stringify(params));
    	  this.notebookId = params['notebookId'];
    	  this.notebookService.setNotebookId(this.notebookId);
    	  console.log("notebook.component has  notebookId = " + this.notebookId);
      });
      
    		  
  }
  
  newTopicClicked(preError: string) : void {
	  
	  console.log("subscription.closed is " + this.notebookRepSubscription.closed);
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
						  let subscription : Subscription;
						  subscription = this.notebookService.getTopicCreateError().subscribe(
								  
								  errorMsg => {
									  subscription.unsubscribe();
									  this.newTopicClicked(errorMsg);}
								  );
						  this.notebookService.createTopic(data.topicName);
				//		  .subscribe(
				//		     createTopicData => {
				//		    	 this.topicList.splice(0, 0, createTopicData);
				//		     },
				//		     createTopicError => {
				//		    	 if (createTopicError.status) {
				//		    		 if (createTopicError.status == 409) {
				//		    			 if (createTopicError.error) {
				//		    				 this.newTopicClicked(createTopicError.error);
				//		    			 }
				//		    		 }
				//		    	 }
				//		    	 console.log("Create topic had an error. ", JSON.stringify(createTopicError));
				//		     }
				//		  );
					  }
			  	  }
			  }
	  );
  }
  

}
