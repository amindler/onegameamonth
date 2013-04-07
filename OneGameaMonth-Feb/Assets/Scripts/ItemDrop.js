#pragma strict
public var itemDrop1:GameObject;
public var itemDrop2:GameObject;

public var scrapItem:GameObject;

public var scrapCount:int;


public function dropItem(){
	var num : float = Random.Range(1,11);
	if(num > 8){
		var go : GameObject = Spawner.Spawn (itemDrop1, this.transform.position, Quaternion.Euler(0,0,0)) as GameObject;
	} else if (num > 6){
		var go1 : GameObject = Spawner.Spawn (itemDrop2, this.transform.position, Quaternion.Euler(0,0,0)) as GameObject;
	} else {
		for(var i : int = 0; i < scrapCount; i++){
			var pos:Vector3 = Vector3(this.transform.position.x + i, 1.5, this.transform.position.z + i);
			var scrapGO : GameObject = Spawner.Spawn (scrapItem, pos, Quaternion.Euler(0,0,0)) as GameObject;
		}
	}
}