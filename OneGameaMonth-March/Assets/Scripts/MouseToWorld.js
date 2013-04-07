#pragma strict
public var mouseOBJ:GameObject;
public var placeableOBJ:GameObject;

private var playerState:CharacterState;

public var selectedOBJ:GameObject;

function Start(){
	var go:GameObject = GameObject.FindGameObjectWithTag("PlayerManager");
	playerState = go.GetComponent("CharacterState");
}

function Update () {
	/*
	if(playerState.currentPlayerState != "BUILD"){
		if(mouseOBJ != null)
			mouseOBJ.SetActive(false);
	*/		
		if(Input.GetMouseButtonUp(0)){
			var gos:GameObject[];
			gos = GameObject.FindGameObjectsWithTag("Select");
			for(var go:GameObject in gos){
				var t_go:Selectable;
				t_go = go.GetComponent("Selectable");
				t_go.Deselection();
			}
			mouseSelectClick();
		}
	/*	
	} else {
		mouseOBJ.SetActive(true);
		mouseToWorld();
	}
	*/
}

private function mouseToWorld(){
	var t_hit : RaycastHit;
	var t_vector:Vector3;
	
	if(Physics.Raycast(Camera.main.ScreenPointToRay(Input.mousePosition), t_hit)){
		t_vector = Vector3(t_hit.point.x, 1, t_hit.point.z);
		mouseOBJ.transform.position = t_vector;
		if(Input.GetMouseButtonUp(0)){
			Instantiate (placeableOBJ, t_vector, Quaternion.identity);
		}
		
	}
}

private function mouseSelectClick(){
	var t_hit : RaycastHit;
	var t_vector:Vector3;
	if(Physics.Raycast(Camera.main.ScreenPointToRay(Input.mousePosition), t_hit)){
		//t_hit.collider.gameObject.BroadcastMessage("selectMe");
		/*
		if(t_hit.collider.GetComponent("Selectable")){
			var t_go:Selectable;
			t_go = t_hit.collider.GetComponent("Selectable");
			t_go.selectState = true;
			selectedOBJ = t_hit.collider.gameObject;
		}
		*/
	}
}