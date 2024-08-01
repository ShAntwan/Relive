import os
import json
import requests
from datetime import datetime

# basePath = r'C:\Users\Antwan\Documents\important documents\important documents\Semester 12\ProgrammingForML - 095219\exportData\\'
basePath = '/home/v0lcaner/Documents/ImportantDocuments/Education/Semester12/Relive-ProJect/proj/Relive_anew/filesToIgnore/exportData/'
baseURL = 'http://localhost:8080/'


def addFoodItems():
    addFoodItemURL = 'addfooditem'
    createFoodItemsTable = 'createfooditemstable'
    dropFoodItemsTable = 'dropFoodItemsTable'
    # delete and create the table in order to instert food data into it
    # print("Resetting Food Items Table...", end=' ')
    # requests.get(url=baseURL+createFoodItemsTable) 
    # requests.get(url=baseURL+dropFoodItemsTable)
    # requests.get(url=baseURL+createFoodItemsTable) 
    jsonIDtoFoodID = {}
    print("Done!\nImporting Food Items...", end=" ")
    with open(basePath+'foods.json', 'r', encoding='utf-8') as file:
        foodData = json.load(file)
        for index, item in enumerate(foodData):
            requestData = { 
                "FoodID": index, 
                "FoodName": str(item['name']).replace("'","\\'"),
                "FoodNameDisp": str(item['displayName']).replace("'","\\'"),
                "Category": str(item['category']).replace("'","\\'") if 'category' in item else '',
                "Calories": item['calories'] if 'calories' in item else 0,
                "Proteins": item['protein'] if 'protein' in item else 0,
                "Fats": item['fats'] if 'fats' in item else 0,
                "Carbohydrates": item['carbs'] if 'carbs' in item else 0,
                "Sugars": item['sugar'] if 'sugar' in item else 0,
                "Sodium": item['sodium'] if 'sodium' in item else 0,
                "ImagePath": str(item['note']).replace("'","\\'").replace("%", "PERCENT") if 'note' in item else ''
            }
            requests.post(url=baseURL+addFoodItemURL, data=requestData) 
            jsonIDtoFoodID[item["id"]] = index
            # pastebin_url = r.text
            # print("The pastebin URL is:%s" % pastebin_url)
    print("Done!")
    return jsonIDtoFoodID

def safe_convert_to_datetime(seconds, type):
    try:
        # Ensure that the seconds and nanoseconds are within valid ranges
        if not isinstance(seconds, (int, float)):
            raise ValueError(f"Invalid types for timestamp values: seconds={seconds}")
        if seconds < 0:
            raise ValueError(f"Invalid timestamp values: seconds={seconds}")
        dt_obj = datetime.utcfromtimestamp(seconds)
        if type == "date":
            return dt_obj.strftime("%Y-%m-%d")
        return dt_obj
    except (OSError, ValueError) as e:
        print(f"Error converting timestamp: {e}")
        return None

# def convert_to_time(hour):
#     return 

def addNewCustomer(loginObj, customerObj):
    addLoginDetailURL = "addNewLoginDetail"
    addCustomerURL = "addNewCustomer"
    requests.get(url=baseURL+addLoginDetailURL, data=loginObj)
    requests.get(url=baseURL+addCustomerURL, data=customerObj)


def main():
    allfiles = os.listdir(basePath)
    print("Files to Import:\n", allfiles)
    jsonIDFoodIDDict = addFoodItems()
    customerIndex = 0 # used for customerID and loginID
    measureIndex = 0
    programIndex = 0
    mealIndex = 0
    mealFoodIndex = 0
    # print(jsonIDFoodIDDict)
    for fileName in allfiles:
        if "food" in fileName:
            continue
        print("Importing File:'" + str(fileName) + "'...", end=' ')
        with open(basePath+fileName, 'r', encoding='utf-8') as file:
            data = json.load(file)
            # iterate over customer data
            for customerItem in data:
                # create loginDetail object
                loginDetail = {
                    "LoginID": customerIndex,
                    "PhoneNumber": str(customerItem['Phone']) if 'Phone' in customerItem else '',
                    "CardID": str(customerItem['IdCard']) if 'IdCard' in customerItem else '',
                }

                join_date = safe_convert_to_datetime(abs(customerItem['JoinDate']['seconds']), "datetime")
                birth_date = safe_convert_to_datetime(abs(customerItem['BirthDate']['seconds']), "date")

                # create customer information object
                customerDetail = {
                    "CustomerID": customerIndex,
                    "LoginID": customerIndex,
                    'FirstName': customerItem['FirstName'].replace("'","\\'") if 'FirstName' in customerItem else '',
                    'LastName': customerItem['LastName'].replace("'","\\'") if 'LastName' in customerItem else '',
                    'JoinDate': join_date,
                    'BirthdayDate': birth_date,
                    'Sex': customerItem['Gender'] if 'Gender' in customerItem else '',
                    'Athlete': customerItem['Athlete'] if 'Athlete' in customerItem else '',
                    'Email': customerItem['Email'] if 'Email' in customerItem else '',
                    'DefaultLang': customerItem['DefaultLang'] if 'DefaultLang' in customerItem else '',
                }

                addNewCustomer(loginDetail, customerDetail)
                # customerIDtoIndex[item['id']] = customerIndex
                if 'MEASURES' in customerItem:
                    measuresData = customerItem['MEASURES']
                    for measureItem in measuresData:
                        # dealing with bullshit data
                        if 'overallWeight' in measureItem:
                            if measureItem['overallWeight'] == None:
                                measureItem['overallWeight'] = -1
                        if 'Height' in customerItem:
                            if customerItem['Height'] == None:
                                customerItem['Height'] = -1
                        if 'muscles' in measureItem:
                            if measureItem['muscles'] == None:
                                measureItem['muscles'] = -1
                            if measureItem['muscles'] > 1000:
                                measureItem['muscles'] = -1
                        if 'bones' in measureItem:
                            if measureItem['bones'] == None:
                                measureItem['bones'] = -1
                            if measureItem['bones'] > 1000:
                                measureItem['bones'] = -1
                        if 'liquids' in measureItem:
                            if measureItem['liquids'] == None:
                                measureItem['liquids'] = -1
                            if measureItem['liquids'] > 1000:
                                measureItem['liquids'] = -1
                        if 'bellyFatPercentage' in measureItem:
                            if measureItem['bellyFatPercentage'] == None:
                                measureItem['bellyFatPercentage'] = -1
                            if measureItem['bellyFatPercentage'] > 1000:
                                measureItem['bellyFatPercentage'] = -1
                        if 'bmi' in measureItem:
                            if measureItem['bmi'] == None:
                                measureItem['bmi'] = -1
                            if measureItem['bmi'] > 100:
                                measureItem['bmi'] %= 100
                        if 'bmi' in measureItem:
                            if measureItem['bmr'] == None:
                                measureItem['bmr'] = -1
                            if measureItem['bmr'] > 10000:
                                measureItem['bmr'] %= 10000
                        if 'fatPercentage' in measureItem:
                            if measureItem['fatPercentage'] == None:
                                measureItem['fatPercentage'] = -1
                        if 'hipsCirc' in measureItem:
                            if measureItem['hipsCirc'] == None:
                                measureItem['hipsCirc'] = -1
                            if measureItem['hipsCirc'] > 1000:
                                measureItem['hipsCirc'] %= 1000
                        if 'handCirc' in measureItem:
                            if measureItem['handCirc'] == None:
                                measureItem['handCirc'] = -1
                            if measureItem['handCirc'] > 1000:
                                measureItem['handCirc'] %= 1000
                        if 'thighCirc' in measureItem:
                            if measureItem['thighCirc'] == None:
                                measureItem['thighCirc'] = -1
                            if measureItem['thighCirc'] > 1000:
                                measureItem['thighCirc'] %= 1000
                        if 'chestCirc' in measureItem:
                            if measureItem['chestCirc'] == None:
                                measureItem['chestCirc'] = -1
                            if measureItem['chestCirc'] > 1000:
                                measureItem['chestCirc'] %= 1000
                        # create measurement object
                        measurementDetail = {
                            'MeasureID': measureIndex,
                            'CustomerID': customerIndex,
                            'MeasureDate': safe_convert_to_datetime(abs(measureItem['date']['seconds']), 'date'),
                            'TotalWeight': measureItem['overallWeight'] if 'overallWeight' in measureItem else -1,
                            'Height': customerItem['Height'] if 'Height' in customerItem else -1,
                            'BMI': measureItem['bmi'] if 'bmi' in measureItem else -1,
                            'BMR': measureItem['bmr'] if 'bmr' in measureItem else -1,
                            'AbdominalFatPercentage': measureItem['bellyFatPercentage'] if 'bellyFatPercentage' in measureItem else -1,
                            'FatPercentage': measureItem['fatPercentage'] if 'fatPercentage' in measureItem else -1,
                            'Muscles': measureItem['muscles'] if 'muscles' in measureItem else -1,
                            'Bones': measureItem['bones'] if 'bones' in measureItem else -1,
                            'Liquids': measureItem['liquids'] if 'liquids' in measureItem else -1,
                            'HipCircumference': measureItem['hipsCirc'] if 'hipsCirc' in measureItem else -1,
                            'HandCircumference': measureItem['handCirc'] if 'handCirc' in measureItem else -1,
                            'ThighCircumference': measureItem['thighCirc'] if 'thighCirc' in measureItem else -1,
                            'ChestCircumference': measureItem['chestCirc'] if 'chestCirc' in measureItem else -1,
                        }
                        # add it to DB
                        addNewMeasurementURL = 'addNewMeasurementDetail'
                        # console.log("NewMeasurement")
                        requests.get(url=baseURL+addNewMeasurementURL, data=measurementDetail)
                        measureIndex += 1
                if 'DIET_PLAN' in customerItem:
                    dietPlan = customerItem['DIET_PLAN']
                    dietProgramDetail = {
                        'ProgramID': programIndex,
                        'ProgramName': "תובנית " + str(programIndex),
                        'TasteProfile': None,
                        'Description': dietPlan['notes'] if 'notes' in dietPlan else "-1",
                    }
                    requests.get(url=baseURL+'createDietProgram', data=dietProgramDetail)
                    print(len(dietPlan), end=' ')
                    if 'meals' in dietPlan:
                        mealsData = dietPlan['meals']
                        print("mealdata", mealsData)
                        for mealItem in mealsData:
                            mealDetail = {
                                'MealID': mealIndex,
                                'MealDay': 1,
                                'MealStartPeriod': str(mealItem['hourFrom'])+":00:00" if 'hourFrom' in mealItem else "7:00:00", 
                                'MealEndPeriod': str(mealItem['hourTo'])+":00:00" if 'hourTo' in mealItem else "21:00:00", 
                            }
                            requests.get(url=baseURL+'createMeal', data=mealDetail)

                            if 'options' in mealItem:
                                foodItems = mealItem['options']
                                for foodItem in foodItems:
                                    mealFoodDetail = {
                                        'MealFoodItemID': mealFoodIndex,
                                        'MealID': mealIndex,
                                        'FoodID': jsonIDFoodIDDict[foodItem['id']],
                                        'FoodPortion': 100,
                                    }
                                    requests.get(url=baseURL+'createMealFoodItem', data=mealFoodDetail)
                                    mealFoodIndex += 1
                            mealIndex += 1
                    programIndex += 1

                customerIndex += 1

            ### THE ENTIRE PROCESS!
            # use indexes to keep track of IDs
            # create customer info object, add to table. 
            # create first measurement of customer, use index as ID
            # create Diet Plan (a process)
            ## add a row to DietaryPrograms, keep ProgramID
            ## link it to customer with CustomerPrograms, use 'date' as StartDate, ignore totals, online is unused
            ## seperate options into meals, create meal for each
            ## link meals to program
            ### create mealfoods for each meal.
            ### use id to jsodIDFoodIDDict

        print("Done!")
    # json.load()
    print("\nAll files imported successfully!!")


if __name__ == '__main__':
    main()