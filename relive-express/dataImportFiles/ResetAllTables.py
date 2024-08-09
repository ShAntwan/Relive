import os
import json
import requests

# basePath = r'C:\Users\Antwan\Documents\important documents\important documents\Semester 12\ProgrammingForML - 095219\exportData\\'
basePath = '/home/v0lcaner/Documents/ImportantDocuments/Education/Semester12/Relive-ProJect/proj/Relive_anew/filesToIgnore/exportData/'
baseURL = 'http://localhost:8080/api/'

# api urls
#FKEY to base
createMealFoodItems = "MealFoodItems/createTable"
dropMealFoodItems = "MealFoodItems/dropTable"

createProgramMeals = "ProgramMeals/createTable"
dropProgramMeals = "ProgramMeals/dropTable"

createCustomerDetails = "CustomerDetails/createTable"
dropCustomerDetails = "CustomerDetails/dropTable"

#FKEY to non-base
createMeasurementDetails = "MeasurementDetails/createTable"
dropMeasurementDetails = "MeasurementDetails/dropTable"

createCustomerPrograms = "CustomerPrograms/createTable"
dropCustomerPrograms = "CustomerPrograms/dropTable"

createCustomerMealHistory = "CustomerMealHistory/createTable"
dropCustomerMealHistory = "CustomerMealHistory/dropTable"

#non Fkey
createLoginDetails = "LoginDetails/createTable"
dropLoginDetails = "LoginDetails/dropTable"

createDietaryPrograms = "DietaryPrograms/createTable"
dropDietaryPrograms = "DietaryPrograms/dropTable"

createMeals = "Meals/createTable"
dropMeals = "Meals/dropTable"

createFoodItemsTable = "FoodItems/createTable"
dropFoodItemsTable = "FoodItems/dropTable"


def createAllTables():
    #non FKEY
    requests.get(url=baseURL+createLoginDetails)
    requests.get(url=baseURL+createDietaryPrograms)
    requests.get(url=baseURL+createMeals)
    requests.get(url=baseURL+createFoodItemsTable)

    #Base FKEY
    requests.get(url=baseURL+createCustomerDetails)
    requests.get(url=baseURL+createMealFoodItems)
    requests.get(url=baseURL+createProgramMeals)

    #non base FKEY
    requests.get(url=baseURL+createMeasurementDetails)
    requests.get(url=baseURL+createCustomerPrograms)
    requests.get(url=baseURL+createCustomerMealHistory)
    
    print("Successfully Created All Tables")




def dropAllTables():
    #non base FKEY
    requests.get(url=baseURL+dropMeasurementDetails)
    requests.get(url=baseURL+dropCustomerPrograms)
    requests.get(url=baseURL+dropCustomerMealHistory)

    #Base FKEY
    requests.get(url=baseURL+dropCustomerDetails)
    requests.get(url=baseURL+dropMealFoodItems)
    requests.get(url=baseURL+dropProgramMeals)

    #non FKEY
    requests.get(url=baseURL+dropLoginDetails)
    requests.get(url=baseURL+dropDietaryPrograms)
    requests.get(url=baseURL+dropMeals)
    requests.get(url=baseURL+dropFoodItemsTable)

    print("Successfully Dropped All Tables")


def main():
    createAllTables()
    dropAllTables()
    createAllTables()

    print("Great Success!!")




if __name__ == '__main__':
    main()