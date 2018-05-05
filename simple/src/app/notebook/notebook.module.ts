import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';

import { NotebookRoutingModule } from './notebook-routing.module';
import { NotebookComponent } from './notebook.component';
import { LectioNgMatModule } from '../lectio-ng-mat/lectio-ng-mat.module';
import { NotebookLessonsComponent } from '../notebook-lessons/notebook-lessons.component';
import { TopicLessonComponent } from '../topic-lesson/topic-lesson.component';
import { TopicHistoryComponent } from '../topic-history/topic-history.component';
import { TopicCacheService } from '../topic-cache.service';
import { ArrayToDatePipe } from '../util/array-to-date.pipe';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { NotebookHomeComponent } from './notebook-home/notebook-home.component';
import { FlexLayoutModule} from '@angular/flex-layout';
import { NotebookService } from './notebook.service';
import { LectioCommonModule } from '../lectio-common/lectio-common.module';

@NgModule({
	  declarations: [
	    NotebookComponent,
	    NotebookLessonsComponent,
	    TopicLessonComponent,
	    TopicHistoryComponent,
	    ArrayToDatePipe,
	    NotebookHomeComponent
	  ],
	  imports: [
		    CommonModule,
		    FormsModule,
		    NotebookRoutingModule,
		    LectioNgMatModule,
		    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
		    FlexLayoutModule,
		    LectioCommonModule
		    
		  ],
	  providers: [
		  TopicCacheService,
		  NotebookService
	  ]
})

export class NotebookModule {
	
	constructor() {
		console.log("NotebookModule constructed.");
	}
}

