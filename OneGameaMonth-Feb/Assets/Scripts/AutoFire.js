#pragma strict
/*
========================================================
| Public VARIABLES						| Data Type  
========================================================
*/
public var bulletPrefab : 				GameObject;
public var spawnPoint : 				Transform;
public var frequency : 					float = 10;
public var coneAngle : 					float = 1.5;
public var bulletDamage :				float = 1;
public var firing : 					boolean = false;
public var forcePerSecond : 			float = 20.0;
public var hitSoundVolume : 			float = 0.5;
public var muzzleFlash : 				ParticleSystem;
public var muzzleLight : 				GameObject;

public var currAmmo:					int = 200;
public var maxAmmo:						int = 200;



/*
========================================================
| Private VARIABLES						| Data Type  
========================================================
*/
private var dmgLVL:						int = 1;
private var maxAmmoLVL:					int = 1;

private var forceBonus : 				float = 0.1;
private var lastFireTime : 				float = -1;

private var readOutAMMO :				UILabel;

/*
========================================================
|						AWAKE							| 
========================================================
*/
function Awake () {
	if (spawnPoint == null)
		spawnPoint = transform;
	
	var go : GameObject = GameObject.FindGameObjectWithTag("AmmoReadout");
	readOutAMMO = go.GetComponent("UILabel");
	updateReadout();
}

/*
========================================================
|						UPDATE							| 
========================================================
*/
function Update () {
	if(Input.GetKey("space")){
		OnStartFire();
	}else{
		OnStopFire();
	}

	if (firing) {
		fireHandler();
	}
}

private function OnStartFire () {
	firing = true;
	muzzleFlash.Play();
	muzzleLight.SetActive(true);
	
	if (audio)
		audio.Play ();
}

private function OnStopFire () {
	firing = false;
	muzzleFlash.Stop();
	muzzleLight.SetActiveRecursively(false);
	
	if (audio)
		audio.Stop ();
}

private function fireHandler(){
	if (Time.time > lastFireTime + 1 / frequency && currAmmo > 0) {
		// Spawn visual bullet
		var coneRandomRotation = Quaternion.Euler (Random.Range (-coneAngle, coneAngle), Random.Range (-coneAngle, coneAngle), 0);
		var go : GameObject = Spawner.Spawn (bulletPrefab, spawnPoint.position, spawnPoint.rotation * coneRandomRotation) as GameObject;
		var bullet : SimpleBullet = go.GetComponent.<SimpleBullet> ();
		bullet.setDMG(bulletDamage);
		currAmmo --;
		lastFireTime = Time.time;
		updateReadout();
	}
}

public function setAmmo(p_cur:int, p_max:int){
	currAmmo = p_cur;
	maxAmmo = p_max;
}

public function getAmmo():int{
	return currAmmo;
}

public function addAmmo(p_ammo:int){
	currAmmo += p_ammo;
	if(currAmmo > maxAmmo){
		currAmmo = maxAmmo;
	}
	updateReadout();
}

private function updateReadout(){
		readOutAMMO.text = currAmmo.ToString() + "/" + maxAmmo.ToString();
}

private function DMGLVL(){
	bulletDamage = dmgLVL;
}

private function ammoLVL(){
	switch(maxAmmoLVL){
		case 1:
			maxAmmo = 100;
		break;
		case 2:
			maxAmmo = 150;
		break;
		case 3:
			maxAmmo = 200;
		break;
		case 4:
			maxAmmo = 300;
		break;
		case 5:
			maxAmmo = 325;
		break;
		case 6:
			maxAmmo = 350;
		break;
		case 7:
			maxAmmo = 375;
		break;
		case 8:
			maxAmmo = 400;
		break;
		case 9:
			maxAmmo = 425;
		break;
		case 10:
			maxAmmo = 450;
		break;
	}
	currAmmo = maxAmmo;
}

public function setDMGLVL(p_dmg){
	dmgLVL = p_dmg;
	DMGLVL();
	updateReadout();
}

public function setAMMOLVL(p_ammo){
	maxAmmoLVL = p_ammo;
	ammoLVL();
	updateReadout();
}