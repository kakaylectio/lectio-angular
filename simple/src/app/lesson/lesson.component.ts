import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule} from '@angular/material/card';
import { LectioBackendService } from '../lectio-backend.service';
import { NotebookRep } from '../model/notebookrep';
import { Notebook } from '../model/notebook';
import { Topic } from '../model/topic';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {

  
  private notebookData : String;
  private notebook : Notebook;
  private topicList : Topic[];
  constructor(private lectioBackendService: LectioBackendService) { }

  ngOnInit() {
	  this.showTopicsWithLesson();
  }
  
  showTopicsWithLesson() {
	  this.lectioBackendService.getActiveTopicsWithLessons()
	  	.subscribe(response => 
	  		{
	  			var notebookRep : NotebookRep = response;
	  			console.log(notebookRep);
	  			this.notebook = notebookRep.notebook;
	  			this.topicList = notebookRep.topicList;
	  				  			
	  		}
	  	);
  }

}
