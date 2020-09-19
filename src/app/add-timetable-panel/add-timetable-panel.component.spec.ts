import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTimetablePanelComponent } from './add-timetable-panel.component';

describe('AddTimetablePanelComponent', () => {
  let component: AddTimetablePanelComponent;
  let fixture: ComponentFixture<AddTimetablePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTimetablePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTimetablePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
