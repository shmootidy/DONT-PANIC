var pause = false

timer();

function timer() {
  var gameTime = 180;
  var counter = setInterval(tickTock, 1000);

  function tickTock() {
    if (!pause) {
      gameTime = gameTime - 1;
      document.getElementById("timer").innerHTML = gameTime;
    }
  }
}

document.onkeydown = function (e) {
    if (e.code === 'Space') {
        pause ? pause = false : pause = true
    }
}