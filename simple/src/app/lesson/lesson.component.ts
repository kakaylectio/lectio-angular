import { Component, OnInit, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule} from '@angular/material/card';
import { LectioBackendService } from '../lectio-backend.service';
import { NotebookRep } from '../model/notebookrep';
import { Notebook } from '../model/notebook';
import { Topic } from '../model/topic';
import { DatePipe } from '@angular/common';
import { Router,ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {
  
  private notebookData : String;
  private notebook : Notebook;
  private topicList : Topic[];
  constructor(private lectioBackendService: LectioBackendService, private route:  ActivatedRoute ) { }

  
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
	  			console.log(notebookRep);
	  			this.notebook = notebookRep.notebook;
	  			this.topicList = notebookRep.topicList;		
	  		},
	  		error => {
	  			console.log("Error getting active topics with lessons. " + JSON.stringify(error.error));
	  		}
	  	);
  }

}
