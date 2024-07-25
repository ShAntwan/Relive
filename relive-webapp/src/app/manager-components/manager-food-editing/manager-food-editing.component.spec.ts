import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerFoodEditingComponent } from './manager-food-editing.component';

describe('ManagerFoodEditingComponent', () => {
  let component: ManagerFoodEditingComponent;
  let fixture: ComponentFixture<ManagerFoodEditingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagerFoodEditingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerFoodEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
