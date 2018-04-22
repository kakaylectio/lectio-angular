import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotebookLessonsComponent } from './notebook-lessons.component';

describe('NotebookLessonsComponent', () => {
  let component: NotebookLessonsComponent;
  let fixture: ComponentFixture<NotebookLessonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotebookLessonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotebookLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
