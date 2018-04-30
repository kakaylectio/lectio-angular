import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-notebook-home',
  templateUrl: './notebook-home.component.html',
  styleUrls: ['./notebook-home.component.css']
})
export class NotebookHomeComponent implements OnInit {

  constructor(private router:  Router) { }

  ngOnInit() {
	  console.log("NotebookHomeComponent ngOnInit");
  }

}
