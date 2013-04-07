#pragma strict

public var mobCont: DroneMobMoveController;

function OnTriggerEnter (c : Collider) { 
    if (c.CompareTag("Player")) {
    	Debug.Log("Enemy See's Player --- trigger");
    	mobCont.detection(true, c.transform);
    }
} 

function OnTriggerExit (c : Collider) { 
    if (c.CompareTag("Player")) {
    	Debug.Log("Enemy Lost Player --- trigger");
    	mobCont.detection(false, c.transform);
    }
} 

function OnCollisionEnter (c : Collision) { 
    if (c.transform.CompareTag("Player")) {
    	Debug.Log("Enemy See's Player --- collision");
    	mobCont.detection(true, c.transform);
    }
}

function OnCollisionExit (c : Collision) { 
    if (c.transform.CompareTag("Player")) {
    	Debug.Log("Enemy Lost Player --- collision");
    	mobCont.detection(false, c.transform);
    }
} 