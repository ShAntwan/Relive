import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Relive System';
  BackStyle = 'visibility: hidden;'

  constructor(
    private location: Location
  ) {}

  goBack(): void {
    this.location.back();
    this.setBackVisibility(false)
  }

  setBackVisibility(val: boolean) {
    if (val == true) {
      console.log("up")
      this.BackStyle = 'visibility: visible;'
    } else {
      console.log("down")
      this.BackStyle = 'visibility: hidden;'
    }
  }
}
