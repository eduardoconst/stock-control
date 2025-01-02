from flask import Blueprint, jsonify, request

products_api = Blueprint('products_api', __name__)

# Dados simulados
products = [
    {"id": 1, "name": "Produto A", "stock": 10},
    {"id": 2, "name": "Produto B", "stock": 20},
]

@products_api.route('/products', methods=['GET'])
def get_products():
    return jsonify(products)

@products_api.route('/products', methods=['POST'])
def add_product():
    data = request.json
    new_product = {
        "id": len(products) + 1,
        "name": data['name'],
        "stock": data['stock']
    }
    products.append(new_product)
    return jsonify(new_product), 201