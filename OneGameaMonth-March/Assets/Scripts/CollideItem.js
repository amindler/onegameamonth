#pragma strict
public var AMMO:int = 0;
public var HP:int = 0;
public var MONEY:int = 0;

private var timeoutCurr:float = 0;
private var timeoutMax:float = 30;

private var PM:PlayerManager;

function Awake(){
	setVars();
}

function Update(){
	if(this.transform.position.y < -5){
		timeoutCurr = 0;
		Spawner.Destroy(gameObject);
	}
	
	if(timeoutCurr >= timeoutMax){
		timeoutCurr = 0;
		Spawner.Destroy(gameObject);
	} else {
		timeoutCurr += Time.deltaTime;
	}
}

function OnTriggerEnter(p_col:Collider){
	if(p_col.transform.tag == "PlayerCollect"){
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