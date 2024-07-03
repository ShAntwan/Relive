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
    ID: new FormControl(),
    Name: new FormControl(),
    Category: new FormControl(),
    Proteins: new FormControl(),
    Fats: new FormControl(),
    Carbohydrates: new FormControl(),
    Sugars: new FormControl(),
  });
  
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.foodControlDetails.value);
    // const id = Number(this.route.snapshot.paramMap.get('id'));
    this.foodService.getFood(this.foodControlDetails.value.Name.id).subscribe(food => this.food = this.foodControlDetails.value.Name.name)
    this.location.back();
  }

  constructor(
    private route: ActivatedRoute,
    private foodService: FoodService,
    private categoryService: CategoryService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getFood();
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
}