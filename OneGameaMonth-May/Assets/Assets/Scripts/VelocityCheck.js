#pragma strict
public var shortClip : AudioClip;
public var longClip : AudioClip;
private var sfx : AudioSource;

function Start () {
	sfx = this.GetComponent(AudioSource);
}

function Update () {
	Debug.Log(this.rigidbody.velocity.sqrMagnitude);
	if(this.rigidbody.velocity.sqrMagnitude > 0.001){
		if(this.rigidbody.velocity.sqrMagnitude > 0.1){
			sfx.clip = shortClip;
		} else {
			sfx.clip = longClip;
		}
		
		if(sfx.isPlaying == false){
			sfx.Play();	
		} 
	} else {
		sfx.Stop();
	}
}