#pragma strict
public var sigSend:SignalSender;

function OnTriggerStay(p_col:Collider){
	if(p_col.transform.tag == "Player"){
		Debug.Log("I SEE YOU!");
		if(Input.GetKey (KeyCode.F)){
			Debug.Log("YOU HIT AN ACTION!");
			sigSend.SendSignals(this);
		}
	}
}