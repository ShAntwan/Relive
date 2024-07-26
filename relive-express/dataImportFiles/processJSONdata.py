import os
import json
import requests

basePath = '/home/v0lcaner/Documents/ImportantDocuments/Education/Semester12/Relive-ProJect/proj/Relive_anew/filesToIgnore/exportData/'
baseURL = 'http://localhost:8080/'

def addFoodItems():
    addFoodItemURL = 'addfooditem'
    with open(basePath+'foods.json', 'r', encoding='utf-8') as file:
        foodData = json.load(file)
        for index, item in enumerate(foodData):
            # requestData = { 
            #     "FoodID": index, 
            #     "FoodName": item['name'],
            #     "FoodNameDisp": item['displayName'],
            #     "Category": '',
            #     "Calories": 0,
            #     "Proteins": 0,
            #     "Fats": 0,
            #     "Carbohydrates": 0,
            #     "Sugars": 0,
            #     "Sodium": 0,
            #     "ImagePath": ''
            # }
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
                "ImagePath": str(item['note']).replace("'","\\'") if 'note' in item else ''
            }  
            # print(index, '\n', requestData)
            r = requests.post(url=baseURL+addFoodItemURL, data=requestData) 
            pastebin_url = r.text
            print("The pastebin URL is:%s" % pastebin_url)           
    pass


def main():
    # addFoodItems()
    allfiles = os.listdir(basePath)
    print("files", allfiles)
    for fileName in allfiles:
        print("fileName", fileName)
        if "food" in fileName:
            continue  
        with open(basePath+fileName, 'r', encoding='utf-8') as file:
            data = json.load(file)
            # print("filename", file, fileName, "food" in fileName, end='\n\n')
            # print(data)
    # json.load()
    

if __name__ == '__main__':
    main()