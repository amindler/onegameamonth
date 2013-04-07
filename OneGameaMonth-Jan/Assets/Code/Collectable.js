#pragma strict
public var PRICE:float = 1;
private var speed:float = 0;
public var NAME:String = "GEM";

function Start () {
	speed = (PRICE * -8);
	if(speed > -1){
		speed = -5;
	}
	//this.rigidbody.AddForce(Vector3(0,-100,0));
}

function Awake() {
	//this.rigidbody.AddForce(Vector3(0,-200,0));
}

function Update() {
	this.rigidbody.AddForce(Vector3(0,speed,0));
}