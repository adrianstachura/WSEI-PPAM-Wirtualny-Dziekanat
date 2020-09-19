import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClassesPanelComponent } from './add-classes-panel.component';

describe('AddClassesPanelComponent', () => {
  let component: AddClassesPanelComponent;
  let fixture: ComponentFixture<AddClassesPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClassesPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClassesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
