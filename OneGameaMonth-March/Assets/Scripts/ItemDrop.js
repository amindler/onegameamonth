#pragma strict
public var itemDrop1:GameObject;
public var itemDrop2:GameObject;
public var moneyDrop:GameObject;

private var droppedItems : boolean = false;

public function dropItem(){
	if(droppedItems == false){
		droppedItems = true;
		var num : float = Random.Range(1,11);
		
		if (num > 6){
			spawnObjects(itemDrop2, 5);
		} else {
			spawnObjects(itemDrop1, 3);
			spawnObjects(moneyDrop, 30);
		}
	}
}

private function spawnObjects(p_item:GameObject, p_amnt:float){
	var rand:float = Mathf.Round(Random.Range(1,p_amnt));
	
	for(var i : int = 0; i < rand; i++){
		var pos:Vector3 = Vector3(this.transform.position.x + Random.Range(-2,2), Random.Range(.5,3.5), this.transform.position.z + Random.Range(-2,2));
		Spawner.Spawn (p_item, pos, Quaternion.Euler(0,0,0));
	}
}