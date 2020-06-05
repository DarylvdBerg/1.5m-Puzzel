window.onload = () => {
  const cursor = document.getElementById("js--cursor");
  const interactables = document.getElementsByClassName("js--interactable");
  var clicked = false;
  var ticker;

  for(let i = 0; i < interactables.length; i++){
    interactables[i].addEventListener("click", function(event){
      var interactable = event.target;
      clicked = !clicked;
      if(clicked){
        update(interactable);
      }
    });
  }

  function update(target){
    console.log("ik kom hier");
    var cursorPos = cursor.object3D.getWorldPosition();
    console.log(cursorPos);
    target.setAttribute("position", {x: cursorPos.x, y: cursorPos.y, z: cursorPos.z});
  }
}
