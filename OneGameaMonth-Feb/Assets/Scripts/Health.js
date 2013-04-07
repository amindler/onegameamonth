#pragma strict

public var currHP:int = 2;
public var maxHP:int = 2;

public var deathSignal:SignalSender;
public var shieldOBJ:ParticleSystem;

private var deathCounter: int = 0;
private var deathCounterMax: int = 2;

private var spawnItem: boolean = false;
private var stateMan:StateManager;
private var readOutHP:UILabel;

private var hpLVL:int = 1;

function Awake(){
	if(this.transform.tag == "Player"){
		var go : GameObject = GameObject.FindGameObjectWithTag("GameManager");
		stateMan = go.GetComponent("StateManager");
		
		var go1 : GameObject = GameObject.FindGameObjectWithTag("HPReadout");
		readOutHP = go1.GetComponent("UILabel");
	}
	resetHP();
}

function Update(){
	if(currHP <= 0 && this.transform.tag != "Player"){
		if(deathCounter <= 0){
			resetHP();
			Spawner.Destroy (gameObject);
		} else {
			if(!spawnItem){
				deathSignal.SendSignals(this);
				spawnItem = true;
			}	
			deathCounter --;
		}
	}
}

public function updateHP(p_DMG:float){
	currHP += p_DMG;
	if(currHP > maxHP){
		currHP = maxHP;
	}
	if(this.transform.tag == "Player"){
		updateReadout();
		shieldOBJ.Play();
		if(currHP <= 0){
			stateMan.destroyed();
			Spawner.Destroy(gameObject);
		}
	}
}

public function resetHP(){
	HPLVL();
	currHP = maxHP;
	deathCounter = deathCounterMax;
	spawnItem = false;
	if(this.transform.tag == "Player")
		updateReadout();
}
/*
public function setHP(p_max:int , p_curr:int){
	maxHP = p_max;
	currHP = p_curr;
}
*/
public function getHP():float{
	return currHP;
}

private function updateReadout(){
	if(this.transform.tag == "Player")
		readOutHP.text = currHP.ToString() + "/" + maxHP.ToString();
}

private function HPLVL(){
	switch(hpLVL){
		case 1:
			maxHP = 5;
		break;
		case 2:
			maxHP = 8;
		break;
		case 3:
			maxHP = 12;
		break;
		case 4:
			maxHP = 15;
		break;
		case 5:
			maxHP = 16;
		break;
		case 6:
			maxHP = 17;
		break;
		case 7:
			maxHP = 18;
		break;
		case 8:
			maxHP = 19;
		break;
		case 9:
			maxHP = 20;
		break;
		case 10:
			maxHP = 25;
		break;
	}
	currHP = maxHP;
	updateReadout();
}

public function setHPLVL(p_hp){
	if(this.transform.tag == "Player"){
		hpLVL = p_hp;
		HPLVL();
	}
}