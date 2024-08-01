import os
import json
import requests

# basePath = r'C:\Users\Antwan\Documents\important documents\important documents\Semester 12\ProgrammingForML - 095219\exportData\\'
basePath = '/home/v0lcaner/Documents/ImportantDocuments/Education/Semester12/Relive-ProJect/proj/Relive_anew/filesToIgnore/exportData/'
baseURL = 'http://localhost:8080/'


def addFoodItems():
    addFoodItemURL = 'addfooditem'
    createFoodItemsTable = 'createfooditemstable'
    dropFoodItemsTable = 'dropFoodItemsTable'
    # delete and create the table in order to instert food data into it
    print("Resetting Food Items Table...", end=' ')
    requests.get(url=baseURL+dropFoodItemsTable) 
    requests.get(url=baseURL+createFoodItemsTable) 
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


def main():
    allfiles = os.listdir(basePath)
    print("Files to Import:\n", allfiles)
    jsonIDFoodIDDict = addFoodItems()
    # print(jsonIDFoodIDDict)
    for fileName in allfiles:
        if "food" in fileName:
            continue
        print("Importing File:'" + str(fileName) + "'...", end=' ')
        userIndex = 0
        with open(basePath+fileName, 'r', encoding='utf-8') as file:
            data = json.load(file)
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