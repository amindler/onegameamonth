#pragma strict
/*
========================================================
| Public VARIABLES						| Data Type  
========================================================
*/
public var attackDamageMin:				float = 2;
public var attackDamageMax:				float = 5;

public var physicalAttackPoint:			Transform;
public var physicalFrequency :			float = 7;
public var physicalDamage :				float = 1;
public var attacking : 					boolean = false;

/*
========================================================
| Private VARIABLES						| Data Type  
========================================================
*/
private var PM :						PlayerManager;
private var lastPhysicalTime :			float = -1;

function Awake() {
	var go : GameObject = GameObject.FindGameObjectWithTag("PlayerManager");
	PM = go.GetComponent("PlayerManager");
}

function Update () {
	physicalHandler();
}

private function physicalHandler(){
	if(Time.time > lastPhysicalTime + 1 / physicalFrequency){
	
		var objectsInRange : Collider[] = Physics.OverlapSphere(physicalAttackPoint.position, 1);
		for (var col : Collider in objectsInRange){
			if(col.transform.tag == "Player"){
				var dmg : float = Random.Range(attackDamageMin,attackDamageMax);
				PM.damageHP(dmg);
			}
		}
		lastPhysicalTime = Time.time;
	}
}