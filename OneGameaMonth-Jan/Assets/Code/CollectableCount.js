#pragma strict
public var CountOBJ:Collector;
private var count:float;
public var TIMER : TimerClass;
public var counterTxt : UILabel;

function Awake(){
	TIMER.reset();
}

function Update(){
	count = CountOBJ.COLLECTED;
	counterTxt.text = count.ToString();
	
	if(count >= 25){
		TIMER.stop();
		endGame();
	}
	
	if(Input.GetKeyUp("space")){
		TIMER.stop();
		endGame();
	}
}

function endGame(){
	TIMER.stop();
	Application.LoadLevel("END");
}