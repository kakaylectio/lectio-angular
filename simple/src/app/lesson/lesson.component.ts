import { Component, OnInit, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule} from '@angular/material/card';
import { LectioBackendService } from '../lectio-backend.service';
import { NotebookRep } from '../model/notebookrep';
import { Notebook } from '../model/notebook';
import { Topic } from '../model/topic';
import { Router,ActivatedRoute  } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatIconRegistry} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})


// LessonComponent contains the listing of all active topics
// and their last lesson in a notebook.  This is where lessons can be added to a topic.
export class LessonComponent implements OnInit {
  private notebookData : string;
  private notebook : Notebook;
  private notebookId : number;
  private topicList : Topic[];
  private role : string;
  

  
  constructor(private lectioBackendService: LectioBackendService, 
		  private route:  ActivatedRoute, 
		  iconRegistry: MatIconRegistry, 
		  ) {
	  iconRegistry.registerFontClassAlias('fontawesome', 'fa');

  }

  
  ngOnInit() {
      this.route.params.subscribe(params => {

          let notebookId = params['notebookId'];
		  console.log("lesson.component got notebookId = " + notebookId);
		  this.showTopicsWithLesson(notebookId);

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

}
