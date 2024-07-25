import sys
import json

def process_data(data):
    # Example processing - just print it out
    print("Received data:", data)

if __name__ == "__main__":
    # Read JSON data from standard input
    input_data = sys.stdin.read()
    print(input_data)
    data = json.loads(input_data)
    
    # Process the data
    process_data(data)