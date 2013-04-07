#pragma strict
public var AMMO:int = 10;
function OnCollisionEnter(p_col:Collision){
	if(p_col.transform.tag == "Player"){
		var t_ammo:AutoFire = p_col.gameObject.GetComponent("AutoFire");
		t_ammo.addAmmo(AMMO);
		Spawner.Destroy (gameObject);
	}
}