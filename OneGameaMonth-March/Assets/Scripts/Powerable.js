#pragma strict

public var powerRequired:float = 5;

public var currentPowerReceived:float = 0;

public var isPowered:boolean = false;

public var PoweredOBJ:GameObject;
public var unPoweredOBJ:GameObject;

function Awake () {
	powerIcons();
}

private function checkPower(){
	if(currentPowerReceived >= powerRequired){
		isPowered = true;
	}
	
	powerIcons();
}

private function powerIcons(){
	if(isPowered){
		PoweredOBJ.SetActive(true);
		unPoweredOBJ.SetActive(false);
	} else {
		PoweredOBJ.SetActive(false);
		unPoweredOBJ.SetActive(true);
	}
}

public function get powerNeeds():float{
	return powerRequired;
}

public function set powerNeeds(value:float){
	currentPowerReceived = value;
	checkPower();
}

public function get powered():boolean{
	return isPowered;
}