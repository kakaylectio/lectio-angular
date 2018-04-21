import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { LessonComponent } from './lesson/lesson.component';
import { LessonlistComponent } from './lessonlist/lessonlist.component';
import { HomeComponent } from './home/home.component';
import { TrialComponent } from './trial/trial.component';
import { TopicHistoryComponent } from './topic-history/topic-history.component';
import { TopicCacheService, LastLessonResolver, SecondLastLessonResolver } from './topic-cache.service';
const routes: Routes = [
	{ path: 'trial', component: TrialComponent },
	{ path: 'lessons/:notebookId', component: LessonComponent },
	{ path: 'lessonlist', component: LessonlistComponent },
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
