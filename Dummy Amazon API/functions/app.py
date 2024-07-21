from flask import Flask, jsonify, send_from_directory
import os

app = Flask(__name__, static_folder='../amazon_api/public')

# Products 
products = [
    { "id": 1, "name": "Mobile", "price": 11999, "description": "High-end smartphone with all the latest features.", "image": "mobile.jpeg" },
    { "id": 2, "name": "Laptop", "price": 33999, "description": "Powerful laptop suitable for all your work and entertainment needs.", "image": "laptop.jpeg" },
    { "id": 3, "name": "Headphones", "price": 199, "description": "Noise-cancelling over-ear headphones with superior sound quality.", "image": "headphones.jpeg" },
    { "id": 4, "name": "Charger", "price": 29, "description": "Fast-charging USB-C charger for all your devices.", "image": "charger.jpeg" },
    { "id": 5, "name": "Powerbank", "price": 499, "description": "High-capacity powerbank to keep your devices charged on the go.", "image": "powerbank.jpeg" },
    { "id": 6, "name": "Pendrive", "price": 359, "description": "Conveniently pocket-sized Pendrive for easy portability.", "image": "pendrive.jpeg" }
]

@app.route('/api/products', methods=['GET'])
def get_products():
    return jsonify(products)

@app.route('/amazon_api/public/images/<path:filename>')
def serve_image(filename):
    return send_from_directory('../amazon_api/public/images', filename)

@app.route('/amazon_api/public/styles.css')
def serve_styles():
    return send_from_directory('../amazon_api/public', 'styles.css')

@app.route('/amazon_api/public/scripts.js')
def serve_scripts():
    return send_from_directory('../amazon_api/public', 'scripts.js')

@app.route('/')
def index():
    return send_from_directory('../amazon_api/public', 'index.html')


