#pragma strict

@script RequireComponent (Rigidbody)

class DroneMovementMotor extends MovementMotor {

	/*
	========================================================
	| Private VARIABLES						| Data Type  
	========================================================
	*/
	private var _ambientSpeed : 			float = 6.5;
	private var _huntSpeed : 				float = 10.0;
	private var _snappyness : 				float = 30.0;
	private var _turnSmoothing : 			float = 0.3;

	private var someSpeed : 				float = 3.0;

	private var _smoothedDirection : 		Vector3 = Vector3.zero;


	/*
	========================================================
	| FixedUpdate											|
	========================================================
	*/
	function FixedUpdate ()
	{
		var dir : Vector3 = movementTarget - this.transform.position;
		movementDirection = dir;
		
		var targetVelocity : Vector3 = movementDirection.normalized * _ambientSpeed;

		var deltaVelocity : Vector3 = targetVelocity - rigidbody.velocity;

		if(rigidbody.useGravity)
		{
			deltaVelocity.y = 0;
		}

		force = deltaVelocity * _snappyness;

		rigidbody.AddForce(force, ForceMode.Acceleration);

		//Setup player to face facingDirection, or if that is zero, then the movementDireciton
		
		var faceDir : Vector3 = movementDirection;

		//Make the character rotate towards the target rotation

		if(faceDir == Vector3.zero)
		{
			rigidbody.angularVelocity = Vector3.zero;
		}
		else {
			var rotationAngle : float = AngleAroundAxis (transform.forward, faceDir, Vector3.up);
			rigidbody.angularVelocity = (Vector3.up * rotationAngle * _turnSmoothing);
		}
	}

	/*
	========================================================
	| AngleAroundAxis										| 
	========================================================
	The angle between dirA and dirB around axis */

	static function AngleAroundAxis (dirA : Vector3, dirB : Vector3, axis : Vector3) {
	    // Project A and B onto the plane orthogonal target axis
	    dirA = dirA - Vector3.Project (dirA, axis);
	    dirB = dirB - Vector3.Project (dirB, axis);
	   
	    // Find (positive) angle between A and B
	    var angle : float = Vector3.Angle (dirA, dirB);
	   
	    // Return angle multiplied with 1 or -1
	    return angle * (Vector3.Dot (axis, Vector3.Cross (dirA, dirB)) < 0 ? -1 : 1);
	}
}