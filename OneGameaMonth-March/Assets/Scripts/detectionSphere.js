#pragma strict

public var mobCont: DroneMobMoveController;

function OnTriggerEnter (c : Collider) { 
    if (c.CompareTag("Player")) {
    	mobCont.detection(true, c.transform);
    }
} 

function OnTriggerExit (c : Collider) { 
    if (c.CompareTag("Player")) {
    	mobCont.detection(false, c.transform);
    }
} 