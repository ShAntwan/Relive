import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNewDietPlanComponent } from './user-new-diet-plan.component';

describe('UserNewDietPlanComponent', () => {
  let component: UserNewDietPlanComponent;
  let fixture: ComponentFixture<UserNewDietPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserNewDietPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserNewDietPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
