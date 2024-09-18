import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Food } from '../interfaces/food';
// import { Category } from '../categories';
import { FoodService } from '../services/food.service';
// import { CategoryService } from '../category.service';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css'],
})

export class FoodDetailComponent {
  food: Food | undefined;
  foods: Food[] = [];
  
  foodControlDetails = new FormGroup({
    FoodID: new FormControl(),
    FoodName: new FormControl(),
    FoodNameDisp: new FormControl(),
    Calories: new FormControl(),
    Category: new FormControl(),
    Proteins: new FormControl(),
    Fats: new FormControl(),
    Carbohydrates: new FormControl(),
    Sugars: new FormControl(),
    Sodium: new FormControl()
  });
  
  onSubmit() {
    console.log("submit food item")
    const foodItem: Food = {
      FoodID: this.foodControlDetails.value.FoodID,
      FoodName: this.foodControlDetails.value.FoodName,
      FoodNameDisp: this.foodControlDetails.value.FoodNameDisp,
      Calories: this.foodControlDetails.value.Calories,
      Category: this.foodControlDetails.value.Category,
      Proteins: this.foodControlDetails.value.Proteins,
      Fats: this.foodControlDetails.value.Fats,
      Carbohydrates: this.foodControlDetails.value.Carbohydrates,
      Sugars: this.foodControlDetails.value.Sugars,
      Sodium: this.foodControlDetails.value.Sodium,
      ImagePath: ''
    };
    console.log("dafood", foodItem)
    this.foodService.updateFoodItem(foodItem).subscribe(() => {
      console.log('Food item updated successfully.');
      // Navigate back to previous page or component
      this.location.back();
    }, error => {
      console.error('Error updating food item:', error);
      // Handle error scenario if needed
    });
  }

  constructor(
    private route: ActivatedRoute,
    private foodService: FoodService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getFoodAPI();
  }

  goBack(): void {
    this.location.back();
  }

  getFoodAPI(): void {
    console.log("this:", this)
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.foodService.getFoodAPI(id).then((data: any) => { console.log("data: ", data[0]); this.food = data[0] }).then(()=>{console.log("inner food:", this.food)})
  }
}