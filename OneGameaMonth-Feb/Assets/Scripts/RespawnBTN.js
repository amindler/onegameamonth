#pragma strict
private var stateMan : StateManager;

function Awake(){
	var go:GameObject = GameObject.FindGameObjectWithTag("GameManager");
	stateMan = go.GetComponent("StateManager");
}

function OnClick(){
	stateMan.respawn();
}