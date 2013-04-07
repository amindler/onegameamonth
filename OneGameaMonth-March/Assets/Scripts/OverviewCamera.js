//This script makes the camera follow the player's position. 
var CameraTarget: Transform; //The target of the camera, you can choose the object to be followed from the inspector

var ZoomDamping:float = 0.05;

private var CameraShake:float = 0;

private var InitialPosition:Vector3;

private var ZoomTarget:float = 0;

function Start()
{
	//Rotate the camers to loot at the target object
	transform.LookAt(CameraTarget);
		
	InitialPosition = transform.position;
	
	//Set the position of the camera to be a little behind the player, at the first frame
	transform.position.x = InitialPosition.x + CameraTarget.position.x;
	transform.position.z = InitialPosition.z + CameraTarget.position.z;
}

function Update () 
{
	if ( CameraTarget )
	{
		//ZoomTarget = InitialPosition.y + CameraTarget.position.y + Mathf.Abs(CameraTarget.GetComponent("PlayerControls").Speed);
		ZoomTarget = InitialPosition.y + CameraTarget.position.y;
		
		
		//Set the position of the camera to be a little behind the player, each frame
		transform.position.x = InitialPosition.x + CameraTarget.position.x;
		transform.position.y -= (transform.position.y - ZoomTarget) * ZoomDamping;
		transform.position.z = InitialPosition.z + CameraTarget.position.z;
			
		if ( CameraShake > 0 )
		{
			//Decrease the shake value
			CameraShake--;
			
			//print("shake" + Shake);
			transform.position += Vector3(Random.value - 0.5, Random.value - 0.5, Random.value - 0.5) * CameraShake * 0.002;
		}
	}
}