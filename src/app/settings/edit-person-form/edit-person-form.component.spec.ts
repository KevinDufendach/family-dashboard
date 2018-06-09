import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPersonFormComponent } from './edit-person-form.component';

describe('EditPersonFormComponent', () => {
  let component: EditPersonFormComponent;
  let fixture: ComponentFixture<EditPersonFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPersonFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPersonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
