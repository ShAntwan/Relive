import sys
import json
from datetime import datetime
import os
import joblib
import pandas as pd


def calculate_age(birth_date):
    # print(data[0]["BirthdayDate"][:10])
    if isinstance(birth_date, str):
        birthdate = datetime.strptime(birth_date[:10], "%Y-%m-%d")
    today = datetime.now()
    age = today.year - birthdate.year - ((today.month, today.day) < (birthdate.month, birthdate.day))
    return age

def process_data(data):
    newData = [{}]
    # ['Height','liquids','bellyFatPercentage','bmr','bmi',
    # 'overallWeight','fatPercentage','bones','muscles','Age','totalCalories']
    newData[0]["Height"] = data[0]["Height"]
    newData[0]["liquids"] = data[0]["Liquids"]
    newData[0]["bellyFatPercentage"] = data[0]["AbdominalFatPercentage"]
    newData[0]["bmr"] = data[0]["BMR"]
    newData[0]["bmi"] = data[0]["BMI"]
    newData[0]["overallWeight"] = data[0]["TotalWeight"]
    newData[0]["fatPercentage"] = data[0]["FatPercentage"]
    newData[0]["bones"] = data[0]["Bones"]
    newData[0]["muscles"] = data[0]["Muscles"]
    newData[0]["Age"] = calculate_age(data[0]["BirthdayDate"])

    if newData:
        # Return a dictionary with feature names as keys
        return pd.DataFrame(newData, columns=["Height", "liquids", "bellyFatPercentage", "bmr", "bmi", "overallWeight", "fatPercentage", "bones", "muscles", "Age"])
    else:
        return None


    # return newData

if __name__ == "__main__":
    # Read JSON data from standard input
    input_data = sys.stdin.read()
    # print("input", input_data)
    data = json.loads(input_data)

    newData = process_data(data)

    model_path = os.path.join(os.path.dirname(__file__), 'random_forest_model.pkl')
    # print("path", model_path)
    model, label_encoder, diet_plan_df = joblib.load(model_path)
    
    prediction = model.predict(newData)
    # filtered_df = diet_plan_df[diet_plan_df['id']==label_encoder.inverse_transform(prediction)]
    decoded_label = label_encoder.inverse_transform(prediction)
    filtered_df = diet_plan_df[diet_plan_df['id']==decoded_label[0]]
    print(filtered_df.to_json())
    # print("Received data:", list(filtered_df))
    # Process the data
    # process_data(data)