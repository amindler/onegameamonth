#pragma strict

private var runAnim : String = "run";
private var jumpAnim : String = "jump";
private var idleAnim : String = "idle1";
private var attackAnim : String = "SwordFight_attack";


public function playRun()
{
	animation.CrossFade(runAnim);
}

public function playJump()
{
	animation.Play(jumpAnim);
}

public function playIdle()
{
	animation.CrossFade(idleAnim);
}

public function playAttack()
{
	animation.Play(attackAnim);
}