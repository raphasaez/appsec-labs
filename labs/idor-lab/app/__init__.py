from flask import Flask, render_template

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'devkey123'

    # Registrar o blueprint da API
    from app.routes import main
    app.register_blueprint(main, url_prefix='/api')

    # Servir SPA em todas as outras rotas
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def index(path):
        return render_template('index.html')

    return app
