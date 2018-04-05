import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { LessonComponent } from './lesson/lesson.component';
import { LessonlistComponent } from './lessonlist/lessonlist.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
	{ path: 'lessons', component: LessonComponent },
	{ path: 'lessonlist', component: LessonlistComponent },
	{ path: '', component: HomeComponent },
	{ path: '**', redirectTo: '' }
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
