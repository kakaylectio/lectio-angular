import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject, BehaviorSubject } from 'rxjs/Rx';
import { NotebookRep, Notebook, Topic } from '../model/lectio-model.module';
import { LectioBackendService } from '../lectio-backend.service';

@Injectable()
export class NotebookService {
	
	notebookId: number;
	notebookRep : NotebookRep;
	notebookRepObservable: BehaviorSubject<NotebookRep> = new BehaviorSubject<NotebookRep>(null);
	topicCreateErrorObservable: Subject<string> = new Subject<string>();
	
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
					this.notebookRep = data;
					this.notebookRepObservable.next(this.notebookRep);
				},
				error => {
					console.log("Error getting active topics with lessons.");
				});
	}
	
	
	getTopicCreateError() : Observable<string> {
		return this.topicCreateErrorObservable;
	}
	
	getNotebookRep() : Observable<NotebookRep> {
		return this.notebookRepObservable;
	}
	
	createTopic(topicName:string) : void {
		
		this.lectioBackendService.createTopic(this.notebookId, topicName).subscribe(
				newTopic => {
					this.notebookRep.topicList.splice(0, 0, newTopic);
					this.notebookRepObservable.next(this.notebookRep);
				},
				createTopicError => {
					this.topicCreateErrorObservable.next(createTopicError.error);
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