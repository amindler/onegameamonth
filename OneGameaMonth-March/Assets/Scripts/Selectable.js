#pragma strict

public var selectedIconOBJ:GameObject;
public var selectionState:boolean = false;
public var msg:SignalSender;

private var tempSelectOBJ:GameObject;

function Awake(){
	SelectedState();
}

function Update(){
	if(tempSelectOBJ != null){
		tempSelectOBJ.transform.position = this.transform.position;
	}
}

private function SelectedState(){
	if(selectionState){
		var go : GameObject = Spawner.Spawn(selectedIconOBJ,this.transform.position, Quaternion.identity) as GameObject;
		tempSelectOBJ = go;
		msg.SendSignals(this);
	} else {
		if(tempSelectOBJ != null){
			Spawner.Destroy(tempSelectOBJ);
		}
	}
}

public function set selectState(value:boolean){
	selectionState = value;
	SelectedState();
}

public function get selectState():boolean{
	return selectionState;
}

public function selectMe(){
	selectionState = true;
	SelectedState();
}

public function Deselection(){
	selectionState = false;
	SelectedState();
}