from backend.app import create_app

app = create_app()

def give_app_context(func):
    def wrapper_func():
        with app.app_context():
            func()
    return wrapper_func 