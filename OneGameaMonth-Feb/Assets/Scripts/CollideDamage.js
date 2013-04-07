#pragma strict

public var collideDMG:float = 1;
public var hitOBJ:GameObject;

function OnCollisionEnter(p_col:Collision){
	if(p_col.transform.tag != "munitions" && p_col.transform.tag != "bounds"){
		var go:Health = p_col.gameObject.GetComponent("Health");
		if(this.transform.tag != "item"){
			if(hitOBJ != null){
				var part : GameObject = Spawner.Spawn (hitOBJ, p_col.contacts[0].point, Quaternion.Euler(0,0,0)) as GameObject;
			}
			if(go != null){
				go.updateHP(collideDMG);
			}
		} else {
			if(p_col.transform.tag == "Player"){
				go.updateHP(collideDMG);
				Spawner.Destroy (gameObject);
			}
		}
	}
}