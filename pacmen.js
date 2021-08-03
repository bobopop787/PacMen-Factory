let pos = 0;
const pacArray = [
  ['./images/PacMan1.png', './images/PacMan2.png'],
  ['./images/PacMan3.png', './images/PacMan4.png'],
];
let direction = 0;
const pacMen = []; // This array holds all the pacmen

let isRunning = false;

// This function returns an object with random values
function setToRandom(isAboslute, xs, ys = xs) {
  if(!isAboslute) {
    return {
      x: (2 * Math.random() * xs) - xs,
      y: (2 * Math.random() * ys) - ys,
    };
  }
  return {
    x: Math.random() * xs,
    y: Math.random() * ys,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let speed = setToRandom(false, 10); // {x:?, y:?}
  let velocity = speed;
  let position = setToRandom(true, window.innerWidth - 100, window.innerHeight - 100);
  let openMouth = true;
  let counter = 0;

  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.id = `pacman${pacMen.length + 1}`;
  newimg.style.position = 'absolute';
  newimg.src = './images/PacMan1.png';
  newimg.width = 100;
  newimg.height = 100;

  // DONE set position here
  newimg.style.left = position.x;
  newimg.style.top = position.y;

  // DONE add new Child image to game
  game.appendChild(newimg);

  // return details in an object
  return {
    position,
    speed,
    velocity,
    newimg,
    openMouth,
    counter,
  };
}

function update() {
  if(isRunning) {
    return;
  }
  isRunning = true;
  // loop over pacmen array and move each one and move image in DOM
  setInterval(() => {
    pacMen.forEach((item) => {
      checkCollisions(item);
      item.position.x += item.velocity.x;
      item.position.y += item.velocity.y;

      item.newimg.style.left = item.position.x;
      item.newimg.style.top = item.position.y;
    });
  }, 20);
  document.getElementById('startButton').innerHTML = "Game started!";
}

function checkCollisions(item) {
  // DONE detect collision with all walls and make pacman bounce
  if(item.speed.x > 0) {
    if(item.position.x < 0) {
      item.velocity.x = item.speed.x;
    }
    if(item.position.x + item.newimg.width > window.innerWidth) {
      item.velocity.x = -item.speed.x;
    }
  } else {
    if(item.position.x < 0) {
      item.velocity.x = -item.speed.x;
    }
    if(item.position.x + item.newimg.width > window.innerWidth) {
      item.velocity.x = item.speed.x;
    }
  }
  
  if(item.speed.y > 0) {
    if(item.position.y < 0) {
      item.velocity.y = item.speed.y;
    }
    if(item.position.y + item.newimg.height > window.innerHeight) {
      item.velocity.y = -item.speed.y;
    }
  } else {
    if(item.position.y < 0) {
      item.velocity.y = -item.speed.y;
    }
    if(item.position.y + item.newimg.height > window.innerHeight) {
      item.velocity.y = item.speed.y;
    }
  }

  // Change image
  item.counter++;
  if(item.counter % 10 === 0) {
    item.openMouth = !item.openMouth;
  }

  if(item.openMouth) {
    if(item.velocity.x > 0) {
      item.newimg.src = './images/PacMan1.png';
    } else {
      item.newimg.src = './images/PacMan3.png';
    }
  } else {
    if(item.velocity.x > 0) {
      item.newimg.src = './images/PacMan2.png';
    } else {
      item.newimg.src = './images/PacMan4.png';
    }
  }
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}

//don't change this line
if (typeof module !== 'undefined') {
  module.exports = { checkCollisions, update, pacMen };
}