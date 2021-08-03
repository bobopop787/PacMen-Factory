const pacImgs = [
  ['./images/PacMan1.png', './images/PacMan2.png'],
  ['./images/PacMan3.png', './images/PacMan4.png'],
];
const pacMen = []; // This array holds all the pacmen

let isRunning = false;
let interval;

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
  let openMouth = (Math.random() < 0.5) ? true : false;
  let counter = 0;

  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.id = `pacman${pacMen.length + 1}`;
  newimg.style.position = 'absolute';
  newimg.src = speed.x > 0 ?
    (openMouth ? pacImgs[0][0] : pacImgs[0][1]) :
    (openMouth ? pacImgs[1][0] : pacImgs[1][1]);
  newimg.width = 100;
  newimg.height = 100;
  newimg.style.zIndex = -1;

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
    clearInterval(interval);
    document.getElementById('startButton').innerHTML = "Start game";
    isRunning = false;
    return;
  }
  isRunning = true;
  // loop over pacmen array and move each one and move image in DOM
  interval = setInterval(() => {
    pacMen.forEach((item) => {
      checkCollisions(item);
      item.position.x += item.velocity.x;
      item.position.y += item.velocity.y;

      item.newimg.style.left = item.position.x;
      item.newimg.style.top = item.position.y;
    });
  }, 20);
  document.getElementById('startButton').innerHTML = "Pause game";
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
      item.newimg.src = pacImgs[0][0];
    } else {
      item.newimg.src = pacImgs[1][0];
    }
  } else {
    if(item.velocity.x > 0) {
      item.newimg.src = pacImgs[0][1];
    } else {
      item.newimg.src = pacImgs[1][1];
    }
  }
}

function makePacmen(amount = 1) {
  for(let i = 0; i < amount; i++) {
    pacMen.push(makePac()); // add a new PacMan
    console.log("hi");
  }
}

function removePacmen(amount = 1) {
  console.log(pacMen);
  for(let i = 0; i < amount; i++) {
    let lastElement = document.getElementById(`pacman${pacMen.length}`);
    if(lastElement === null) {
      break;
    }
    lastElement.parentElement.removeChild(lastElement);
    pacMen.pop();
  }
}

function clearPacmen() {
  pacMen.splice(0, pacMen.length);
  document.getElementById("game").innerHTML = "";
}

//don't change this line
if (typeof module !== 'undefined') {
  module.exports = { checkCollisions, update, pacMen };
}