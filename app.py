from flask import Flask, request, jsonify
import pandas as pd
import joblib

app = Flask(__name__)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
