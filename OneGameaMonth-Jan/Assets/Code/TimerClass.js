
public var Text : UILabel;
private var startTime;
private var textTime:String;
private var GameRunning:boolean = true;

function Awake(){
	DontDestroyOnLoad (transform.gameObject);
	startTime = Time.time;
}

function Update() {
	if(!Text){
		Debug.Log("Can't Find Text");
		var go = GameObject.FindGameObjectWithTag("TimerTxt");
		Text = go.GetComponent("UILabel");
		Text.text = textTime;
	}
	
	if(GameRunning){
		 var t_time = Time.time - startTime;
		 
		 var minutes : int = t_time / 60;
		 var seconds : int = t_time % 60;
		 var fraction : int = (t_time * 100) % 100;
		 
		 textTime = String.Format ("{0:00}:{1:00}:{2:00}", minutes, seconds, fraction);
		 Text.text = textTime;
	}
}

public function reset(){
	startTime = Time.time;
	GameRunning = true;
}

public function stop(){
	GameRunning = false;
}