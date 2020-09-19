import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFieldOfStudyPanelComponent } from './add-field-of-study-panel.component';

describe('AddFieldOfStudyPanelComponent', () => {
  let component: AddFieldOfStudyPanelComponent;
  let fixture: ComponentFixture<AddFieldOfStudyPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFieldOfStudyPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFieldOfStudyPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
