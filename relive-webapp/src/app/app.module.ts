import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FoodsComponent } from './foods/foods.component';
import { FoodDetailComponent } from './food-detail/food-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './deprecated-components/dashboard/dashboard.component';

import { AppRoutingModule } from './app-routing.module';
import { UsersDetailsComponent } from './users-details/users-details.component';
import { UsersComponent } from './users/users.component';
import { DietProgramComponent } from './diet-program/diet-program.component';
import { UserMeasurmentComponent } from './user-measurment/user-measurment.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
// import { FoodEditingForManagerComponent } from './food-editing-for-manager/food-editing-for-manager.component';
import { UserDashboardComponent } from './user-components/user-dashboard/user-dashboard.component';
import { ManagerFoodEditingComponent } from './manager-components/manager-food-editing/manager-food-editing.component';
import { UserLoginComponent } from './user-components/user-login/user-login.component';
import { UserNewDietPlanComponent } from './user-components/user-new-diet-plan/user-new-diet-plan.component';
import { LastDietPlanComponent } from './last-diet-plan/last-diet-plan.component';

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
    UserMeasurmentComponent,
    // FoodEditingForManagerComponent,
    UserDashboardComponent,
    ManagerFoodEditingComponent,
    UserLoginComponent,
    UserNewDietPlanComponent,
    LastDietPlanComponent
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
