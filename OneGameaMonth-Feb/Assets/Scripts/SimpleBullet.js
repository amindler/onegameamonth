#pragma strict

var speed : float = 10;
var lifeTime : float = 0.5;
var dist : float = 10000;

public var DMG:float = 1;

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
	var go : Health = p_col.gameObject.GetComponent("Health");
	if(go != null){
		go.updateHP(-DMG);
		Debug.Log("THERE IS A HEALTH SCRIPT ON THIS OBJECT!!");
	} else {
		Debug.Log("NO HEALTH SCRIPT!");
	}
		
	Spawner.Destroy (gameObject);
}

public function setDMG(p_DMG:float){
	DMG = p_DMG;
}