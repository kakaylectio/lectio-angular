import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotebookHomeComponent } from './notebook-home.component';

describe('NotebookHomeComponent', () => {
  let component: NotebookHomeComponent;
  let fixture: ComponentFixture<NotebookHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotebookHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotebookHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
