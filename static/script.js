//Define HTML elements

const board = document.getElementById('game-board')
const instructionText = document.getElementById('instruction-text')
const logo = document.getElementById("logo")
const score = document.getElementById('score')
const highScoreText = document.getElementById('highScore')


//Load Audio
const backgroundSound = new Audio('./static/gameMusic/bg-music.mp3');
const eatSound = new Audio('/static/gameMusic/snake-eating.mp3');
const dieSound = new Audio('/static/gameMusic/game-end.mp3');

let currentSnakeColor = '#2E2F30';

// Function to play background sound
function playBackgroundSound() {
    backgroundSound.loop = true;
    backgroundSound.play();
}

// Function to play eating sound
function playEatSound() {
    eatSound.play();
}

// Function to play dying sound
function playDieSound() {
    dieSound.play();
}

function stopBackgroundSound() {
    backgroundSound.pause();
    backgroundSound.currentTime = 0; // Rewind to the start
}

function changeSnakeColor(color) {
    currentSnakeColor = color; // Update global snake color
    draw(); // Redraw the board with the new snake color
}



//Define game variables
const gridSizeX = 25;
const gridSizeY = 16;
let snake = [{x: 15, y: 10}] //Coordinates for snake on game board
//Assign food to be randomly generated food on the board
let food = generateFood();
//default direction
let direction = 'left'
//game interval
let gameInterval;
//gameSpeed delay
let gameSpeedDelay = 200
let gameStarted = false;
//high score
let highScore = 0;



//Draw the map, snake and food
function draw () {
    //To clear board
    board.innerHTML = '';
    //Call drawSnake
    drawSnake();
    //Call drawFood
    drawFood();
    //Call update score
    updateScore();
}

//Draw snake
function drawSnake() {
    snake.forEach((segment)=> {
        //for each segment (which is essentially a position/coordinate (object given by x, y))
        //We define a variable snakeElement which is assigned a function createGameElement which makes a div with class = "snake"
        const snakeElement = createGameElement('div', 'snake');
        snakeElement.style.backgroundColor = currentSnakeColor;
        //Next call the set position function for each segment
        setPosition(snakeElement, segment)

        //append the snake element to the board
        board.appendChild(snakeElement);
    })

}

//Create a snake or food/cude
function createGameElement(tag, className) {
    //Takes in a html tag and a className
    //Here we dynamically create an element with the passed in tag when this function is called
    const element = document.createElement(tag);
    //Go to the className property of the created element and set it to className (passed in parameter)
    element.className = className;

    return element;

}

//setPosition function takes in a element, and a position
function setPosition(element, position) {
    //Element could be a created snake or food
    element.style.gridColumn = position["x"] //set position to the x value in segment
    element.style.gridRow = position["y"] //set position to the y coordinate of the segment
}

//Draw food function
function drawFood() {
if (gameStarted) {    
    const foodElement = createGameElement('div', 'food');
    //set position of foodElement, this will be randomly generated
    setPosition(foodElement, food);
    //append to the board
    board.appendChild(foodElement);
    }
}



//Randomly generate food
function generateFood() {
    const x = Math.floor((Math.random() * gridSizeX) + 1)
    const y = Math.floor((Math.random() * gridSizeY) + 1)
    
    return {x, y}

}

//Moving the snake
function move() {
    //Using the spead operator (...) to make a shallow copy( bit by bit copy) of the first object in snake array
    const head = {...snake[0]};
    //To move the snake
    switch (direction) {
        case 'right':
            head.x++;
            break;
        case 'left':
            head.x--;
            break;
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
    }
    //To push the new head say for example 'up' to snake array
    snake.unshift(head)
    //Pop the earlier object (last element of snake array): otherwise it will elongate
    //snake.pop() If we comment this out the snake appears to grow
    //Gives the illusion of movement
    if (head.x === food.x && head.y === food.y) {
        //If the head and food are at the same position
        //Randomly generate food again
        playEatSound();
        food = generateFood();
        increaseSpeed();
        clearInterval(gameInterval); 
        gameInterval = setInterval(() => {
            move();
            checkCollision();
            draw();
        }, gameSpeedDelay);
    } else {
        //Simply building the snake
        snake.pop();
    }
}

function startGame() {
    gameStarted = true; //Keep track of a running game
    instructionText.style.display = 'none';
    logo.style.display = 'none';
    // Update the high score in the HTML at the beginning of the game
    updateHighScoreInHTML(highScore);
    playBackgroundSound();
    gameInterval = setInterval(() => {
        move();
        checkCollision();
        draw()
    }, gameSpeedDelay)

}


//keypress listener event
function handleKeyPress(event) {
    if ((!gameStarted && event.code === 'Space') || (!gameStarted && event.key === '')) {
        startGame();
    } else {
        switch(event.key) {
            case 'ArrowUp':
                if (direction !== 'down') {
                    direction = 'up';
                }
                break;
            case 'ArrowDown':
                if (direction !== 'up') {
                    direction = 'down';
                }
                break;
            case 'ArrowLeft':
                if (direction !== 'right') {
                    direction = 'left';
                }
                break;
            case 'ArrowRight':
                if (direction !== 'left') {
                    direction = 'right';
                }
                break;
        }
    }
}

document.addEventListener('keydown', handleKeyPress) 



/* For arrow touch buttons */
function handleArrowButtonClick(direction) {
    console.log('handleArrowButtonClick called with direction:', direction);
    if (gameStarted) {
        // Game has started, update direction based on button click
        updateDirection(direction);
    } else {
        // Game has not started, pressing arrow button starts the game
        startGame();
    }
}

function updateDirection(newDirection) {
    // Update the direction only if it's a valid change
    console.log('updateDirection called with newDirection:', newDirection);
    if (newDirection !== direction) {
        // Check if the new direction is opposite to the current direction
        const isOppositeDirection =
            (newDirection === 'up' && direction === 'down') ||
            (newDirection === 'down' && direction === 'up') ||
            (newDirection === 'left' && direction === 'right') ||
            (newDirection === 'right' && direction === 'left');

        // Update the direction only if it's not the opposite direction
        if (!isOppositeDirection) {
            direction = newDirection;
        }
    }
}

// Event listeners for arrow buttons
document.getElementById('up-button').addEventListener('click', () => handleArrowButtonClick('up'));
document.getElementById('down-button').addEventListener('click', () => handleArrowButtonClick('down'));
document.getElementById('left-button').addEventListener('click', () => handleArrowButtonClick('left'));
document.getElementById('right-button').addEventListener('click', () => handleArrowButtonClick('right'));


function increaseSpeed() {
    console.log(gameSpeedDelay);
    if (gameSpeedDelay > 150) {
        gameSpeedDelay -= 5;

    } else if (gameSpeedDelay > 100) {
        gameSpeedDelay -= 3;
    } else if (gameSpeedDelay > 50) {
        gameSpeedDelay -= 2;
    } else if (gameSpeedDelay > 25) {
        gameSpeedDelay -= 1;
    }

}

function checkCollision() {
    const head = snake[0];

    if (head.x < 1 || head.x > gridSizeX || head.y < 1 || head.y > gridSizeY) {
        playDieSound();
        resetGame();
    }

    //WHen snake hits itself
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            stopBackgroundSound()
            playDieSound();
            resetGame();
        }
    }
}
function resetGame() {
    stopGame();
    // updateHighScoreInDatabase();
    
    // Check if the current score is greater than the high score
    const currentScore = snake.length - 1;

    // Check if the high score is 0 (initial state) or if the current score is greater than the high score
    if (highScore === 0 || currentScore > highScore) {
        highScore = currentScore;
        updateHighScoreInHTML(highScore);

        // Uncomment the following lines to update high score in the database
        fetch('/update_high_score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                highScore: currentScore,
            }),
        })
        .then(response => response.json())
        .then(_data => {
            console.log('High score updated in the database');
        })
        .catch(error => {
            console.error('Error updating high score in the database:', error);
        });
    }

    snake = [{x: 15, y: 10}];
    food = generateFood();
    direction = 'right';
    gameSpeedDelay = 200;
    updateScore();
}


function updateScore() {
    const currentScore = snake.length - 1;
    score.innerHTML = currentScore.toString().padStart(3, 0);
}

function stopGame() {
    stopBackgroundSound();

    clearInterval(gameInterval);
    gameStarted = false;
    instructionText.style.display = 'block';
    logo.style.display = 'block'
}


function updateHighScoreInHTML(newHighScore) {
    highScoreText.textContent = `Highscore: ${newHighScore.toString().padStart(3, '0')}`;
}
window.onload = function () {
    // Retrieve the user's high score from the database
    fetch('/get_high_score')  // Assuming you have a route to retrieve the high score
        .then(response => response.json())
        .then(data => {
            // Initialize the high score variable with the retrieved value
            highScore = data.highScore || 0;
            // Display the high score in the HTML
            updateHighScoreInHTML(highScore);
        })
        .catch(error => {
            console.error('Error retrieving high score:', error);
        });
};



/*function updateHighScoreInDatabase() {
    const currentScore = snake.length - 1;
    console.log('Updating high score. Current Score:', currentScore, 'High Score:', highScore);
    if (currentScore >= highScore) {
        highScore = currentScore;

        // Send an AJAX request to update high score in the database
        fetch('/update_high_score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                highScore: currentScore,
            }),
        })
        .then(response => response.json())
        .then(_data => {
            console.log('High score updated in the database');
        })
        .catch(error => {
            console.error('Error updating high score:', error);
        });

        // Update high score display
        highScoreText.textContent = `Highscore: ${highScore.toString().padStart(3, '0')}`;
        highScoreText.style.display = 'block';
        // Update high score in local storage
        updateHighScoreInLocalStorageForUser(user_highScore, highScore);
    }
}*/

// When the page loads, set the high score from local storage
/*window.onload = function () {
    if (user_highscore) {
        // Retrieve the user's high score from local storage
        highScore = getHighScoreForUser(user_highscore);
    } else {
        highScore = 0;
    }

    highScoreText.textContent = `Highscore: ${highScore.toString().padStart(3, '0')}`;
    highScoreText.style.display = 'block';
};*/

// Function to get the high score from local storage for a specific user
/*function getHighScoreForUser(userId) {
    const storedHighScore = localStorage.getItem(`highScore_${userId}`);
    return storedHighScore ? parseInt(storedHighScore) : 0;
}*/

// Function to update the high score in local storage for a specific user

/*function updateHighScoreInLocalStorageForUser(userId, score) {
    localStorage.setItem(`highScore_${userId}`, score.toString());
}*/


