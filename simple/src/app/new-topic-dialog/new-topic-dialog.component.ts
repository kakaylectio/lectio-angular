import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { LectioNgMatModule } from '../lectio-ng-mat/lectio-ng-mat.module';

@Component({
  selector: 'app-new-topic-dialog',
  templateUrl: './new-topic-dialog.component.html',
  styleUrls: ['./new-topic-dialog.component.css']
})
export class NewTopicDialogComponent implements OnInit {
  form: FormGroup;
  topicName: string;
  constructor(        private fb: FormBuilder,
	        private dialogRef: MatDialogRef<NewTopicDialogComponent>,
	        @Inject(MAT_DIALOG_DATA) public data: any) { 
	  		this.form = fb.group({
		  topicName : [this.topicName, Validators.required]
	  });
  }

  ngOnInit() {
  }
  
  close() {
	  this.dialogRef.close();
  }
  
  createTopic() {
	  this.dialogRef.close(this.form.value);
  }
  

}
