import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodsComponent } from './foods/foods.component';
import { DashboardComponent } from './deprecated-components/dashboard/dashboard.component';
import { FoodDetailComponent } from './food-detail/food-detail.component';
import { UsersDetailsComponent } from './manager-components/users-details/users-details.component';
import { UsersComponent } from './users/users.component';
import { DietProgramComponent } from './diet-program/diet-program.component';
import { SystemRecommendationComponent } from './system-recommendation/system-recommendation.component';
import { NewUserComponent } from './manager-components/new-user/new-user.component';
import { UserMeasurmentComponent } from './user-measurment/user-measurment.component';
import { LastDietPlanComponent } from './last-diet-plan/last-diet-plan.component';
import { ManagerFoodEditingComponent } from './manager-components/manager-food-editing/manager-food-editing.component';
import { UserDashboardComponent } from './user-components/user-dashboard/user-dashboard.component';
import { UserLoginComponent } from './user-components/user-login/user-login.component';
import { UserNewDietPlanComponent } from './user-components/user-new-diet-plan/user-new-diet-plan.component';
import { ZoomTestComponent } from './deprecated-components/zoom-test/zoom-test.component';
import { LoginComponent } from './login/login.component';
import { AddMeasurmentsComponent } from './add-measurments/add-measurments.component';
import { MealEditorComponent } from './meal-editor/meal-editor.component';

const routes: Routes = [
  { path: '', redirectTo: '/login-screen', pathMatch: 'full' },
  { path: 'login-screen', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: FoodDetailComponent },
  { path: 'foods', component: FoodsComponent },
  { path: 'users-details', component: UsersDetailsComponent},
  { path: 'new-user', component: NewUserComponent},
  { path: 'users', component: UsersComponent },
  { path: 'diet-program/:id', component: DietProgramComponent },
  { path: 'SR/:id', component: SystemRecommendationComponent },
  // { path: 'user-measurment', component: UserMeasurmentComponent },
  { path: 'user-measurment/:id', component: UserMeasurmentComponent },
  { path: 'last-diet-plan/:id', component: LastDietPlanComponent },
  { path: 'manager-food-editing', component: ManagerFoodEditingComponent },
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: 'user-login', component: UserLoginComponent },
  { path: 'user-new-diet-plan', component: UserNewDietPlanComponent },
  { path: 'test-page-zoom', component: ZoomTestComponent},
  { path: 'add-measurments/:custID', component: AddMeasurmentsComponent},
  { path: 'add-measurments/:custID/:measureID', component: AddMeasurmentsComponent},
  { path: 'meal-editor/:id', component: MealEditorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }