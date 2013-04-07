#pragma strict

public var speed : float = 5.0;
public var sigSend:SignalSender;
private var backOBJ: Transform;
private var tr:Transform;


function Awake () {
	if(backOBJ == null){
		var go:GameObject = GameObject.FindGameObjectWithTag("BackWall");
		backOBJ = go.transform;
	}
	tr = transform;
}

function Update () {
	if(this.transform.position.z < backOBJ.position.z){
		sigSend.SendSignals(this);
		this.rigidbody.velocity = Vector3(0,0,0);
		Spawner.Destroy(gameObject);
	}
	this.rigidbody.AddForce(0,0,-1 * speed);
	this.transform.position.y = 1.5;
	//tr.position += Vector3(0,0,-1) * speed * Time.deltaTime;
}