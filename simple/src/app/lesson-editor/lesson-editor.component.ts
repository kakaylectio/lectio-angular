import { Component, OnInit, Input } from '@angular/core';
import { Lesson } from '../model/lesson';
import { Topic } from '../model/topic';
import {LectioBackendService } from '../lectio-backend.service';

@Component({
  selector: 'app-lesson-editor',
  templateUrl: './lesson-editor.component.html',
  styleUrls: ['./lesson-editor.component.css']
})
export class LessonEditorComponent implements OnInit {

  @Input() topic : Topic;
  private editingLesson : Lesson;
  private lastLesson : Lesson;
  
  constructor( private lectioBackendService : LectioBackendService ) {
	  
  }

  ngOnInit() {
	  this.lastLesson = this.topic.lastLessonNote;
	  console.log("Topic = " + this.topic);
	  console.log("Lastlesson = " + this.lastLesson);
	  console.log("Name = " + this.topic.name);
  }
  
  public listOptions: Object = {
			htmlAllowedTags: ['ol','ul','li', 'p'] ,
			toolbarButtons: ['formatOL', 'formatUL'],
			toolbarInline: true,
			toolbarVisibleWithoutSelection: true,
			quickInsertButtons: ['ol','ul'],
			theme:  'lectioeditor',
			placeholderText: 'Enter lesson notes here',
			charCounterCount: false,
			pluginsEnabled: ["align", "draggable", "embedly", "image", "imageManager", "inlineStyle", "lineBreaker", "link", "lists", "paragraphFormat", "url", "wordPaste"],
			events: {
				'froalaEditor.contentChanged' : 
					function (e, editor) {
						console.log("Editor has " + editor.html.get());
					  	console.log("Content changed to " + this.editorContent);
					}
			}
	  }
	  


}
