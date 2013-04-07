#pragma strict
/*
========================================================
| Public VARIABLES						| Data Type  
========================================================
*/
public var snappiness :					float = 50;
public var speed :						float = 5;

public var RightSideJets :				ParticleSystem;
public var LeftSideJets :				ParticleSystem;

/*
========================================================
| Private VARIABLES						| Data Type  
========================================================
*/
private var movementDirection : 		Vector3;

private var rightKeyDown :				boolean = false;
private var leftKeyDown :				boolean = false;

/*
========================================================
|						AWAKE							| 
========================================================
*/
function Awake () 
{
	init();
}

private function init()
{
	
}

/*
========================================================
|						UPDATE							| 
========================================================
*/
function FixedUpdate () 
{
	moveHandler();
}

private function moveHandler()
{
	var t_forward : Vector3;
	t_forward = Vector3.forward;
	
	var t_horiz : Vector3;
	t_horiz = Vector3(t_forward.z, 0, -t_forward.x);
	
	movementDirection = Input.GetAxis("Horizontal") * t_horiz + Input.GetAxis("Vertical") * t_forward;
	
	if(Input.GetKey("right") || Input.GetKey("d")){
		rightKeyDown = true;
	} else {
		rightKeyDown = false;
	}
	
	if(Input.GetKey("left") || Input.GetKey("a")){
		leftKeyDown = true;
	} else {
		leftKeyDown = false;
	}

	checkJets();
	
	var target = Quaternion.Euler (0, 0, Input.GetAxis("Horizontal") * -15);
	this.transform.rotation = Quaternion.Slerp(this.transform.rotation, target, Time.deltaTime * 6);
	
	if(movementDirection.sqrMagnitude > 1)
		movementDirection.Normalize();

	var targetVelocity : Vector3 = Vector3(movementDirection.x * speed, movementDirection.y, movementDirection.z * speed);
	var deltaVelocity : Vector3 = targetVelocity - rigidbody.velocity;
	
	var force : Vector3 = deltaVelocity * snappiness;
	
	rigidbody.AddForce(force, ForceMode.Acceleration);
	this.transform.position.y = 1.5;
}

private function checkJets():void{
	if(rightKeyDown){
		LeftSideJets.Play();
	} else {
		LeftSideJets.Stop();
	}
	
	if(leftKeyDown){
		RightSideJets.Play();
	} else {
		RightSideJets.Stop();
	}
}
