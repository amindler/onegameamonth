#pragma strict
public var particle:ParticleSystem;

function Awake () {

}

function Update () {
	if(particle.isStopped){
		Spawner.Destroy (gameObject);
	}
}