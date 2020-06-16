window.onload = () => {
  const camera = document.querySelector("a-camera");
  const mainScene = document.getElementById("js--main");
  const endScene = document.getElementById("js--end");
  const arrows = document.getElementsByClassName("js--arrow");
  const boxButtons = document.getElementsByClassName('js--boxButton');
  const platforms = document.getElementsByClassName('js--platform');
  const doorUnlockersBad = document.getElementsByClassName('js--door-unlocker-bad');
  const doorUnlockersGood = document.getElementsByClassName("js--door-unlocker-good");
  const cameraResetPos = "0 1.8 0";
  const area1 = document.getElementById("js--area-1");
  const area2 = document.getElementById("js--area-2");
  const area3 = document.getElementById("js--area-3");
  const endArea = "";
  const puzzleButtons = document.getElementsByClassName("js--puzzle-button");w

  let score = document.getElementById("js--score");
  let sickCounter = document.getElementById("js--sick-counter");
  let scorePoints = 0;
  let sickPeople = 0;
  let puzzelsCompleted = 0;

  drawScore();
  drawSickCounter();

  //                //
  //  EVENT LISTENERS //
  //                //
  for(var i = 0; i < doorUnlockersGood.length; i++) {
    doorUnlockersGood[i].addEventListener('click', function(event) {
      const parent = event.target.getAttribute("data-parent");
      const area = document.getElementById(parent);
      const doorBlocker = area.querySelector('[data-door-blocker]');
      doorBlocker.remove();
      updateScore(10);
    });
  }

  for(var i = 0; i < doorUnlockersBad.length; i++){
    doorUnlockersBad[i].addEventListener('click', function(event) {
      const parent = event.target.parentEl;
      parent.remove();
      updateSickCounter(5);
    });
  }

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

  for (var i = 0; i < puzzleButtons.length; i++) {
    puzzleButtons[i].addEventListener('click', function (event) {
      console.log("test");
    });
  }
  //            //
  // DOOR CLICK //
  //            //
  document.getElementById('js--door-puzzel-1')
  .addEventListener('click', function(event){
    areaTransition(area1, area2);
  });

  // document.getElementById('js--door-puzzel-2')
  // .addEventListener('click', function(event){
  //   areaTransition(area2, area3);
  // });
  //
  // document.getElementById('js--door-puzzel-3')
  // .addEventListener('click', function(event){
  //   areaTransition(area3, endArea);
  // });

  //                  //
  // GENERAL METHODS  //
  //                  //
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
  }

  function drawSickCounter() {
    let newSickCounter = document.createElement("a-text");
    newSickCounter.setAttribute("id", "js--sick-counter");
    newSickCounter.setAttribute("value", "sick: " + sickPeople);
    newSickCounter.setAttribute("position", ".16 0.07 -0.1");
    newSickCounter.setAttribute("align", "right");
    newSickCounter.setAttribute("width", "0.2");
    newSickCounter.setAttribute("color", "black");
    sickCounter.parentNode.removeChild(sickCounter);
    sickCounter = newSickCounter;
    camera.appendChild(sickCounter);
  }

  function updateSickCounter(newSickPeople) {
    sickPeople += newSickPeople;
    drawSickCounter();
  }

  function updateScore(newScore) {
    scorePoints += newScore;
    drawScore();
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

  function areaTransition(currentArea, nextArea) {
    currentArea.setAttribute('visible', false);
    nextArea.setAttribute('visible', true);
    camera.setAttribute('position', cameraResetPos);
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

  //           //
  //  PUZZLE 1 //
  //           //

  //           //
  //  PUZZLE 2 //
  //           //

  //           //
  //  PUZZLE 3 //
  //           //
}
