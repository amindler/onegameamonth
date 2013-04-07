#pragma strict
public var itemDrop1:GameObject;
public var itemDrop2:GameObject;
public var moneyDrop:GameObject;

public function dropItem(){
	var num : float = Random.Range(1,11);
	if(num > 8){
		var go : GameObject = Spawner.Spawn (itemDrop1, this.transform.position, Quaternion.Euler(0,0,0)) as GameObject;
	} else if (num > 6){
		var go1 : GameObject = Spawner.Spawn (itemDrop2, this.transform.position, Quaternion.Euler(0,0,0)) as GameObject;
	} else {
		var randMoney : float = Mathf.Round(Random.Range(1,10));
		for(var i : int = 0; i < randMoney; i++){
			var pos:Vector3 = Vector3(this.transform.position.x + Random.Range(-2,2), Random.Range(.5,3.5), this.transform.position.z + Random.Range(-2,2));
			Spawner.Spawn (moneyDrop, pos, Quaternion.Euler(0,0,0));
		}
	}
}