import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule} from '@angular/material/card';
import { MatListModule} from '@angular/material/list';
import { MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import {MatDialogModule} from "@angular/material";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
	    MatCardModule,
	    MatListModule,
	    MatDividerModule,
	    MatIconModule,
	    MatButtonModule,
	    MatToolbarModule,
	    MatMenuModule,
	    MatDialogModule,
	    MatFormFieldModule,
	    MatInputModule
  ],
  declarations: []
})
export class LectioNgMatModule { }
