#pragma strict

private var maxHP:int = 5;
public var currHP:int = 5;

public var itemSpawner : ItemDrop;

private var dropItems : boolean = false;

private var currCount : int = 0;
private var maxCount : int = 5;

function Update () {
	if(currHP <= 0){
		itemSpawner.dropItem();
		dropItems = true;
	}
	
	if(dropItems && currCount >= maxCount){
		dropItems = false;
		currCount = 0;
		Spawner.Destroy(gameObject);
		Destroy(gameObject);
	} else if(dropItems) {
		currCount ++;
	}
}

function HealthUpdate(p_num:int){
	currHP -= p_num;
}