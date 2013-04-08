#pragma strict
public var info:String;

private var infoUI:UILabel;

function Awake(){
	var go : GameObject = GameObject.FindGameObjectWithTag("info");
	infoUI = go.GetComponent("UILabel");
}

function OnTriggerStay(p_col:Collider){
	if(p_col.transform.tag == "Player"){
		infoUI.text = info;
	}
}