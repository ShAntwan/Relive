import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Food } from '../food';
import { Category } from '../categories';
import { FoodService } from '../food.service';
import { CategoryService } from '../category.service';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css'],
})

export class FoodDetailComponent {
  food: Food | undefined;
  foods: Food[] = [];

  categories: Category[] = [];

  foodControlDetails = new FormGroup({
    FoodID: new FormControl(),
    FoodName: new FormControl(),
    Calories: new FormControl(),
    Category: new FormControl(),
    Proteins: new FormControl(),
    Fats: new FormControl(),
    Carbohydrates: new FormControl(),
    Sugars: new FormControl()
  });
  
// Function to map FormGroup values to Food interface
  // mapFormGroupToFood(): Food {
  //   return {
  //     FoodID: this.foodControlDetails.value.FoodID,
  //     FoodName: this.foodControlDetails.value.FoodName,
  //     Calories: this.foodControlDetails.value.Calories,
  //     Category: this.foodControlDetails.value.Category,
  //     Proteins: this.foodControlDetails.value.Proteins,
  //     Fats: this.foodControlDetails.value.Fats,
  //     Carbohydrates: this.foodControlDetails.value.Carbohydrates,
  //     Sugars: this.foodControlDetails.value.Sugars,
  //     ImagePath: ''  // Assuming ImagePath will be set separately based on application logic
  //   };
  // }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.foodControlDetails.value);
    // const id = Number(this.route.snapshot.paramMap.get('id'));
    // this.foodService.getFood(this.foodControlDetails.value.FoodName.id).subscribe(food => this.food = this.foodControlDetails.value.Name.name)
    const foodItem: Food = {
      FoodID: this.foodControlDetails.value.FoodID,
      FoodName: this.foodControlDetails.value.FoodName,
      Calories: this.foodControlDetails.value.Calories,
      Category: this.foodControlDetails.value.Category,
      Proteins: this.foodControlDetails.value.Proteins,
      Fats: this.foodControlDetails.value.Fats,
      Carbohydrates: this.foodControlDetails.value.Carbohydrates,
      Sugars: this.foodControlDetails.value.Sugars,
      ImagePath: '' // Assuming ImagePath will be set separately based on application logic
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
    // this.location.back();
  }

  constructor(
    private route: ActivatedRoute,
    private foodService: FoodService,
    private categoryService: CategoryService,
    private location: Location
  ) {}

  ngOnInit(): void {
    // this.getFood();
    this.getFoodAPI();
    this.getFoods();
    this.getCategories();
  }

  getFood(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.foodService.getFood(id).subscribe(food => this.food = food)
  }
  
  getFoods(): void {
    this.foodService.getFoods().subscribe(foods => this.foods = foods)
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories)
  }

  goBack(): void {
    this.location.back();
  }

  getFoodAPI(): void {
    // console.log('promise', this.foodService.getFoodsAPI())
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.foodService.getFoodAPI(id).then((data: any) => { this.food = data }).then(()=>{console.log("inner food:", this.food)})
    // console.log("foods:", this.foods)
  }
}