#pragma strict
/*
========================================================
| Public VARIABLES						| Data Type  
========================================================
*/
public static var INTROMENU:			String = "INTROMENU";
public static var SHOOTER:				String = "SHOOTER";
public static var GAMEPLAY:				String = "GAMEPLAY";
public static var DEAD:					String = "DEAD";
public static var PAUSE:				String = "PAUSE";
public static var BASE:					String = "BASE";

public var camGame:						Camera;
public var camMenu:						Camera;

public var menuLight:					Light;
public var gameLight:					Light;

public var currentState:				String = "";
public var previousState:				String = "";
public var pauseHoldState:				String = "";

public var labelSCRAP:					UILabel;

public var menuPanel:					GameObject;

public var shieldOBJ:					ParticleSystem;

public var ship1:						GameObject;
public var spawnPoint:					Transform;


/*
========================================================
| Private VARIABLES						| Data Type  
========================================================
*/
private var objectsCollected:			int = 0;

private var hpLVL:						int = 1;
private var dmgLVL:						int = 1;
private var ammoLVL:					int = 1;

private var playerOBJ:					GameObject;

public var scrapCount:					int = 0;

/*
========================================================
|						AWAKE							| 
========================================================
*/
function Awake () {
	respawn();
	
	var go:GameObject = GameObject.FindGameObjectWithTag("Player");
	playerOBJ = go;
	var af:AutoFire = go.GetComponent("AutoFire");
	af.setDMGLVL(dmgLVL);
	af.setAMMOLVL(ammoLVL);
}
/*
========================================================
|						UPDATE							| 
========================================================
*/
function Update () {
	updateLabels();
	manageState();
}

private function updateLabels(){
	labelSCRAP.text = scrapCount.ToString();
}

public function addScrap(p_scrap:int){
	scrapCount += p_scrap;
}

public function getScrap():int{
	return scrapCount;
}

public function destroyed(){
	//currentState = DEAD;
	currentState = BASE;
}

public function respawn(){
	if(GameObject.FindGameObjectWithTag("Player") == null){
		Instantiate(ship1, spawnPoint.position, Quaternion.identity);
		var t_ship:GameObject = GameObject.FindGameObjectWithTag("Player");
		var af:AutoFire = t_ship.GetComponent("AutoFire");
		var hp:Health = t_ship.GetComponent("Health");
		af.setDMGLVL(dmgLVL);
		af.setAMMOLVL(ammoLVL);
		hp.setHPLVL(hpLVL);
		
	}
	currentState = GAMEPLAY;
}

private function manageState(){
	switch(currentState){
		case INTROMENU:
		break;
		case GAMEPLAY:
			gameState();
		break;
		case DEAD:
			deadState();
		break;
		case BASE:
			baseState();
		break;
	}
}

private function gameState(){
	menuPanel.SetActive(false);
	menuLight.enabled = false;
	camMenu.enabled = false;
	camGame.enabled = true;
}

private function deadState(){
	menuPanel.SetActive(true);
}

private function baseState(){
	menuLight.enabled = true;
	camMenu.enabled = true;
	camGame.enabled = false;
}

public function updateScrap(p_scrap:int){
	scrapCount = p_scrap;
}

public function updateAMMO(p_ammo:int){
	ammoLVL = p_ammo;
}

public function updateHP(p_hp:int){
	hpLVL = p_hp;
}

public function updateDMG(p_dmg:int){
	dmgLVL = p_dmg;
}