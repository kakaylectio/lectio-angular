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

	  this.route.params.subscribe(params => {
    	  console.log(JSON.stringify(params));
    	  this.notebookId = params['notebookId'];
    	  this.notebookService.setNotebookId(this.notebookId);
    	  console.log("notebook.component has  notebookId = " + this.notebookId);
      });
      
    		  
  }
  

  

}
