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
@NgModule({
  declarations: [
    AppComponent,
    LessonComponent,
    LessonlistComponent,
    ArrayToDatePipe
    
  ],
  imports: [
	    BrowserModule,
	    FormsModule,
	    HttpModule,
	    MatCardModule,
	    MatListModule,
	    MatDividerModule,
	    BrowserAnimationsModule,
	    AppRoutingModule,
	    // import HttpClientModule after BrowserModule.
	    HttpClientModule,
 ],
  providers: [
	  LectioBackendService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
