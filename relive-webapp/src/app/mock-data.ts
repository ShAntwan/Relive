import { Food } from './interfaces/food';
import { Category } from './categories';
import { User } from './interfaces/users-details';
import { dietProgram } from './interfaces/diet-program';


// export const FOODS: Food[] = [
//     { FoodID: 1, FoodName: "Milk", Calories: 20, Category: 1, Proteins: 10, Carbohydrates: 0, Fats: 20, Sugars: 10, ImagePath: "Milk.jpg" },
//     { FoodID: 12, FoodName: 'Cereal', Category: 3, Proteins: 5, carbohydrates: 10, fats: 0, sugars: 30, src: "Cereal.jpeg" },
//     { FoodID: 13, FoodName: 'Black Coffee', Category: 7, Proteins: 0, carbohydrates: 0, fats: 0, sugars: 10,  src: "Black-Coffee.jpeg" },
//     { FoodID: 14, FoodName: 'Whole Pita Bread', Category: 3, Proteins: 0, carbohydrates: 30, fats: 0, sugars: 0, src: "Whole-wheat-pita-bread.jpg" },
//     { FoodID: 15, FoodName: 'Cucumber', Category: 2, Proteins: 10, carbohydrates: 10, fats: 10, sugars: 10, src: "Cucumber.jpg" },
//     { FoodID: 16, FoodName: 'Tomatoes', Category: 4, Proteins: 10, carbohydrates: 10, fats: 10, sugars: 10, src: "Milk.jpg" },
//     { FoodID: 17, FoodName: 'Red Meat', Category: 5, Proteins: 10, carbohydrates: 10, fats: 10, sugars: 10, src: "Milk.jpg" },
//     { FoodID: 18, FoodName: 'Chicken Breast', Proteins: 10, carbohydrates: 10, fats: 10, sugars: 10, category: 5, src: "Milk.jpg" },
//     { FoodID: 19, FoodName: 'Rice', Category: 3, Proteins: 10, carbohydrates: 10, fats: 10, sugars: 10, src: "Milk.jpg" },
//     { FoodID: 20, FoodName: 'Tuna', Category: 5, Proteins: 10, carbohydrates: 10, fats: 10, sugars: 10, src: "Milk.jpg" }
// ];
// export const FOODS: Food[] = [
//     { FoodID: 1, FoodName: "Milk", Calories: 20, Category: "1", Proteins: 10, Carbohydrates: 0, Fats: 20, Sugars: 10, ImagePath: "Milk.jpg" },
//     { FoodID: 12, FoodName: 'Cereal', Calories: 150, Category: "3", Proteins: 5, Carbohydrates: 30, Fats: 5, Sugars: 15, ImagePath: "Cereal.jpeg" },
//     { FoodID: 13, FoodName: 'Black Coffee', Calories: 2, Category: "7", Proteins: 0, Carbohydrates: 0, Fats: 0, Sugars: 0, ImagePath: "Black-Coffee.jpeg" },
//     { FoodID: 14, FoodName: 'Whole Wheat Pita Bread', Calories: 120, Category: "3", Proteins: 4, Carbohydrates: 25, Fats: 1.5, Sugars: 1, ImagePath: "Whole-wheat-pita-bread.jpg" },
//     { FoodID: 15, FoodName: 'Cucumber', Calories: 10, Category: "2", Proteins: 1, Carbohydrates: 2, Fats: 0.1, Sugars: 1, ImagePath: "Cucumber.jpg" },
//     { FoodID: 16, FoodName: 'Tomatoes', Calories: 15, Category: "4", Proteins: 1, Carbohydrates: 3, Fats: 0.2, Sugars: 2, ImagePath: "Tomatoes.jpg" },
//     { FoodID: 17, FoodName: 'Red Meat', Calories: 250, Category: "5", Proteins: 25, Carbohydrates: 0, Fats: 15, Sugars: 0, ImagePath: "Red-Meat.jpg" },
//     { FoodID: 18, FoodName: 'Chicken Breast', Calories: 165, Category: "5", Proteins: 31, Carbohydrates: 0, Fats: 3.6, Sugars: 0, ImagePath: "Chicken-Breast.jpg" },
//     { FoodID: 19, FoodName: 'Rice', Calories: 130, Category: "3", Proteins: 2.7, Carbohydrates: 28, Fats: 0.3, Sugars: 0.1, ImagePath: "Rice.jpg" },
//     { FoodID: 20, FoodName: 'Tuna', Calories: 180, Category: "5", Proteins: 39, Carbohydrates: 0, Fats: 1, Sugars: 0, ImagePath: "Tuna.jpg" }
// ];


export const CATEGORIES: Category[] = [
    { id: 1, name: "Dairy",},
    { id: 2, name: "Vegetable",},
    { id: 3, name: "Starchy Food",},
    { id: 4, name: "Fruits",},
    { id: 5, name: "Protein",},
    { id: 6, name: "Fat",},
    { id: 7, name: "Drinks",},
];

// export const USERS: User[] = [
//     { id: 1, loginID: 'cyganderton', firstName: 'Cy', lastName: 'Ganderton', phoneNumber: '123-456-7890', joinDate: new Date('2023-01-01'), startingWeight: 70, birthdayDate: new Date('1990-01-01'), height: 175, age: 33, sex: 'M', athlete: true },
//     { id: 2, loginID: 'harthagerty', firstName: 'Hart', lastName: 'Hagerty', phoneNumber: '098-765-4321', joinDate: new Date('2022-06-15'), startingWeight: 80, birthdayDate: new Date('1985-06-15'), height: 180, age: 38, sex: 'F', athlete: false },
//     { id: 3, loginID: 'briceswyre', firstName: 'Brice', lastName: 'Swyre', phoneNumber: '555-123-4567', joinDate: new Date('2021-03-20'), startingWeight: 85, birthdayDate: new Date('1995-03-20'), height: 170, age: 29, sex: 'M', athlete: true }
// ];

export const DIETPROGRAMS: dietProgram[] = [
    {
        Meal: 'Cereal',
        Calorie: 350,
        Carbohydrates: 45,
        Proteins: 20,
        Fats: 10,
        Sugars: 15
    },
    {
        Meal: 'Tomato',
        Calorie: 600,
        Carbohydrates: 80,
        Proteins: 30,
        Fats: 20,
        Sugars: 8
    },
    {
        Meal: 'Steak',
        Calorie: 500,
        Carbohydrates: 60,
        Proteins: 25,
        Fats: 18,
        Sugars: 10
    },
    {
        Meal: 'icecream',
        Calorie: 200,
        Carbohydrates: 30,
        Proteins: 5,
        Fats: 7,
        Sugars: 12
    }
];
