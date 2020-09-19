import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserPanelComponent } from './edit-user-panel.component';

describe('EditUserPanelComponent', () => {
  let component: EditUserPanelComponent;
  let fixture: ComponentFixture<EditUserPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
