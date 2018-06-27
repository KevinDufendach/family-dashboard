import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryTrialComponent } from './query-trial.component';

describe('QueryTrialComponent', () => {
  let component: QueryTrialComponent;
  let fixture: ComponentFixture<QueryTrialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryTrialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryTrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
