#pragma strict
//public var text:String;

/*
function OnGUI(){
	if(GUI.Button(Rect(200,500,150,50), text)){
		Destroy(GameObject.FindGameObjectWithTag("TIMER"));
		Application.LoadLevel("DropGame");
	}
}
*/

function OnClick(){
	LoadGame();
}

function Update(){
	if(Input.GetKeyDown(KeyCode.Return)){
		LoadGame();
	}
}

function LoadGame(){
	Destroy(GameObject.FindGameObjectWithTag("TIMER"));
	Application.LoadLevel("DropGame");
}