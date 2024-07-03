import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodsComponent } from './foods/foods.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FoodDetailComponent } from './food-detail/food-detail.component';
import { UsersDetailsComponent } from './users-details/users-details.component';
import { UsersComponent } from './users/users.component';
import { DietProgramComponent } from './diet-program/diet-program.component';
import { SystemRecommendationComponent } from './system-recommendation/system-recommendation.component';
import { NewUserComponent } from './new-user/new-user.component';
import { UserMeasurmentComponent } from './user-measurment/user-measurment.component';

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: FoodDetailComponent },
  { path: 'foods', component: FoodsComponent },
  { path: 'users-details', component: UsersDetailsComponent},
  { path: 'new-user', component: NewUserComponent},
  { path: 'users', component: UsersComponent },
  { path: 'diet-program', component: DietProgramComponent },
  { path: 'SR', component: SystemRecommendationComponent },
  // { path: 'user-measurment', component: UserMeasurmentComponent },
  { path: 'user-measurment/:id', component: UserMeasurmentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }