import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { LessonComponent } from './lesson/lesson.component';
import { LessonlistComponent } from './lessonlist/lessonlist.component';

const routes: Routes = [
	{ path: 'lessons', component: LessonComponent },
	{ path: 'lessonlist', component: LessonlistComponent }
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
