#pragma strict
public var AMMO:int = 0;
public var HP:int = 0;
public var SCRAP:int = 0;

private var player:GameObject;
private var autoFire:AutoFire;
private var health:Health;
private var stateMan:StateManager;

function Awake(){
	setVars();
}

function OnCollisionEnter(p_col:Collision){
	if(p_col.transform.tag == "Player"){
		if(player == null){
			setVars();
		}
		health.updateHP(HP);
		autoFire.addAmmo(AMMO);
		stateMan.addScrap(SCRAP);
		Spawner.Destroy (gameObject);
	}
}

function setVars(){
	player = GameObject.FindGameObjectWithTag("Player");
	autoFire = player.GetComponent("AutoFire");
	health = player.GetComponent("Health");
	var go:GameObject = GameObject.FindGameObjectWithTag("GameManager");
	stateMan = go.GetComponent("StateManager");
}