window.onload = () => {
  const camera = document.querySelector("a-camera");
  const mainScene = document.getElementById("js--main");
  const endScene = document.getElementById("js--end");
  const arrows = document.getElementsByClassName("js--arrow");
  const boxButtons = document.getElementsByClassName('js--boxButton');
  const platforms = document.getElementsByClassName('js--platform');
  let score = document.getElementById("js--score");
  let scorePoints = 0;
  let puzzelsCompleted = 0;

  drawScore();

  for (var i = 0; i < boxButtons.length; i++) {
    boxButtons[i].addEventListener('click', function (event) {
      completePuzzel(event.target);
      drawScore();
    });
  }

  for (var i = 0; i < platforms.length; i++) {
    platforms[i].addEventListener('click', function (event) {
      updatePlayerPosition(event.target.getAttribute("position"));
    });
  }

  function drawScore() {
    let newScore = document.createElement("a-text");
    newScore.setAttribute("id", "js--score");
    newScore.setAttribute("value", "score: " + scorePoints);
    newScore.setAttribute("position", "0 0.07 -0.1");
    newScore.setAttribute("align", "center");
    newScore.setAttribute("width", "0.2");
    newScore.setAttribute("color", "black");
    score.parentNode.removeChild(score);
    score = newScore;
    camera.appendChild(score);

      console.log(camera.getAttribute("rotation"));
  }

  function completePuzzel(boxButton) {
    scorePoints += 10;
    boxButton.setAttribute("color", "#9c9c9c");
    boxButton.classList.remove("clickable");
    boxButton.parentEl.setAttribute("color", "#65c270");
    puzzelsCompleted += 1;
    if (puzzelsCompleted === 3) {
      setTimeout(function() {
        showEndScreen();
      }, 2000);
    }
    updateButtons();
    updateArrows();
  }

  function updatePlayerPosition(platformPosition) {
    camera.setAttribute("position", platformPosition.x + " 1.8 " + -1*platformPosition.y);
    console.log(camera.getAttribute("position"));
  }

  function showEndScreen() {
    camera.setAttribute("position", "0 1.8 0");
    mainScene.setAttribute("visible", "false");
    endScene.setAttribute("visible", "true");
  }

  function updateButtons() {
    switch (puzzelsCompleted) {
      case 1:
        boxButtons[1].setAttribute("color", "#d9db70");
        boxButtons[1].classList.add("clickable");
        break;
      case 2:
        boxButtons[2].setAttribute("color", "#d9db70");
        boxButtons[2].classList.add("clickable");
        break;
      case 3:
        arrows[2].setAttribute("visible", "false");
        break;
      default: console.log("dit hoort niet (updateButtons)");
    }
  }

  function updateArrows() {
    switch (puzzelsCompleted) {
      case 1:
        arrows[0].setAttribute("visible", "false");
        arrows[1].setAttribute("visible", "true");
        break;
      case 2:
        arrows[1].setAttribute("visible", "false");
        arrows[2].setAttribute("visible", "true");
        break;
      case 3:
        arrows[2].setAttribute("visible", "false");
        break;
      default: console.log("dit hoort niet (updateArrows)");
    }
  }
}
