import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGradesPanelComponent } from './add-grades-panel.component';

describe('AddGradesPanelComponent', () => {
  let component: AddGradesPanelComponent;
  let fixture: ComponentFixture<AddGradesPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGradesPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGradesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
