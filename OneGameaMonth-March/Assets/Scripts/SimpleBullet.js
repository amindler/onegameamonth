#pragma strict

var speed : float = 10;
var lifeTime : float = 0.5;
var dist : float = 10000;

private var DMG:float = 1;

private var spawnTime : float = 0.0;
private var tr : Transform;

function OnEnable () {
	tr = transform;
	spawnTime = Time.time;
}

function Update () {
	tr.position += tr.forward * speed * Time.deltaTime;
	dist -= speed * Time.deltaTime;
	if (Time.time > spawnTime + lifeTime || dist < 0) {
		Spawner.Destroy (gameObject);
	}
}

function OnCollisionEnter(p_col:Collision){

	var go : EHealth = p_col.gameObject.GetComponent("EHealth");
	if(go != null){
		go.HealthUpdate(DMG);
	}
	
	Spawner.Destroy (gameObject);
}

public function setDMG(p_DMG:float){
	DMG = p_DMG;
}