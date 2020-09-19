import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserPanelComponent } from './add-user-panel.component';

describe('AddUserPanelComponent', () => {
  let component: AddUserPanelComponent;
  let fixture: ComponentFixture<AddUserPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
