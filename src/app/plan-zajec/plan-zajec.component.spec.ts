import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanZajecComponent } from './plan-zajec.component';

describe('PlanZajecComponent', () => {
  let component: PlanZajecComponent;
  let fixture: ComponentFixture<PlanZajecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanZajecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanZajecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
