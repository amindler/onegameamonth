#pragma strict
public var COLLECTED : float = 0;
public var Text : UILabel;
private var readString:String;

function OnCollisionEnter( col : Collision) {
	if(col.gameObject.GetComponent(Collectable)){
		var t_price:float = col.gameObject.GetComponent(Collectable).PRICE;
		var t_name:String = col.gameObject.GetComponent(Collectable).NAME;
		COLLECTED += t_price;
		readString = "YOU JUST COLLECTED A " + t_name + " WORTH " + t_price.ToString() + " GEMS";
		Text.text = readString;
		Destroy(col.gameObject);
	}
}