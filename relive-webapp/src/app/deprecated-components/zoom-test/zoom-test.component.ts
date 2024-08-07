import { Component, ElementRef, viewChild } from '@angular/core';
import { Food } from '../../interfaces/food';
import { FoodService } from '../../services/food.service';

@Component({
  selector: 'app-zoom-test',
  templateUrl: './zoom-test.component.html',
  styleUrl: './zoom-test.component.css',
})
export class ZoomTestComponent {
  foods: Food[] = [];
  divEl = viewChild<ElementRef>('output')
  targetText = 'helo'
  styleVar = 'color: red'
  
  constructor(private foodService: FoodService) {}
  
  
  ngOnInit(): void {
    // this.getFoods();
    this.getFoodsAPI();
    this.styleVar = 'color: green'
  }
    
  // ngAfterViewInit(){
  //   this.divEl.apply
  // }

  getFoodsAPI(): void {
    // console.log('promise', this.foodService.getFoodsAPI())
    this.foodService.getFoodsAPI().then((data: any) => { this.foods = data.slice(1, 5) }).then(()=>{console.log("inner foods:", this.foods)})
    // console.log("foods:", this.foods)
  }
  // window.addEventListener(
  //   "resize", getSizes, false);

  // out = document.querySelector(".output");

  getZoom(): void {
    let zoom = ((window.outerWidth - 10)
        / window.innerWidth) * 100;
    console.log(zoom)
    this.targetText = String(zoom);
  }
}
