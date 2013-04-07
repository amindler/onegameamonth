#pragma strict

private var speed : float = 8;
public var dropGO0:GameObject;
public var dropGO1:GameObject;
public var dropGO2:GameObject;
public var dropGO3:GameObject;
public var dropGO4:GameObject;

public var dropTimer:float = 0;
public var currDropTime:float = 0;

public var rightBoundsOBJ:Transform;
public var leftBoundsOBJ:Transform;

public var CountOBJ:Collector;
private var count:float;

private var tier:int = 1;


function Start () {
	currDropTime = Random.Range(0,3);
}

function Update () {
	count = CountOBJ.COLLECTED;
	if(count >= 18){
		tier = 4;
		speed = 16;
	} else if (count >= 15){
		tier = 3;
		speed = 14;
	} else if (count >= 10){
		tier = 2;
		speed = 10;
	}
	
	this.transform.position.x = 0;
	this.transform.Translate(Vector3.forward * speed * Time.deltaTime);
	
	if(this.transform.position.z < leftBoundsOBJ.position.z){
		this.transform.position.z = leftBoundsOBJ.position.z + 1;
		this.transform.rotation.y = 0;
	}
	
	if(this.transform.position.z > rightBoundsOBJ.position.z){
		this.transform.position.z = rightBoundsOBJ.position.z - 1;
		this.transform.rotation.y = 180;
	}
	
	dropTimerFunc();
}

function OnCollisionEnter( col : Collision) {
	reverseDirection();
}

private function reverseDirection():void{
	if(this.transform.rotation.y > .5){
		this.transform.rotation.y = 0;
	} else {
		this.transform.rotation.y = 180;
	}
}

private function dropTimerFunc():void{
	dropTimer += Time.deltaTime;
	if(dropTimer >= currDropTime){
		dropTimer = 0;
		switch(tier){
			case 1:
				currDropTime = Random.Range(0,4);
			break;
			case 2:
				currDropTime = Random.Range(0,3);
			break;
			case 3:
				currDropTime = Random.Range(0,1.5);
			break;
			case 4:
				currDropTime = Random.Range(0,1.1);
			break;
		}
		
		dropItem();
	}
}

private function dropItem():void{
	var pos:Vector3 = this.transform.position;
	pos.y -= 1;
	var rangeItem:float = 0;
	if(tier == 1){
		rangeItem = 13;
	} else if (tier == 2) {
		rangeItem = 100;
	} else if (tier == 3){
		rangeItem = 100;
	} else if (tier == 4){
		rangeItem = 100;
	}
	
	var item:int = Mathf.Round(Random.Range(0,rangeItem));
	if(tier == 1){
		if(item < 4){
			Instantiate(dropGO0, pos, Quaternion.identity);
		} else if (item < 7){
			Instantiate(dropGO1, pos, Quaternion.identity);
		} else if (item < 9){
			Instantiate(dropGO2, pos, Quaternion.identity);
		} else if (item < 11){
			Instantiate(dropGO4, pos, Quaternion.identity);
		} else {
			Instantiate(dropGO3, pos, Quaternion.identity);
		}
	} else if (tier == 2){
		if(item < 25){
			Instantiate(dropGO4, pos, Quaternion.identity);
		} else if (item < 75){
			Instantiate(dropGO0, pos, Quaternion.identity);
		} else if (item < 90){
			Instantiate(dropGO1, pos, Quaternion.identity);
		} else if (item < 95){
			Instantiate(dropGO2, pos, Quaternion.identity);
		} else {
			Instantiate(dropGO3, pos, Quaternion.identity);
		}
	} else if (tier == 3){
		if(item < 50){
			Instantiate(dropGO4, pos, Quaternion.identity);
		} else if (item < 75){
			Instantiate(dropGO0, pos, Quaternion.identity);
		} else if (item < 90){
			Instantiate(dropGO1, pos, Quaternion.identity);
		} else if (item < 95){
			Instantiate(dropGO2, pos, Quaternion.identity);
		} else {
			Instantiate(dropGO3, pos, Quaternion.identity);
		}
	} else if (tier == 4){
		if(item < 50){
			Instantiate(dropGO4, pos, Quaternion.identity);
		} else if (item < 90){
			Instantiate(dropGO0, pos, Quaternion.identity);
		} else if (item < 95){
			Instantiate(dropGO1, pos, Quaternion.identity);
		} else if (item < 98){
			Instantiate(dropGO2, pos, Quaternion.identity);
		} else {
			Instantiate(dropGO3, pos, Quaternion.identity);
		}
	}
	
	
}