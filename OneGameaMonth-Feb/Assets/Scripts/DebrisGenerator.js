#pragma strict
private var currentCount:int = 0;
private var maxCount:int = 10;
public var debrisPrefab : GameObject;
public var genBoundLeftOBJ:GameObject;
public var genBoundRightOBJ:GameObject;

private var genNum1:float;
private var genNum2:float;

function Awake () {
	genNum1 = genBoundLeftOBJ.transform.position.x; 
	genNum2 = genBoundRightOBJ.transform.position.x; 
}

function Update () {
	if(currentCount > maxCount){
		currentCount = 0;
		var rand:float = Random.Range(genNum1,genNum2);
		var rand1:float = Random.Range(1,7);
		var pos:Vector3 = Vector3(rand,1.5, genBoundLeftOBJ.transform.position.z);
		var go : GameObject = Spawner.Spawn (debrisPrefab, pos, Quaternion.Euler(0,0,0)) as GameObject;
		go.transform.localScale = Vector3(rand1,rand1,rand1);
		go.rigidbody.AddForce(Vector3(0,0,Random.Range(-50,-100)));
	} else {
		currentCount ++;
	}
}