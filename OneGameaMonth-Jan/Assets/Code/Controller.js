#pragma strict

public var speed:float;

function Start () {

}

function Update () {
	speed = Input.GetAxisRaw("Horizontal") * 20;
	//speed *= 15;
	//this.transform.Translate(Vector3(0,speed,0));
	this.rigidbody.AddForce(Vector3(0,0,speed));
}