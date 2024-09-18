import mysql.connector
from flask import Flask, request, jsonify
import joblib
import os

app = Flask(__name__)

# Load the model
model_path = os.path.join(os.path.dirname(__file__), 'model', 'random_forest_model.pkl')
model = joblib.load(model_path)

# Database connection details
db_config = {
    'user': 'v0lcaner',
    'password': 'v0lcaner2',
    'host': '127.0.0.1',
    'database': 'relive_database',
    'port': '3306',
}

def get_features_from_db(customer_id):
    try:
        # Connect to the MariaDB database
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        # ['Height','liquids','bellyFatPercentage','bmr','bmi',
        # 'overallWeight','fatPercentage','bones','muscles','Age','totalCalories']
        # Modify the query to match your database schema
        query = "SELECT age, height, weight FROM customers WHERE customerID = %s"
        cursor.execute(query, (customer_id,))
        result = cursor.fetchone()

        # Ensure the result is returned in the format expected by the model
        if result:
            return list(result)
        else:
            return None
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the JSON data from the request
        data = request.json
        
        # Extract customerId
        customer_id = data.get('customerId')
        if not customer_id:
            return jsonify({'error': 'customerId is required'}), 400

        # Fetch the features using customerId
        features = get_features_from_db(customer_id)
        if not features:
            return jsonify({'error': 'No data found for customerId'}), 404

        # Make sure features are in the correct format (e.g., a list of lists)
        prediction = model.predict([features])

        # Return the prediction as a JSON response
        return jsonify({'prediction': prediction.tolist()})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
