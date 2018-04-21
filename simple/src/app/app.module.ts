import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatCardModule} from '@angular/material/card';
import { MatListModule} from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LessonComponent } from './lesson/lesson.component';
import { LessonlistComponent } from './lessonlist/lessonlist.component';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { MatDividerModule} from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { LectioBackendService } from './lectio-backend.service';
import { ArrayToDatePipe } from './util/array-to-date.pipe';
import { LoginService } from './login.service';
import { TokenInterceptor } from './token.interceptor';
import { HomeComponent } from './home/home.component';
import { TrialComponent } from './trial/trial.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import {MatIconModule} from '@angular/material/icon';
import {MatIconRegistry} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {FlexLayoutModule} from '@angular/flex-layout';
import { LessonEditorComponent } from './lesson-editor/lesson-editor.component';
import { TopicHistoryComponent } from './topic-history/topic-history.component';
import { TopicCacheService, LastLessonResolver, SecondLastLessonResolver } from './topic-cache.service';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    LessonComponent,
    LessonlistComponent,
    ArrayToDatePipe,
    HomeComponent,
    TrialComponent,
    LessonEditorComponent,
    TopicHistoryComponent,
  ],
  imports: [
	    BrowserModule,
	    FormsModule,
	    HttpModule,
	    MatCardModule,
	    MatListModule,
	    MatDividerModule,
	    MatIconModule,
	    MatButtonModule,
	    BrowserAnimationsModule,
	    AppRoutingModule,
	    // import HttpClientModule after BrowserModule.
	    HttpClientModule,
	    ReactiveFormsModule,
	    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
	    FlexLayoutModule,
	    MatToolbarModule
 ],
  providers: [
	  LectioBackendService,
	  LoginService,
	  TopicCacheService,
	  LastLessonResolver, SecondLastLessonResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
