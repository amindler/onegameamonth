#pragma strict

public var totalPowerSupply:float = 15;
public var currentPower:float = 15;

function Start () {

}

function FixedUpdate () {
	updatePower();
}

public function updatePower(){
	var objectsInRange : Collider[] = Physics.OverlapSphere(this.transform.position, 5);
	for (var col:Collider in objectsInRange){
		var pwr:Powerable = col.GetComponent(Powerable);
		if(pwr != null){
			if(pwr.powered == false){
				var objPowerNeed:float = pwr.powerNeeds;
				if(currentPower >= objPowerNeed){
					pwr.powerNeeds = objPowerNeed;
					currentPower -= objPowerNeed;
				}
			}
		}
	}
}