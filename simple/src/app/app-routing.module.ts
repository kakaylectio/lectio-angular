import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { NotebookLessonsComponent } from './notebook-lessons/notebook-lessons.component';
import { HomeComponent } from './home/home.component';
import { TopicHistoryComponent } from './topic-history/topic-history.component';
import { TopicCacheService } from './topic-cache.service';
const routes: Routes = [
	{ path: '', component: HomeComponent },
//	{ path: 'notebookview/:notebookId', component: NotebookLessonsComponent },
	{
		path: 'notebook/:notebookId', 
		loadChildren: 'app/notebook/notebook.module#NotebookModule'
	},
	
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
