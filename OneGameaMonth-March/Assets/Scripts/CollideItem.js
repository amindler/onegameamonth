#pragma strict
public var AMMO:int = 0;
public var HP:int = 0;
public var MONEY:int = 0;

private var PM:PlayerManager;

function Awake(){
	setVars();
}

function Update(){
	if(this.transform.position.y < -5){
		Spawner.Destroy(gameObject);
	}
}

function OnCollisionEnter(p_col:Collision){
	if(p_col.transform.tag == "Player"){
		if(PM == null){
			setVars();
		}
		PM.addMoney(MONEY);
		PM.modifyHP(HP);
		PM.updateAmmo(AMMO);
		Spawner.Destroy(gameObject);
	}
}

function setVars(){
	var go: GameObject = GameObject.FindGameObjectWithTag("PlayerManager");
	PM = go.GetComponent("PlayerManager");
}