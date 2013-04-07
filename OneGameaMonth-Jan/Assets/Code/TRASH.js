#pragma strict

function OnCollisionEnter( col : Collision) {
	if(col.gameObject.GetComponent(Collectable)){
		Destroy(col.gameObject);
	}
}