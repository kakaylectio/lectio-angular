import { Component, OnInit, Input } from '@angular/core';
import { Lesson } from '../model/lesson';
import { Topic } from '../model/topic';
import {LectioBackendService } from '../lectio-backend.service';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-lesson-editor',
  templateUrl: './lesson-editor.component.html',
  styleUrls: ['./lesson-editor.component.css']
})

// This is the component that encompasses both the 
// lesson being edited and the previous static lesson.  The static lesson
// is necessary because often, the teacher refers to the last lesson while taking
// notes for the current lesson.
// The current lesson is called the editingLesson.  The previous lesson is
// called the lastLesson.  EditingLesson is only visible when the user has
// teacher privileges, and the user (teacher) has chosen to add to the lesson by
// clicking on the edit icon.
// Two lessons cannot be created on the same date.  If the last lesson was created
// only today, then the last lesson is the editingLesson.
export class LessonEditorComponent implements OnInit {

  @Input() topic : Topic;
  private editingLesson : Lesson;
  private lastLesson : Lesson;
  private isStaticLessonVisible : boolean;
  private editingContent : string;
  
  constructor( private lectioBackendService : LectioBackendService ) {
	  
  }

  ngOnInit() {
	  this.isStaticLessonVisible = true;
	  this.lastLesson = this.topic.lastLessonNote;
	  let currentTime = new Date(); // currentTime month is zero-based.

	  // If this is completely new topic and last lesson doesn't exist yet, then
	  // create an editinglesson.
	  if (!this.lastLesson) {
		  this.editingLesson = new Lesson();
		  this.editingLesson.content == "";
	  }
	  else if (currentTime.getFullYear() == this.lastLesson.date[0]
	  		&& currentTime.getMonth()+1 == this.lastLesson.date[1]
	  		&& currentTime.getDate() == this.lastLesson.date[2]) {
		  console.log("Last lesson was today's lesson.  So keep it in editing mode.");
		  // Last lesson was edited today.  Don't create a new lesson and
		  // keep editing today's lesson.
		  this.editingLesson = this.lastLesson;
		  this.editingContent = this.lastLesson.content;
		  // TODO:  Get second to last lesson.
		  this.lastLesson = undefined;
		  this.isStaticLessonVisible = false;
	  }
	  else {
		  // Do nothing.  This is all set up.  EditingLesson is undefined, and
		  // last lesson is the last lesson on the topic.
	  }
	  
	  
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
					 (e, editor) => {
						console.log("Editor has " + editor.html.get());
						this.updateLesson(editor.html.get());
					}
			}
	  }
  
  public updateLesson(content : string) {
	  console.log("updateLesson has " + content);
	  console.log("this.editingContent has " + this.editingContent);
	  if (!this.editingLesson) {
		  this.editingLesson = new Lesson();
		  this.editingLesson.content = "";
	  }
	  if (!this.editingLesson.date || !content) {
		  console.log("In creating new lesson, topic ID = " + this.topic.id);
		  this.lectioBackendService.createLesson(this.topic.id, content).subscribe(
			  data => {
				  console.log("Lesson created.");
				  this.editingLesson.id = data['id'];
				  this.editingLesson.date = data['date'];
				  this.editingLesson.content = data['content'];
			  },
		  	  error => {
		  		  console.log("Error creating lesson.");
		  	  }
		  );
	  }
	  else if (content) {
		  console.log("In editing lesson, lesson ID = " + this.editingLesson.id);
		  this.lectioBackendService.updateLesson(this.editingLesson.id, content).subscribe(
				  data => {
					  console.log("Lesson updated.");
					  this.editingLesson.id = data['id'];
					  this.editingLesson.date = data['date'];
					  this.editingLesson.content = data['content'];
					  console.log("id = " + this.editingLesson.id);
				  },
			  	  error => {
			  		  console.log("Error creating lesson.");
			  	  }
			  );
		  
	  }
  }
  
  // Edit button clicked.  This means a new lesson note needs to be created.
  public editButtonClicked () : void {
	  console.log("New!");
	  if (this.editingLesson) {
		  console.log("Oops.  You weren't supposed to see the editing button.");
	  }
	  else {
		  this.editingContent="";
		  this.editingLesson = new Lesson();
		  this.editingLesson.content=this.editingContent;
	  }
  }
	  
  public collapseButtonClicked() : void {
	  console.log("Collapse");
	  this.isStaticLessonVisible = false;
  }

  public expandButtonClicked() : void {
	  console.log("Expand");
	  this.isStaticLessonVisible = true;
  }

}
