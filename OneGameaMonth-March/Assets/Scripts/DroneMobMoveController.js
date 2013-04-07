#pragma strict
/*
========================================================
| Public VARIABLES						| Data Type  
========================================================
*/
public var motor : 						MovementMotor;
public var mob : 						Transform;
public var anim :						AnimHandler;
public var capCollider : 				CapsuleCollider;

public var alertOBJ : 					GameObject;

/*
========================================================
| Private VARIABLES						| Data Type  
========================================================
*/
private var _faceingDirection : 		Vector3 = Vector3.zero;

private var _idleCounter : 				float = 0;
private var _idleCounterMax : 			float = 4;

private var _interestCounter : 			float = 0;
private var _interestCounterMax : 		float = 10;

private var _wanderTarget : 			Vector3 = Vector3.zero;
private var _attackTarget : 			Transform;

private var _alertLevel : 				float = 0;
private var _alertLevelMax : 			float = 10;

private var _currentSTATE : 			int = 0;

private var _targetDistPrev : 			float = 0;

private var _stuckCounter : 			float = 0;
private var _stuckCounterMax : 			float = .4;

private var _targetDetected : 			boolean = false;

/*
========================================================
| Enumeration STATES					| Data Type  
========================================================
*/

enum STATE {
	IDLE,
	WANDER,
	CHASE,
	ATTACK
};


function Start()
{
	_attackTarget = null;
	_currentSTATE = STATE.IDLE;
}

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
	_wanderTarget = transform.position;
	randomizeIdle();
	motor.movementDirection = Vector2.zero;
	motor.facingDirection = Vector2.zero;
	motor.movementTarget = _wanderTarget;
	
	if (!mob)
		mob = transform;
}

/*
========================================================
|						UPDATE							| 
========================================================
*/
function FixedUpdate () 
{
	Brain();
}

private function Brain()
{
	if(_targetDetected)
	{
		trackTarget();
	}
	
	if(alertOBJ != null)
		alertOBJ.SetActive(false);
	
	switch(_currentSTATE){
		case STATE.IDLE :
			Idle();
			break;
		case STATE.CHASE :
			if(alertOBJ != null)
				alertOBJ.SetActive(true);
			Chase();
			break;
		case STATE.WANDER :
			Wander();
			break;
		case STATE.ATTACK :
			Attack();
			break;
	}
}

private function Idle()
{
	if(_idleCounter < _idleCounterMax)
	{
		_idleCounter += Time.deltaTime;
	}
	else{
		_idleCounter = 0;
		resetWanderTarget();
		_currentSTATE = STATE.WANDER;
	}
}

private function randomizeIdle()
{
	_idleCounterMax = Random.Range(3,5);
}

private function Chase()
{
	if(_targetDetected){
		_interestCounter = 0;
		Mover(_attackTarget.position);
	} else if (_interestCounter >= _interestCounterMax){
		resetWanderTarget();
		_currentSTATE = STATE.IDLE;
	} else {
		_interestCounter += Time.deltaTime;
		Mover(_attackTarget.position);
	}
}
private function Wander()
{
	Mover(_wanderTarget);
}

private function Mover(p_target : Vector3)
{
	var dist : float = (p_target - mob.transform.position).sqrMagnitude;
	// square the distance we compare with
	
	if(dist > 1){
		moveHandler(p_target);
	} else {
		_stuckCounter = 0;
		randomizeIdle();
		p_target = mob.transform.position;
		_currentSTATE = STATE.IDLE;
	}

	var dif : float = _targetDistPrev - dist;
		
	if(dif <= 0.15){
			//Debug.Log("I'm fuckin' stuck! dif = " + dif + "  my stuck counter = " + _stuckCounter);
		_stuckCounter += Time.deltaTime;
		if(_stuckCounter >= _stuckCounterMax){
			_stuckCounter = 0;
			resetWanderTarget();
		}
	} else {
		_stuckCounter = 0;
	}
	_targetDistPrev = dist;
}

private function Attack()
{
	//attack code
}

private function resetWanderTarget()
{
	var randX : float = Random.Range(-10,10);
	var randZ : float = Random.Range(-10,10);
	_wanderTarget = Vector3(mob.transform.position.x + randX,0,mob.transform.position.z + randZ);
	checkWanderTarget();
}

private function checkWanderTarget()
{
	//var t_floor : boolean = Physics.Raycast(_wanderTarget,-_wanderTarget.up,10);
	var t_floor : boolean = true;
	if(!t_floor){
		resetWanderTarget();
	} else {
		_targetDistPrev = (_wanderTarget - mob.transform.position).sqrMagnitude;
	}
}

private function moveHandler(p_target:Vector3)
{
	var t_forward : Vector3;
	t_forward = transform.forward;
	t_forward = t_forward.normalized;

	motor.facingDirection = t_forward;

	motor.movementTarget = p_target;
				
	if (motor.movementDirection.sqrMagnitude > 1)
		motor.movementDirection.Normalize();	

}

private function trackTarget()
{
	/*
	var forward = transform.TransformDirection(Vector3.forward);
    var toOther = _attackTarget.position - transform.position;
    var dot = Vector3.Dot(forward,toOther);
    var dist : float = (_attackTarget.position - mob.transform.position).sqrMagnitude;
	
    if (dot > 0 && dist < 15)
    {
    	_currentSTATE = STATE.CHASE;
    }
    */
    
    _currentSTATE = STATE.CHASE;
}

/*
========================================================
|					Get Functions						| 
========================================================
*/

/*
========================================================
|					Set Functions						| 
========================================================
*/
public function detection( val : boolean, tran : Transform)
{
	if(val)
	{
		_targetDetected = true;
		_attackTarget = tran;
		_currentSTATE = STATE.CHASE;
	} else {
		_targetDetected = false;
	}
}

public function damageDetection(){
	if(_targetDetected == false){
		_targetDetected = true;
		var go : GameObject = gameObject.FindWithTag("Player");
		_attackTarget = go.transform;
		_currentSTATE = STATE.CHASE;
	}
}


function OnDrawGizmos () {
    Gizmos.DrawIcon(this.transform.position, "FrownFaceIcon.tga");
   	//Gizmos.DrawCube(this.transform.position, Vector3(1,1,1));
}


