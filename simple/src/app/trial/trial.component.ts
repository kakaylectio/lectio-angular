import { Component, Input, Output, forwardRef, OnInit } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";


@Component({
  selector: 'app-trial',
  templateUrl: './trial.component.html',
  styleUrls: ['./trial.component.css'],
  providers: [

	  ]
})
export class TrialComponent implements OnInit {

	 public editorContent: string;
	  constructor() {
		  this.editorContent = "Hello";
	  }
	  
	  ngOnInit() {
	  }
	  
	  public listOptions: Object = {
			htmlAllowedTags: ['ol','ul','li', 'p'] ,
			toolbarButtons: ['formatOL','formatUL'],
			events: {
				'froalaEditor.contentChanged' : 
					function (e, editor) {
						console.log("Editor has " + editor.html.get());
					  	console.log("Content changed to " + this.editorContent);
					}
				
			}
	  }
	  

	}