import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastDietPlanComponent } from './last-diet-plan.component';

describe('LastDietPlanComponent', () => {
  let component: LastDietPlanComponent;
  let fixture: ComponentFixture<LastDietPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LastDietPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastDietPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
