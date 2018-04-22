import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { NotebookLessonsComponent } from './notebook-lessons/notebook-lessons.component';
import { HomeComponent } from './home/home.component';
import { TopicHistoryComponent } from './topic-history/topic-history.component';
import { TopicCacheService } from './topic-cache.service';
const routes: Routes = [
	{ path: 'notebookview/:notebookId', component: NotebookLessonsComponent },
	{ 
		path: 'topic-history/:topicId', 
		component: TopicHistoryComponent,
		resolve : {
			topicCache : TopicCacheService,
		}
	},
	{ path: '', component: HomeComponent },
	{ path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
	  RouterModule.forRoot(routes) ,
  ],
  declarations: [],
exports: [RouterModule]
})



export class AppRoutingModule { 
	
	
}
