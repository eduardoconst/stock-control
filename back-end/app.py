from flask import Flask
from flask_cors import CORS
from products.routes import products_api

app = Flask(__name__)
CORS(app)  # Permite chamadas de outras origens (ex.: Next.js)

# Registrar o blueprint
app.register_blueprint(products_api, url_prefix='/api')

@app.route('/')
def home():
    return {"message": "API do Gerenciador de Estoque está no ar!"}

if __name__ == '__main__':
    app.run(debug=True)
