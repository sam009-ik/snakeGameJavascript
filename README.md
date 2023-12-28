# Retro Nokia Snake Game

This project is a web-based version of the classic Nokia snake game, implemented with a modern twist. It combines the nostalgic feel of the old-school snake game with contemporary web technologies, offering a fun and engaging experience. 

## Project Structure and Description
The project is structured into various components, each serving a specific role in the application:

> 'templates' Folder
layout.html: Serves as the base template for the application. It defines the basic structure (HTML boilerplate, navigation bar, etc.) that is common across all pages.
index.html: The main game interface where users interact with the snake game.
login.html and register.html: These templates handle user authentication, allowing users to sign up for a new account or log in to an existing one.
leaderboard.html: Displays the leaderboard, ranking users based on their high scores.
The templates utilize Jinja templating language to dynamically generate HTML based on the server-side data.

> 'static' Folder
style.css: Contains custom styling for the application, complementing the Bootstrap framework used for the frontend design.
script.js: Houses the core logic of the snake game, including user input handling, game mechanics, and rendering the game on the screen.
gameMusic: A subfolder containing audio files that are played during various events in the game (e.g., game start, game over, snake eating).

> app.py
This is the main application file where the Flask server is defined. It handles backend logic, including routing, user authentication, session management, and interaction with the SQLite database for storing user information and high scores.

## Features

- **User Registration and Authentication**: Secure user registration and login system, allowing players to have individual accounts.
- **High Score Tracking**: Each user's high score is recorded and stored in the backend.
- **Leaderboard**: A leaderboard displays the top players, fostering a competitive environment.
- **Gameplay Options**: Players can start the game by pressing the spacebar or using the on-screen touch arrow keys.
- **Dynamic Gameplay**: As the snake eats more, it grows larger, and the game's speed increases, adding to the challenge.
- **Customization**: Players can personalize their experience by choosing the snake's color via on-screen buttons.
- **Responsive Design**: The game is fully responsive, providing a seamless experience on various devices and screen sizes.



## Technologies

- **Frontend**: The game's frontend is built with HTML, CSS, and JavaScript, offering a dynamic and responsive user interface.
- **Backend**: Flask is used for the backend, handling user authentication, high score storage, and leaderboard functionality.
- **Database**: User data and scores are stored using SQLite, managed with SQLAlchemy.
- **Deployment**: The application is containerized using Docker for easy deployment and scalability.

## Local Setup

1. **Clone the Repository**:
   ```
   git clone https://github.com/your-github-username/snakegamejavascript.git
   cd snakegamejavascript
   ```

2. **Install Dependencies**:
   - Create a virtual environment and activate it:
     ```
     python -m venv venv
     source venv/bin/activate  # For Windows use `venv\Scripts\activate`
     ```
   - Install the required packages:
     ```
     pip install -r requirements.txt
     ```

3. **Run the Application**:
   - Start the Flask application:
     ```
     flask run
     ```

## Design Choices and Considerations
- Flask Framework: Chosen for its simplicity and flexibility in developing web applications. It allows for easy setup and integration with SQLite and SQLAlchemy for database management.

- SQLite Database: Used for its lightweight nature, making it ideal for a small-scale application like this game.

- Bootstrap: Selected for the frontend to quickly achieve a responsive and modern UI design.

- JavaScript for Game Logic: Ensures dynamic interaction on the client side, providing a smooth and responsive gaming experience.

- Game Music: Added to enhance user engagement and provide a more immersive gaming experience.

## Playing the Game

- Navigate to `http://localhost:5000` in your web browser.
- Log in or register a new account to start playing.
- Use the spacebar or on-screen controls to control the snake.
- Try to eat as much food as possible without colliding with the walls or the snake's tail.

## Contributing

Contributions to the project are welcome! Feel free to fork the repository and submit pull requests.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments
- Special thanks to freecode Camp for helping with the javascript.
- Special thanks to CS50 for the inspiration behind this project.
- Shoutout to all the classic Nokia snake game enthusiasts out there!

---

Happy Gaming!
