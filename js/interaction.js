window.onload = () => {
  const cursor = document.getElementById("js--cursor");
  const interactables = document.getElementsByClassName("js--interactable");
  var clicked = false;
  var ticker;

  for(let i = 0; i < interactables.length; i++){
    interactables[i].addEventListener("click", function(event){
      console.log("ik kom hier in");
      var interactable = event.target;
      clicked = !clicked;
      if(clicked) {
        ticker = setInterval(update, 50, event.target);
      } else {
        clearInterval(ticker);
      }
    });
  }

  function update(target){
    var cursorPosition = cursor.object3D.getWorldPosition();
    target.setAttribute("position", cursorPosition);
    console.log("update called");
  }
}
