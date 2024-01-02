# Retro Nokia Snake Game

### Video Demo
[![Retro Snake Game Demo](https://img.youtube.com/vi/ddp92Dnglds/0.jpg)](https://youtu.be/ddp92Dnglds?si=2pQWuN31bxPWCKNA)


### Description
This project is a web-based version of the classic Nokia snake game, implemented with a modern twist. It combines the nostalgic feel of the old-school snake game with contemporary web technologies, offering a fun and engaging experience. 

### How to Play
- Navigate to the [Retro Snake Game website](https://nokia-snake-game-09f6f3ef60b8.herokuapp.com/).
- For docker: http://localhost:5000
- Register for an account or log in.
- Use the arrow keys or on-screen buttons to control the snake.
- Eat food to grow the snake and increase your score.
- Avoid running into the walls or the snake's tail.

## Project Structure

The project is structured into various components, each serving a specific role in the application:

### `templates` Folder
- **`layout.html`**: Serves as the base template for the application. It defines the basic structure (HTML boilerplate, navigation bar, etc.) that is common across all pages.
- **`index.html`**: The main game interface where users interact with the snake game.
- **`login.html`** and **`register.html`**: These templates handle user authentication, allowing users to sign up for a new account or log in to an existing one.
- **`leaderboard.html`**: Displays the leaderboard, ranking users based on their high scores.

The templates utilize Jinja templating language to dynamically generate HTML based on the server-side data.

### `static` Folder
- **`style.css`**: Contains custom styling for the application, complementing the Bootstrap framework used for the frontend design.
- **`script.js`**: Houses the core logic of the snake game, including user input handling, game mechanics, and rendering the game on the screen.
- **`gameMusic`**: A subfolder containing audio files that are played during various events in the game (e.g., game start, game over, snake eating).

### `app.py`
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

## Database Configuration and Future Plans

### Current Database: SQLite

The current version of the Retro Snake Game uses SQLite as its database. SQLite is a lightweight, file-based database system that is excellent for development and testing due to its simplicity and ease of configuration.

#### Limitations with SQLite and Heroku

- **Data Persistence**: One of the primary limitations of using SQLite on Heroku is its lack of data persistence. Heroku's filesystem is ephemeral, which means any changes to files (like the SQLite database file) are lost whenever the Heroku dyno restarts (which can happen frequently, e.g., every 24 hours or after deployments).
- **Scalability**: SQLite is suitable for smaller applications with less concurrency. However, as it is a file-based database, it is not ideal for applications with high transaction rates or requiring more robust data handling capabilities.
- **Production Environment**: While SQLite is fantastic for development and prototyping, it may not be the best choice for a production environment, especially for applications that require data persistence and more complex database operations.

### Future Plans: Migration to PostgreSQL

To address these limitations and prepare the Retro Snake Game for more robust and scalable use, there are plans to migrate the database from SQLite to PostgreSQL in the future.

#### Why PostgreSQL?

- **Persistence and Reliability**: PostgreSQL, being a full-fledged relational database management system, offers persistent storage, ensuring that the data is not lost between dyno restarts on Heroku.
- **Advanced Features**: PostgreSQL comes with many advanced features such as powerful indexing, full-text search, and more complex querying capabilities, making it suitable for larger-scale and more complex applications.
- **Heroku Integration**: Heroku has first-class support for PostgreSQL, including automated backups, easy scaling, and a simple setup process.

This migration will enhance the application's capability to handle more users, provide more reliable data storage, and enable the implementation of more complex features.

_Stay tuned for updates on this transition to PostgreSQL for the Retro Snake Game!_


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
