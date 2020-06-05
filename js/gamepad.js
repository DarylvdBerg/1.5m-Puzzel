window.onload = () => {
  const camera = document.querySelector("a-camera");
  var haveEvents = 'ongamepadconnected' in window;
  var controllers = {};

  function connecthandler(e) {
    addgamepad(e.gamepad);
  }

  function addgamepad(gamepad) {
    controllers[gamepad.index] = gamepad;

    var d = document.createElement("div");
    d.setAttribute("id", "controller" + gamepad.index);

    var t = document.createElement("h1");
    t.appendChild(document.createTextNode("gamepad: " + gamepad.id));
    d.appendChild(t);

    var b = document.createElement("div");
    b.className = "buttons";
    for (var i = 0; i < gamepad.buttons.length; i++) {
      var e = document.createElement("span");
      e.className = "button";
      //e.id = "b" + i;
      e.innerHTML = i;
      b.appendChild(e);
    }

    d.appendChild(b);

    var a = document.createElement("div");
    a.className = "axes";

    for (var i = 0; i < gamepad.axes.length; i++) {
      var p = document.createElement("progress");
      p.className = "axis";
      //p.id = "a" + i;
      p.setAttribute("max", "2");
      p.setAttribute("value", "1");
      p.innerHTML = i;
      a.appendChild(p);
    }

    d.appendChild(a);

    document.body.appendChild(d);
    requestAnimationFrame(updateStatus);
  }

  function disconnecthandler(e) {
    removegamepad(e.gamepad);
  }

  function removegamepad(gamepad) {
    var d = document.getElementById("controller" + gamepad.index);
    document.body.removeChild(d);
    delete controllers[gamepad.index];
  }

  function updateStatus() {
    if (controllers !== {}) {
      if (!haveEvents) {
        scangamepads();
      }

      var i = 0;
      var j;

      for (j in controllers) {
        var controller = controllers[j];
        var d = document.getElementById("controller" + j);
        var buttons = d.getElementsByClassName("button");

        for (i = 0; i < controller.buttons.length; i++) {
          var b = buttons[i];
          var val = controller.buttons[i];
          var pressed = val == 1.0;
          if (typeof(val) == "object") {
            pressed = val.pressed;
            val = val.value;
          }
        }

        var axes = d.getElementsByClassName("axis");
        for (i = 0; i < controller.axes.length; i++) {
          var a = axes[i];
          a.innerHTML = i + ": " + controller.axes[i].toFixed(4);
          a.setAttribute("value", controller.axes[i] + 1);
        }
      }

      changePlayerPosition();
      requestAnimationFrame(updateStatus);
    }
  }

  function scangamepads() {
    var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
    for (var i = 0; i < gamepads.length; i++) {
      if (gamepads[i]) {
        if (gamepads[i].index in controllers) {
          controllers[gamepads[i].index] = gamepads[i];
        } else {
          addgamepad(gamepads[i]);
        }
      }
    }
  }

  window.addEventListener("gamepadconnected", connecthandler);
  window.addEventListener("gamepaddisconnected", disconnecthandler);

  if (!haveEvents) {
    setInterval(scangamepads, 500);
  }

  function changePlayerPosition() {
    let currentPos = camera.getAttribute("position");
    let cameraRotY = camera.getAttribute("rotation").y%360;
    let newPos = {};
    let vel = 0.1;

    let rotPercent = ((cameraRotY / 180) * 100)%100;
    if (cameraRotY >= 180) {
      rotPercent = -100+rotPercent
    } else if (cameraRotY <= -180) {
      rotPercent = 100+rotPercent;
    }
    let rotValue = Math.abs(rotPercent / 1000) * 2;

    // todo
    if (rotValue >= 0.1) {
      rotValue = rotValue / 2;
      if (controllers[0].buttons[12].pressed && rotPercent >= 0) {
        camera.setAttribute("position", (currentPos.x + rotValue) + " 1.8 " + (currentPos.z - (vel - rotValue)));
      }
      // forward button when looking right
      else if (controllers[0].buttons[12].pressed && rotPercent <= 0) {
        camera.setAttribute("position", (currentPos.x + rotValue) + " 1.8 " + (currentPos.z - (vel - rotValue)));
        console.log(vel - rotValue);
      }
      // back button when looking right
      else if (controllers[0].buttons[13].pressed && rotPercent <= 0) {
        camera.setAttribute("position", (currentPos.x - rotValue) + " 1.8 " + (currentPos.z + (vel - rotValue)));
      }
      // back button when looking left
      else if (controllers[0].buttons[13].pressed && rotPercent >= 0) {
        camera.setAttribute("position", (currentPos.x + rotValue) + " 1.8 " + (currentPos.z + (vel - rotValue)));
      }
      // left button when looking right
      else if (controllers[0].buttons[14].pressed && rotPercent <= 0) {
        camera.setAttribute("position", (currentPos.x - (vel - rotValue)) + " 1.8 " + (currentPos.z - rotValue));
      }
      // left button when looking left
      else if (controllers[0].buttons[14].pressed && rotPercent >= 0) {
        camera.setAttribute("position", (currentPos.x - (vel - rotValue)) + " 1.8 " + (currentPos.z + rotValue));
      }
      // right button when looking left
      else if (controllers[0].buttons[15].pressed && rotPercent >= 0) {
        camera.setAttribute("position", (currentPos.x + (vel - rotValue)) + " 1.8 " + (currentPos.z - rotValue));
      }
      // right buttonly when looking right
      else if (controllers[0].buttons[15].pressed && rotPercent <= 0) {
        camera.setAttribute("position", (currentPos.x + (vel - rotValue)) + " 1.8 " + (currentPos.z + rotValue));
      }
    } else {
      // forward button when looking left
      if (controllers[0].buttons[12].pressed && rotPercent >= 0) {
        camera.setAttribute("position", (currentPos.x - rotValue) + " 1.8 " + (currentPos.z - (vel - rotValue)));
      }
      // forward button when looking right
      else if (controllers[0].buttons[12].pressed && rotPercent <= 0) {
        camera.setAttribute("position", (currentPos.x + rotValue) + " 1.8 " + (currentPos.z - (vel - rotValue)));
      }
      // back button when looking right
      else if (controllers[0].buttons[13].pressed && rotPercent <= 0) {
        camera.setAttribute("position", (currentPos.x - rotValue) + " 1.8 " + (currentPos.z + (vel - rotValue)));
      }
      // back button when looking left
      else if (controllers[0].buttons[13].pressed && rotPercent >= 0) {
        camera.setAttribute("position", (currentPos.x + rotValue) + " 1.8 " + (currentPos.z + (vel - rotValue)));
      }
      // left button when looking right
      else if (controllers[0].buttons[14].pressed && rotPercent <= 0) {
        camera.setAttribute("position", (currentPos.x - (vel - rotValue)) + " 1.8 " + (currentPos.z - rotValue));
      }
      // left button when looking left
      else if (controllers[0].buttons[14].pressed && rotPercent >= 0) {
        camera.setAttribute("position", (currentPos.x - (vel - rotValue)) + " 1.8 " + (currentPos.z + rotValue));
      }
      // right button when looking left
      else if (controllers[0].buttons[15].pressed && rotPercent >= 0) {
        camera.setAttribute("position", (currentPos.x + (vel - rotValue)) + " 1.8 " + (currentPos.z - rotValue));
      }
      // right buttonly when looking right
      else if (controllers[0].buttons[15].pressed && rotPercent <= 0) {
        camera.setAttribute("position", (currentPos.x + (vel - rotValue)) + " 1.8 " + (currentPos.z + rotValue));
      }
    }
  }
}
