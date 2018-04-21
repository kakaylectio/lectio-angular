import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicHistoryComponent } from './topic-history.component';

describe('TopicHistoryComponent', () => {
  let component: TopicHistoryComponent;
  let fixture: ComponentFixture<TopicHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
