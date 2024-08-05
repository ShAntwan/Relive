import os
import json
import requests

# basePath = r'C:\Users\Antwan\Documents\important documents\important documents\Semester 12\ProgrammingForML - 095219\exportData\\'
basePath = '/home/v0lcaner/Documents/ImportantDocuments/Education/Semester12/Relive-ProJect/proj/Relive_anew/filesToIgnore/exportData/'
baseURL = 'http://localhost:8080/'

# api urls
#FKEY to base
createMealFoodItems = "createMealFoodItemsTable"
dropMealFoodItems = "dropMealFoodItemsTable"

createProgramMeals = "createProgramMealsTable"
dropProgramMeals = "dropProgramMealsTable"

createCustomerDetails = "createCustomerDetailsTable"
dropCustomerDetails = "dropCustomerDetailsTable"

#FKEY to non-base
createMeasurementDetails = "createMeasurementDetailsTable"
dropMeasurementDetails = "dropMeasurementDetailsTable"

createCustomerPrograms = "createCustomerProgramsTable"
dropCustomerPrograms = "dropCustomerProgramsTable"

createCustomerMealHistory = "createCustomerMealHistoryTable"
dropCustomerMealHistory = "dropCustomerMealHistoryTable"

#non Fkey
createLoginDetails = "createLoginDetailsTable"
dropLoginDetails = "dropLoginDetailsTable"

createDietaryPrograms = "createDietaryProgramsTable"
dropDietaryPrograms = "dropDietaryProgramsTable"

createMeals = "createMealsTable"
dropMeals = "dropMealsTable"

createFoodItemsTable = "createFoodItemsTable"
dropFoodItemsTable = "dropFoodItemsTable"


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
    # #FKEY to non-base tables:
    
    # #MeasurementDetails
    # requests.get(url=baseURL+createMeasurementDetails)
    # requests.get(url=baseURL+dropMeasurementDetails)
    # #CustomerPrograms
    # requests.get(url=baseURL+createCustomerPrograms)
    # requests.get(url=baseURL+dropCustomerPrograms)
    # #CustomerMealHistory
    # requests.get(url=baseURL+createCustomerMealHistory)
    # requests.get(url=baseURL+dropCustomerMealHistoryTable)
    
    # #FKEY to base tables:

    # #CustomerDetails
    # requests.get(url=baseURL+createCustomerDetails)
    # requests.get(url=baseURL+dropCustomerDetails)
    # #MealFoodItems
    # requests.get(url=baseURL+createMealFoodItems)
    # requests.get(url=baseURL+dropMealFoodItems)
    # #ProgramMeals
    # requests.get(url=baseURL+createProgramMeals)
    # requests.get(url=baseURL+dropProgramMeals)

    # #Non FKEY tables:

    # #LoginDetails
    # requests.get(url=baseURL+createLoginDetails)
    # requests.get(url=baseURL+dropLoginDetails)
    # #DietaryPrograms
    # requests.get(url=baseURL+createDietaryPrograms)
    # requests.get(url=baseURL+dropDietaryPrograms)
    # #Meals
    # requests.get(url=baseURL+createMeals)
    # requests.get(url=baseURL+dropMeals)
    # #FoodItems
    # requests.get(url=baseURL+createFoodItemsTable)
    # requests.get(url=baseURL+dropFoodItemsTable)

    print("Great Success!!")




if __name__ == '__main__':
    main()