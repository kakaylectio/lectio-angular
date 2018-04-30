import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { NotebookLessonsComponent } from '../notebook-lessons/notebook-lessons.component';
import { TopicHistoryComponent } from '../topic-history/topic-history.component';
import { NotebookComponent } from './notebook.component';
import { TopicCacheService } from '../topic-cache.service';
import { NotebookHomeComponent } from './notebook-home/notebook-home.component';

const notebookRoutes: Routes = [
	{ 
		
		path: 'notebook/:notebookId',
		component: NotebookComponent,
		children: [
			{ path: '', component: NotebookLessonsComponent },
			{ 
				path: 'topic-history/:topicId', 
				component: TopicHistoryComponent,
				
			}			
		]
	}

];

@NgModule({
  imports: [
	  RouterModule.forChild(notebookRoutes) ,
  ],
  declarations: [],
  exports: [RouterModule]
})



export class NotebookRoutingModule { 
	
	
}
