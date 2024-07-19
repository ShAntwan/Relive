import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FoodsComponent } from './foods/foods.component';
import { FoodDetailComponent } from './food-detail/food-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AppRoutingModule } from './app-routing.module';
import { UsersDetailsComponent } from './users-details/users-details.component';
import { UsersComponent } from './users/users.component';
import { DietProgramComponent } from './diet-program/diet-program.component';
import { UserMeasurmentComponent } from './user-measurment/user-measurment.component';
import { provideHttpClient, withFetch } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    DashboardComponent,
    FoodDetailComponent,
    FoodsComponent,
    UsersDetailsComponent,
    UsersComponent,
    DietProgramComponent,
    UserMeasurmentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    // FoodsComponent,
    // FoodDetailComponent
  ],
  providers: [
    provideHttpClient(withFetch()),
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
