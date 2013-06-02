#pragma strict

function Start() {
     Screen.lockCursor = true;
}
 
function Update() {
     if (Input.GetKeyDown("tab"))
          Screen.lockCursor = !Screen.lockCursor;
}