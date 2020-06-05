window.onload = () => {
  hintHandler();

  function hintHandler(){
    var puzzleOneHintBtn  = document.getElementById("js--puzzleOneHintBtn");
    var puzzleOneHint = document.getElementById("js--puzzleOneHint");
    puzzleOneHintBtn.onclick = (event) => {
        puzzleOneHint.setAttribute("visible", true);
    }
  }
}
