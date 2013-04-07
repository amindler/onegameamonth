#pragma strict

public var motor : MovementMotor;
public var character : Transform;

private var _mainCam : Camera;
private var _mainCamTransform : Transform;
private var _screenMovementSpace : Quaternion;
private var _screenMovementForward : Vector3;
private var _screenMovementRight : Vector3;

function Awake(){
	motor.movementDirection = Vector2.zero;
	motor.facingDirection = Vector2.zero;

	_mainCam = Camera.main;
	_mainCamTransform = _mainCam.transform;

	if(!character)
		character = transform;
}

function Start(){
	_screenMovementSpace = Quaternion.Euler(0,_mainCamTransform.eulerAngles.y,0);
	_screenMovementForward = _screenMovementSpace * Vector3.forward;
	_screenMovementRight = _screenMovementSpace * Vector3.right;
}

function Update(){
	if(motor.movementDirection.sqrMagnitude > 1)
		motor.movementDirection.Normalize();
		
	motor.movementDirection = Input.GetAxis ("Horizontal") * _screenMovementRight + Input.GetAxis ("Vertical") * _screenMovementForward;
	
	#if !UNITY_EDITOR && (UNITY_XBOX360 || UNITY_PS3)	
		var t_axisX : float = Input.GetAxis("LookHorizontal");
		var t_axisY : float = Input.GetAxis("LookVertical");
		motor.facingDirection = t_axisX * _screenMovementRight + t_axisY * _screenMovementForward;
	#endif
}