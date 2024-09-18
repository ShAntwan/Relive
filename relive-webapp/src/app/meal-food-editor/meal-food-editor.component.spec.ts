import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealFoodEditorComponent } from './meal-food-editor.component';

describe('MealFoodEditorComponent', () => {
  let component: MealFoodEditorComponent;
  let fixture: ComponentFixture<MealFoodEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MealFoodEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealFoodEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
