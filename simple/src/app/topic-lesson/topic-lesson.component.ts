import { Component, OnInit, Input } from '@angular/core';
import { LectioBackendService } from '../lectio-backend.service';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { Router } from '@angular/router';
import { TopicCacheService } from '../topic-cache.service';
import { ArrayToDatePipe } from '../util/array-to-date.pipe';
import { LectioNgMatModule } from '../lectio-ng-mat/lectio-ng-mat.module';
import { NotebookLessonsComponent } from '../notebook-lessons/notebook-lessons.component';
import { Topic, Lesson } from '../model/lectio-model.module';
import { NotebookService } from '../notebook/notebook.service';
@Component({
  selector: 'app-topic-lesson',
  templateUrl: './topic-lesson.component.html',
  styleUrls: ['./topic-lesson.component.css']
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
export class TopicLessonComponent implements OnInit {

  @Input() parentView: NotebookLessonsComponent;
  @Input() topic : Topic;
  @Input() role : string;
  editingLesson : Lesson;
  lastLesson : Lesson;
  isStaticLessonVisible : boolean;
  editingContent : string;
  
  constructor( private lectioBackendService : LectioBackendService , private froalaEditorModule : FroalaEditorModule,
		  private router : Router,
		  private topicCacheService : TopicCacheService,
		  private notebookService:  NotebookService) {
	  
  }

  ngOnInit() {
	  this.isStaticLessonVisible = true;
	  this.lastLesson = this.topic.lastLessonNote;
	  let currentTime = new Date(); // currentTime month is zero-based.

	  console.log("lesson-editor role = " + this.role);
	  // If this is completely new topic and last lesson doesn't exist yet, then
	  // create an editinglesson.
	  if (!this.lastLesson && this.role == "teacher") {
		  this.editingLesson = new Lesson();
		  this.editingLesson.content == "";
	  }
	  else if (this.role == "teacher" 
		    && currentTime.getFullYear() == this.lastLesson.date[0]
	  		&& currentTime.getMonth()+1 == this.lastLesson.date[1]
	  		&& currentTime.getDate() == this.lastLesson.date[2]) {
		  console.log(this.lastLesson.date);
		  console.log(this.lastLesson.content);
		  let pipe = new ArrayToDatePipe();
		  console.log(pipe.transform(this.lastLesson.date));
		  // Last lesson was edited today.  Don't create a new lesson and
		  // keep editing today's lesson.
		  this.editingLesson = this.lastLesson;
		  this.editingContent = this.lastLesson.content;
		  this.lastLesson = undefined;
		  this.isStaticLessonVisible = false;
		  this.lectioBackendService.findLessonBefore(this.topic.id, this.editingLesson.id).subscribe(
				  data => {
					this.lastLesson = data;  
				  },
				  error => {
					  console.log("Error getting lesson before " + this.editingLesson.id);
				  }
		  );
	  
	  }
	  else {
		  // Do nothing.  This is all set up.  EditingLesson is undefined, and
		  // last lesson is the last lesson on the topic.
	  }
	  
	  
  }
  
  public froalaOptions: Object = {
			htmlAllowedTags: ['ol','ul','li', 'p'] ,
			enter: 'ENTER_BR',
			toolbarButtons: ['formatOL', 'formatUL'],
			toolbarInline: true,
			toolbarVisibleWithoutSelection: true,
			quickInsertButtons: ['ol','ul'],
			theme:  'lectioeditor',
			placeholderText: 'New notes...',
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
		  this.lectioBackendService.updateLesson(this.editingLesson.id, content).subscribe(
				  data => {
					  this.editingLesson.id = data['id'];
					  this.editingLesson.date = data['date'];
					  this.editingLesson.content = data['content'];
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
	  if (this.editingLesson || this.role != "teacher") {
		  console.log("Oops.  You weren't supposed to see the editing button.");
	  }
	  else if (this.role == "teacher"){
		  this.editingContent="";
		  this.editingLesson = new Lesson();
		  this.editingLesson.content=this.editingContent;
	  }
  }
	  
  public collapseButtonClicked() : void {
	  this.isStaticLessonVisible = false;
  }

  public expandButtonClicked() : void {
	  this.isStaticLessonVisible = true;
  }
  
  public historyButtonClicked() : void {
	  if (this.editingLesson) {
		  this.topicCacheService.setData(this.topic, this.editingLesson, this.lastLesson );
	  }
	  else {
		  this.topicCacheService.setData(this.topic, this.lastLesson, undefined);
	  }
      this.router.navigate(['/topic-history', this.topic.id]);

  }
  
  public archiveButtonClicked() : void {
	  // TODO:  Add an Are You Sure? modal dialog.
	  
	  this.notebookService.archiveTopic(this.topic.id);
	  	
  }
  
  

}
