const upsnake = document.getElementById("up");
const downsnake = document.getElementById("down");
const leftsnake = document.getElementById("left");
const rigthsnake = document.getElementById("right");

upsnake.addEventListener("click", () => {
  moveUp();
});

downsnake.addEventListener("click", () => {
  moveDown();
});

leftsnake.addEventListener("click", () => {
  moveLeft();
});

rigthsnake.addEventListener("click", () => {
  moveRight();
});

window.onload = function startGame() {
  render_record.textContent = localStorage.getItem("record-score");

  stage = document.getElementById("stage");
  ctx = stage.getContext("2d");
  document.addEventListener("keydown", keyPush);

  vel = 0.1;
  sscore = [];
  score = 0;

  vx = vy = 0;
  px = 10;
  py = 15;
  tp = 17.5;
  qp = 17;
  ax = ay = 15;

  path = [];
  track = 2;

  function game() {
    render_score.textContent = score;

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

      if ((vx || vy) && path.find((e) => e.x == px && e.y == py)) {
        vx = vy = 0;
        track = 2;
        score = 0;

        requestAnimationFrame(game);
        return;
      }

      path.push({ x: px, y: py });
      while (path.length > track) {
        path.shift();
      }

      for (var i = 0; i < path.length; i++) {
        ctx.fillRect(path[i].x * tp, path[i].y * tp, tp, tp);
        render_record.textContent = localStorage.getItem("record-score");
      }

      if (ax == px && ay == py) {
        track++;
        score++;
        onSavePersonalRecord();
        ax = Math.floor(Math.random() * qp);
        ay = Math.floor(Math.random() * qp);
      }
    }
    requestAnimationFrame(game);
  }

  function keyPush(event) {
    switch (event.keyCode) {
      case 37: //left
        moveLeft();
        break;

      case 38: //up
        moveUp();
        break;

      case 39: //right
        moveRight();
        break;

      case 40: //down
        moveDown();
        break;

      default:
        break;
    }
  }

  game();
};

const onSavePersonalRecord = () => {
  const currentRecord = localStorage.getItem("record-score");

  if (score > currentRecord) {
    window.localStorage.setItem("record-score", score);
  }
};

function moveRight() {
  vx = vel;
  py = vy > 0 ? Math.floor(py) : Math.ceil(py);
  vy = 0;
}

function moveLeft() {
  vx = -vel;
  py = vy > 0 ? Math.floor(py) : Math.ceil(py);
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
