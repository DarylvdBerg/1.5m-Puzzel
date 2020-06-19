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
  const collidables = document.getElementsByClassName('collidable');
  const puzzleReset = document.getElementsByClassName("js--puzzle-reset");
  const puzzleButtons = document.getElementsByClassName("js--puzzle-button");
  const solutionsPuzzle1 = document.getElementsByClassName('js--solution-1');
  const puzzleNumbers = document.getElementsByClassName("js--puzzle-number");
  const solutionsPuzzle2 = document.getElementsByClassName('js--solution-2');
  const codeBox = document.getElementById('js--code-box');


  let score = document.getElementById("js--score");
  let sickCounter = document.getElementById("js--sick-counter");
  let codeText = document.getElementById('js--puzzle-2-code');
  let scorePoints = 0;
  let sickPeople = 0;
  let puzzelsCompleted = 0;
  let code = '';

  drawScore();
  drawSickCounter();
  drawPuzzle2Code();

  //                  //
  //  EVENT LISTENERS //
  //                  //

  for(var i = 0; i < collidables.length; i++) {
    collidables[i].addEventListener('mouseenter', function(event){
        let objectPositionZ = event.target.object3D.getWorldPosition().z;
        let cameraPositionZ = camera.object3D.getWorldPosition().z;
        if(Math.abs(objectPositionZ - cameraPositionZ) <= 2.5) {
          event.target.remove();
          updateSickCounter(3);
        }
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

  for (var i = 0; i < puzzleReset.length; i++) {
    puzzleReset[i].addEventListener('click', function (event) {
      for (var i = 0; i < puzzleButtons.length; i++) {
        puzzleButtons[i].setAttribute('color', '#353536');
      }
      for (var i = 0; i < puzzleNumbers.length; i++) {
        puzzleNumbers[i].setAttribute('color', '#353536');
        code = '';
        drawPuzzle2Code();
      }
    })
  }

  for (var i = 0; i < puzzleButtons.length; i++) {
    puzzleButtons[i].addEventListener('click', function (event) {
      togglePuzzleButtons(event.target);
      checkSolutionPuzzle1();
    });
  }

  for (var i = 0; i < puzzleNumbers.length; i++) {
    puzzleNumbers[i].addEventListener('click', function (event) {
      togglePuzzleButtons(event.target);
      changeCodeText(event.target);
      drawPuzzle2Code();
      checkSolutionPuzzle2();
    })
  }
  //            //
  // DOOR CLICK //
  //            //
  document.getElementById('js--door-puzzel-1')
  .addEventListener('click', function(event){
    event.target.classList.remove("clickable");
    areaTransition(area1, area2);
  });

  document.getElementById('js--door-puzzel-2')
  .addEventListener('click', function(event){
    event.target.classList.remove("clickable");
    areaTransition(area2, area3);
  });
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

  function drawPuzzle2Code() {
    let newCode = document.createElement("a-text");
    newCode.setAttribute("id", "js--puzzle-2-code");
    newCode.setAttribute("value", code);
    newCode.setAttribute("scale", "6 6 6");
    newCode.setAttribute("position", "-3.5 0 0.55");
    codeText.parentNode.removeChild(codeText);
    codeText = newCode;
    codeBox.appendChild(codeText);
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

  //             //
  // ALL PUZZLES //
  //             //
  function togglePuzzleButtons(target) {
    if (target.getAttribute("color") === "#353536") {
      target.setAttribute("color", "#65a658")
    } else {
        target.setAttribute("color", "#353536")
    }
  }

  //           //
  //  PUZZLE 1 //
  //           //
  function checkSolutionPuzzle1() {
    let counter = 0;
    let solutionCounter = 0;
    for (var i = 0; i < puzzleButtons.length; i++) {
      if (puzzleButtons[i].getAttribute("color") === "#65a658") {
        counter++;
      }
    }
    for (var i = 0; i < solutionsPuzzle1.length; i++) {
      if (solutionsPuzzle1[i].getAttribute("color") === "#65a658") {
        solutionCounter++;
      }
    }
    if (counter === solutionCounter && solutionCounter === 7) {
      const doorBlocker = area1.querySelector('[data-door-blocker]');
      doorBlocker.remove();
      updateScore(10);
    }
  }

  //           //
  //  PUZZLE 2 //
  //           //
  function checkSolutionPuzzle2() {
    var counter = 0;
    var solutionCounter = 0;
    for (var i = 0; i < puzzleNumbers.length; i++) {
      if (puzzleNumbers[i].getAttribute("color") === "#65a658") {
        counter++;
      }
    }
    for (var i = 0; i < solutionsPuzzle2.length; i++) {
      if (solutionsPuzzle2[i].getAttribute("color") === "#65a658") {
        solutionCounter++;
      }
    }
    if (counter === solutionCounter && solutionCounter === 2) {
      const doorBlocker = area2.querySelector('[data-door-blocker]');
      doorBlocker.remove();
      updateScore(10);
    }
  }

  function changeCodeText(target) {
    if (target.getAttribute("color") === "#65a658") {
      code += target.childNodes[1].getAttribute('value');
    }
  }

  //           //
  //  PUZZLE 3 //
  //           //
}
