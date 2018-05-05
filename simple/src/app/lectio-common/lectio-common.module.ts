import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopUserBarComponent } from '../top-user-bar/top-user-bar.component';
import { FlexLayoutModule} from '@angular/flex-layout';
import { User } from '../model/lectio-model.module';
import { LectioNgMatModule } from '../lectio-ng-mat/lectio-ng-mat.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    LectioNgMatModule,
    AppRoutingModule,
 ],
  declarations: [
	    TopUserBarComponent
	  ],
  exports: [
	  TopUserBarComponent
  ]

})
export class LectioCommonModule { }


