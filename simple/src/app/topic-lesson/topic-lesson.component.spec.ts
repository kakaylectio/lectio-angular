import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorComponent } from './topic-lesson.component';

describe('TopicLessonComponent', () => {
  let component: TopicLessonComponent;
  let fixture: ComponentFixture<TopicLessonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
