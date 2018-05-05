import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopUserBarComponent } from './top-user-bar.component';

describe('TopUserBarComponent', () => {
  let component: TopUserBarComponent;
  let fixture: ComponentFixture<TopUserBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopUserBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopUserBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
