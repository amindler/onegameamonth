#pragma strict

public var enemyToSpawn:GameObject;

function Awake () {
	spawnEnemy();
}

private function spawnEnemy () {
	Spawner.Spawn(enemyToSpawn, this.transform.position, this.transform.rotation);
	Destroy(gameObject);
}

/*
function OnDrawGizmos () {
    Gizmos.DrawIcon(this.transform.position, "FrownFaceIcon.tga");
   	//Gizmos.DrawCube(this.transform.position, Vector3(1,1,1));
}
*/