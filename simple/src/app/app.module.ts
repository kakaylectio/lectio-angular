import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
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
import { LectioNgMatModule } from './lectio-ng-mat/lectio-ng-mat.module';
import { NewTopicDialogComponent } from './new-topic-dialog/new-topic-dialog.component';
import { NotebookModule } from './notebook/notebook.module';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewTopicDialogComponent,
  ],
  imports: [
	    BrowserModule,
	    FormsModule,
	    HttpModule,
	    BrowserAnimationsModule,
	    NotebookModule,
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
  ],
  bootstrap: [AppComponent],
  entryComponents: [NewTopicDialogComponent]
})
export class AppModule { }
