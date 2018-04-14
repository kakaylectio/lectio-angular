import { Component, Input, Output, forwardRef, OnInit } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";


@Component({
  selector: 'app-trial',
  templateUrl: './trial.component.html',
  styleUrls: ['./trial.component.css'],
  providers: [ ]
})
export class TrialComponent implements OnInit {

	 public editorContent: string;
	  constructor() {
		  this.editorContent = "";
	  }
	  
	  ngOnInit() {
	  }
	  
	  public listOptions: Object = {
			htmlAllowedTags: ['ol','ul','li', 'p'] ,
			toolbarButtons: ['formatOL', 'formatUL'],
			toolbarInline: true,
			toolbarVisibleWithoutSelection: true,
			quickInsertButtons: ['ol','ul'],
			theme:  'lectioeditor',
			placeholderText: 'Enter lesson notes here',
			charCounterCount: false,
			pluginsEnabled: ["align", "draggable", "embedly", "image", "imageManager", "inlineStyle", "lineBreaker", "link", "lists", "paragraphFormat", "url", "wordPaste"],
			events: {
				'froalaEditor.contentChanged' : 
					function (e, editor) {
						console.log("Editor has " + editor.html.get());
					  	console.log("Content changed to " + this.editorContent);
					}
			}
	  }
	  

}