#pragma strict
/*
========================================================
| Public VARIABLES						| Data Type  
========================================================
*/
public var bulletPrefab : 				GameObject;
public var spawnPoint : 				Transform;
public var frequency : 					float = 2;
public var coneAngle : 					float = 1.5;
public var bulletDamage :				float = 2;
public var firing : 					boolean = false;

public var physicalAttackPoint:			Transform;
public var physicalAttackPrefab :		GameObject;
public var physicalFrequency :			float = 3;
public var physicalDamage :				float = 1;
public var attacking : 					boolean = false;

public var forcePerSecond : 			float = 20.0;
public var hitSoundVolume : 			float = 0.5;
public var muzzleFlash : 				ParticleSystem;
public var muzzleLight : 				GameObject;

//public var gunAudio : 					AudioClip;

/*
========================================================
| Private VARIABLES						| Data Type  
========================================================
*/
private var lastFireTime : 				float = -1;
private var lastPhysicalTime :			float = -1;

private var playerGM:					PlayerManager;

function Awake() {
	var go: GameObject = GameObject.FindGameObjectWithTag("PlayerManager");
	playerGM = go.GetComponent("PlayerManager");
}

function Start () {
	if(spawnPoint == null){
		var go:GameObject = GameObject.FindGameObjectWithTag("BulletSpawnPoint");
		spawnPoint = go.transform;
	}
}

function Update () {
	mouseControl();
	
	if(firing){
		fireHandler();
	}
	
	if(attacking){
		physicalHandler();
	}
}

private function mouseControl(){
	if(Input.GetMouseButton(0)){
		OnStartFire();
	} else {
		OnStopFire();
	}
	
	if(Input.GetKey(KeyCode.Space)){
		OnStartPhysical();
	} else {
		OnStopPhysical();
	}
}

private function OnStartFire(){
	firing = true;
	/*
	muzzleFlash.Play();
	muzzleLight.SetActive(true);
	
	if(gunAudio)
		gunAudio.Play();
	*/
}

private function OnStopFire(){
	firing = false;
	/*
	muzzleFlash.Stop();
	muzzleLight.SetActiveRecursively(false);
	
	if (gunAudio)
		gunAudio.Stop ();
	*/
}

private function fireHandler(){
	if(Time.time > lastFireTime + 1 / frequency && playerGM.Ammo > 0){
		//spawn visual bullet
		var t_coneRandomRotation = Quaternion.Euler(Random.Range(-coneAngle, coneAngle), Random.Range(-coneAngle, coneAngle),0);
		var t_go:GameObject = Spawner.Spawn(bulletPrefab, spawnPoint.position, spawnPoint.rotation * t_coneRandomRotation) as GameObject;
		var t_bullet : SimpleBullet = t_go.GetComponent.<SimpleBullet> ();
		
		t_bullet.setDMG(playerGM.gunDMG);
		playerGM.updateAmmo(-1);
		lastFireTime = Time.time;
		
		//updateReadout();
	}
}

private function OnStartPhysical(){
	attacking = true;
}

private function OnStopPhysical(){
	physicalAttackPrefab.SetActive(false);
	attacking = false;
}

private function physicalHandler(){
	if(Time.time > lastPhysicalTime + 1 / physicalFrequency){
		physicalAttackPrefab.SetActive(true);
		var objectsInRange : Collider[] = Physics.OverlapSphere(physicalAttackPoint.position, 1);
		for (var col : Collider in objectsInRange){
			
			var dmgObj : EHealth = col.GetComponent("EHealth");
			if( dmgObj != null){
				// linear falloff of effect
				//var proximity : float = (physicalAttackPoint.position - dmgObj.transform.position).magnitude;
				//var effect : float = 1 - (proximity / 2);
				var effect : float = 1;
				var dmg : float = playerGM.swordDMG;
				var dmgApply : int = Mathf.Round(dmg * effect);
				
				if(dmgApply < 0){ dmgApply = 0; }
					dmgObj.HealthUpdate(dmgApply);
			}
		}
		lastPhysicalTime = Time.time;
	} else {
		attacking = false;
		physicalAttackPrefab.SetActive(false);
	}
}