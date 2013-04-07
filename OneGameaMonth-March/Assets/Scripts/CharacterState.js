#pragma strict

private var menuOpen:boolean = false;

public var menu:UIPanel;

function Update () {
	if(Input.GetKeyUp(KeyCode.E)){
		menuOpen = !menuOpen;
	}
	menuState();
}

private function menuState(){
	if(menuOpen){
		menu.gameObject.SetActive(true);
		//menu.SetActive(true);
	} else {
		menu.gameObject.SetActive(false);
		//menu.SetActive(false);
	}
}