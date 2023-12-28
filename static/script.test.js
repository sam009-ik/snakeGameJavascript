// Test case 1: Moving right
snake = [{x: 0, y: 0}];
direction = 'right';
move();
console.log(snake); // Output: [{x: 1, y: 0}]

// Test case 2: Moving left
snake = [{x: 1, y: 0}];
direction = 'left';
move();
console.log(snake); // Output: [{x: 0, y: 0}]

// Test case 3: Moving up
snake = [{x: 0, y: 1}];
direction = 'up';
move();
console.log(snake); // Output: [{x: 0, y: 0}]

// Test case 4: Moving down
snake = [{x: 0, y: 0}];
direction = 'down';
move();
console.log(snake); // Output: [{x: 0, y: 1}]

// Test case 5: Eating food
snake = [{x: 0, y: 0}];
direction = 'right';
food = {x: 1, y: 0};
move();
console.log(snake); // Output: [{x: 1, y: 0}, {x: 0, y: 0}]
console.log(food); // Output: New randomly generated food object

// Test case 6: Not eating food
snake = [{x: 0, y: 0}];
direction = 'right';
food = {x: 2, y: 0};
move();
console.log(snake); // Output: [{x: 1, y: 0}]
console.log(food); // Output: Same food object as before