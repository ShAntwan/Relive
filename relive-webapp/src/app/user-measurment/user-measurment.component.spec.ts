import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMeasurmentComponent } from './user-measurment.component';

describe('UserMeasurmentComponent', () => {
  let component: UserMeasurmentComponent;
  let fixture: ComponentFixture<UserMeasurmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserMeasurmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMeasurmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
