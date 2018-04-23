import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NotebookLessonsComponent } from './notebook-lessons/notebook-lessons.component';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LectioBackendService } from './lectio-backend.service';
import { ArrayToDatePipe } from './util/array-to-date.pipe';
import { LoginService } from './login.service';
import { TokenInterceptor } from './token.interceptor';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import {FlexLayoutModule} from '@angular/flex-layout';
import { TopicLessonComponent } from './topic-lesson/topic-lesson.component';
import { TopicHistoryComponent } from './topic-history/topic-history.component';
import { TopicCacheService } from './topic-cache.service';
import { LectioNgMatModule } from './lectio-ng-mat/lectio-ng-mat.module';
import { NewTopicDialogComponent } from './new-topic-dialog/new-topic-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    NotebookLessonsComponent,
    ArrayToDatePipe,
    HomeComponent,
    TopicLessonComponent,
    TopicHistoryComponent,
    NewTopicDialogComponent
  ],
  imports: [
	    BrowserModule,
	    FormsModule,
	    HttpModule,
	    BrowserAnimationsModule,
	    AppRoutingModule,
	    // import HttpClientModule after BrowserModule.
	    HttpClientModule,
	    ReactiveFormsModule,
	    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
	    FlexLayoutModule,
	    LectioNgMatModule,
 ],
   providers: [
	  LectioBackendService,
	  LoginService,
	  TopicCacheService
  ],
  bootstrap: [AppComponent],
  entryComponents: [NewTopicDialogComponent]
})
export class AppModule { }
