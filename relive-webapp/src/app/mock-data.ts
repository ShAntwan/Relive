import { Food } from './food';
import { Category } from './categories';
import { User } from './users-details';
import { dietProgram } from './diet-program';


export const FOODS: Food[] = [
    { id: 1, name: "Milk", category: 1, proteins: 10, carbohydrates: 0, fats: 20, sugars: 10, src: "Milk.jpg" },
    { id: 12, name: 'Cereal', category: 3, proteins: 5, carbohydrates: 10, fats: 0, sugars: 30, src: "Cereal.jpeg" },
    { id: 13, name: 'Black Coffee', category: 7, proteins: 0, carbohydrates: 0, fats: 0, sugars: 10,  src: "Black-Coffee.jpeg" },
    { id: 14, name: 'Whole Pita Bread', category: 3, proteins: 0, carbohydrates: 30, fats: 0, sugars: 0, src: "Whole-wheat-pita-bread.jpg" },
    { id: 15, name: 'Cucumber', category: 2, proteins: 10, carbohydrates: 10, fats: 10, sugars: 10, src: "Cucumber.jpg" },
    { id: 16, name: 'Tomatoes', category: 4, proteins: 10, carbohydrates: 10, fats: 10, sugars: 10, src: "Milk.jpg" },
    { id: 17, name: 'Red Meat', category: 5, proteins: 10, carbohydrates: 10, fats: 10, sugars: 10, src: "Milk.jpg" },
    { id: 18, name: 'Chicken Breast', proteins: 10, carbohydrates: 10, fats: 10, sugars: 10, category: 5, src: "Milk.jpg" },
    { id: 19, name: 'Rice', category: 3, proteins: 10, carbohydrates: 10, fats: 10, sugars: 10, src: "Milk.jpg" },
    { id: 20, name: 'Tuna', category: 5, proteins: 10, carbohydrates: 10, fats: 10, sugars: 10, src: "Milk.jpg" }
];

export const CATEGORIES: Category[] = [
    { id: 1, name: "Dairy",},
    { id: 2, name: "Vegetable",},
    { id: 3, name: "Starchy Food",},
    { id: 4, name: "Fruits",},
    { id: 5, name: "Protein",},
    { id: 6, name: "Fat",},
    { id: 7, name: "Drinks",},
];

export const USERS: User[] = [
    { id: 1, loginID: 'cyganderton', firstName: 'Cy', lastName: 'Ganderton', phoneNumber: '123-456-7890', joinDate: new Date('2023-01-01'), startingWeight: 70, birthdayDate: new Date('1990-01-01'), height: 175, age: 33, sex: 'M', athlete: true },
    { id: 2, loginID: 'harthagerty', firstName: 'Hart', lastName: 'Hagerty', phoneNumber: '098-765-4321', joinDate: new Date('2022-06-15'), startingWeight: 80, birthdayDate: new Date('1985-06-15'), height: 180, age: 38, sex: 'F', athlete: false },
    { id: 3, loginID: 'briceswyre', firstName: 'Brice', lastName: 'Swyre', phoneNumber: '555-123-4567', joinDate: new Date('2021-03-20'), startingWeight: 85, birthdayDate: new Date('1995-03-20'), height: 170, age: 29, sex: 'M', athlete: true }
];

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
