import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject, BehaviorSubject } from 'rxjs/Rx';
import { NotebookRep, Notebook, Topic } from '../model/lectio-model.module';
import { LectioBackendService } from '../lectio-backend.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class NotebookService {
	
	notebookId: number;
	notebookRep : NotebookRep;
	notebookRepObservable: BehaviorSubject<NotebookRep> = new BehaviorSubject<NotebookRep>(null);
	topicCreateErrorObservable: Subject<any> = new Subject<any>();
	
	constructor(private lectioBackendService : LectioBackendService) {
	}
	
	setNotebookId( notebookId: number ) : void {
		console.log('NotebookService getting notebookId = ' + notebookId);
		this.notebookId = notebookId;
		this.requestNotebookActiveTopics();
	}
	
	requestNotebookActiveTopics() : void {
		this.lectioBackendService.getActiveTopicsWithLessons(this.notebookId).subscribe(
				data => {
					console.log("notebook service got notebook");
					this.notebookRep = data;
					this.notebookRepObservable.next(this.notebookRep);
				},
				error => {
					this.notebookRepObservable.error(error);
				});
	}
	
	
	getTopicCreateError() : Observable<any> {
		return this.topicCreateErrorObservable;
	}
	
	getNotebookRep() : Observable<NotebookRep> {
		return this.notebookRepObservable;
	}
	
	// Returns true if notebookId matches this.notebook.id.
	// Call checkNotebook and only call setNotebookId if this function
	// returns true if you don't want to make unnecessary calls to the
	// database.
	checkNotebook (notebookId : number) : boolean {
		if (!this.notebookRep) {
			return false;
		}
		return (this.notebookRep.notebook.id == notebookId);
	}
	
	createTopic(topicName:string) : void {
		
		this.lectioBackendService.createTopic(this.notebookId, topicName).subscribe(
				newTopic => {
					this.notebookRep.topicList.splice(0, 0, newTopic);
					this.notebookRepObservable.next(this.notebookRep);
				},
				createTopicError => {
					console.log(JSON.stringify(createTopicError));
					this.topicCreateErrorObservable.next(createTopicError);
				}
		);
	}
	
	archiveTopic(topicId:number)  {
		this.lectioBackendService.archiveTopic(topicId).subscribe(
				archiveTopic => {
					this.requestNotebookActiveTopics();
				}
		);

	}
	
	
}