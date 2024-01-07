#implementing flask server here and backend storage and logic
from flask import Flask, flash, jsonify, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_login import UserMixin
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
import os
from dotenv import load_dotenv

load_dotenv() #Load environment variables from .env file

app = Flask(__name__, template_folder='templates')
# Fetch the database URL from the environment variables
database_url = os.getenv('DATABASE_URL')
print("Database URL:", database_url)

# Replace 'postgres://' with 'postgresql://' if needed
if database_url and database_url.startswith('postgres://'):
    database_url = database_url.replace('postgres://', 'postgresql://', 1)

#Configure sqlite and sqlAlchemy
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = database_url
app.config['SQLALCHEMY_ECHO'] = False  # Add this line to enable SQL logging

db = SQLAlchemy(app)
#Initialize as instance of Login Manager
login_manager = LoginManager(app)

@login_manager.user_loader
def load_user(user_id):
    return db.session.get(User, int(user_id))

    #return User.query.get(int(user_id))


# Define your User model
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    snakename = db.Column(db.String(80), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    highscore = db.Column(db.Integer, default=0)

# Create tables (this should be done only once)
with app.app_context():
    db.create_all()


#For testing homepage
@login_required # Ensure the user is logged in, to access this route
@app.route('/')
def index():
    if current_user.is_authenticated:
        # Retrieve the user's high score from the database
        user_highscore = current_user.highscore or 0
        return render_template('index.html', user_highscore=user_highscore)
    else:
        return redirect(url_for('login'))  # Redirect to login page if not authenticated

@app.route('/register', methods=['GET', 'POST'])
def register():
    """
    Register a new user.

    This function handles the registration process for a new user. It receives a POST request with the user's
    username, snakename, and password. It then hashes the password using the pbkdf2:sha256 method and stores the
    user's information in the database. If the username already exists, it displays an error message and redirects
    the user to the registration page. After successful registration, the user is logged in and a success message
    is displayed. Finally, the user is redirected to the homepage.

    Returns:
        If the request method is POST, it redirects to the homepage.
        If the request method is GET, it renders the 'register.html' template.

    """
    if request.method == 'POST':
        username = request.form['username']
        snakename = request.form['snakename']
        password = request.form['password']

        # Hash the password before storing
        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            # Handle the case where the username already exists
            flash('Username already exists. Please choose a different username.', 'error')
            return redirect(url_for('register'))

        new_user = User(username=username, snakename=snakename, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        login_user(new_user)  # Log in the user after registration
        flash('Registered successfully!', 'success')  # Add success message
        return redirect(url_for('index'))  # Redirect to homepage

    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        user = User.query.filter_by(username=username).first()

        if user and check_password_hash(user.password, password):
            login_user(user)
            flash('Logged in successfully!', 'success')  # Add success message
            return redirect(url_for('index'))  # Redirect to homepage after login

    return render_template('login.html')

@app.route('/logout')
@login_required  # Ensure the user is logged in to log out
def logout():
    logout_user()
    flash('Logged out!', 'success')  # Add success message
    return redirect(url_for('login'))  # Redirect to login page after logout

# Update the /update_high_score route
@app.route('/update_high_score', methods=['POST'])
@login_required
def update_high_score():
    data = request.get_json()
    new_high_score = data.get('highScore')

    # Update the user's high score in the database if it's higher
    if current_user.is_authenticated and new_high_score > current_user.highscore:
        current_user.highscore = new_high_score
        db.session.commit()

        return jsonify({'message': 'High score updated successfully'})
    else:
        return jsonify({'message': 'Invalid high score'}), 400

# Add this new route at the end of your app.py file
@app.route('/get_high_score', methods=['GET'])
@login_required
def get_high_score():
    # Retrieve the current user's high score
    high_score = current_user.highscore or 0
    return jsonify({'highScore': high_score})

@app.route('/leaderboard')
def leaderboard():
    try:
        # Retrieve a list of users ordered by highscore in descending order
        users = User.query.order_by(User.highscore.desc()).all()
        return render_template('leaderboard.html', users=users)
    except Exception as e:
        # Print the exception for debugging
        print(f"An error occurred in the leaderboard route: {e}")
        # Raise the exception again to get a detailed error message in the Flask console
        raise e

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)