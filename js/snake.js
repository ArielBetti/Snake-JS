const upsnake = document.getElementById("cima");
const downsnake = document.getElementById("baixo");
const leftsnake = document.getElementById("esquerda");
const rigthsnake = document.getElementById("direita");

upsnake.addEventListener("click", (event) => {
  moveUp();
});

downsnake.addEventListener("click", (event) => {
  moveDown();
});

leftsnake.addEventListener("click", (event) => {
  moveLeft();
});

rigthsnake.addEventListener("click", (event) => {
  moveRight();
});

window.onload = function teste() {
  stage = document.getElementById('stage');
  ctx = stage.getContext("2d");
  document.addEventListener("keydown", keyPush);
  //setInterval(game, 140);

  vel = .1;
  score = [];
  core = 0;

  vx = vy = 0;
  px = 10;
  py = 15;
  tp = 17.5;
  qp = 17;
  ax = ay = 15;

  caminho = [];
  rastro = 2;


  function game() {

    pontos.textContent = core;

    px += vx;
    px = parseFloat(px.toFixed(1));
    py += vy;
    py = parseFloat(py.toFixed(1));

    if (px % 1 == 0 && py % 1 == 0) {

      if (px < 0) {
        px = qp - 1;
      }
      if (px > qp - 1) {
        px = 0;
      }
      if (py < 0) {
        py = qp - 1;
      }
      if (py > qp - 1) {
        py = 0;
      }

      ctx.fillStyle = "#080a19";
      ctx.fillRect(0, 0, stage.width, stage.height);

      ctx.fillStyle = "#cc0202";
      ctx.fillRect(ax * tp, ay * tp, tp, tp);

      ctx.fillStyle = "#04af00";

      if((vx || vy) && caminho.find(e => e.x == px &&  e.y == py)) {
          vx = vy = 0;
          rastro = 2;
          core = 0;
          console.log('Pontos resetados');
          requestAnimationFrame(game);
          return;
      }

      caminho.push({ x: px, y: py });
      while (caminho.length > rastro) {
        caminho.shift();
      }

      for (var i = 0; i < caminho.length; i++) {
        ctx.fillRect(caminho[i].x * tp, caminho[i].y * tp, tp, tp);
        // if (caminho[i].x == px && caminho[i].y == py) {
        //   vx = vy = 0;
        //   rastro = 2;
        //   core = 0;
        //   console.log('Pontos resetados');
        // }
      }

      if (ax == px && ay == py) {
        rastro++;
        core++;
        console.log('Você fez ' + core + ' pontos !');
        ax = Math.floor(Math.random() * qp);
        ay = Math.floor(Math.random() * qp);
      }
    }
    requestAnimationFrame(game);
  }

  function keyPush(event) {

    switch (event.keyCode) {
      case 37: //Esquerda 
        moveLeft()
        break;

      case 38: //Cima
        moveUp()
        break;

      case 39: //Direita
        moveRight()
        break;

      case 40: //Baixo
        moveDown()
        break;

      default:

        break;
    }
  }

  game();
}

function moveRight() {
  vx = vel;
  py = vy > 0 ? Math.floor(py) : Math.ceil(py);
  vy = 0;
}

function moveLeft() {
  vx = -vel;
  py = vy > 0 ? Math.floor(py) : Math.ceil(py); //Math.floor(py);
  vy = 0;
}

function moveDown() {
  vy = vel;
  px = vx > 0 ? Math.floor(px) : Math.ceil(px);
  vx = 0;
}

function moveUp() {
  vy = -vel;
  px = vx > 0 ? Math.floor(px) : Math.ceil(px);
  vx = 0;
}
