#pragma strict

public var scrapCountLabel:UILabel;
public var dmgPriceLabel:UILabel;
public var hpPriceLabel:UILabel;
public var ammoPriceLabel:UILabel;

public var dmgLVLLabel:UILabel;
public var hpLVLLabel:UILabel;
public var ammoLVLLabel:UILabel;

private var stateMan:StateManager;
private var scrapCount:int;
private var dmgLVL:int = 1;
private var hpLVL:int = 1;
private var ammoLVL:int = 1;

private var ammoCost:int = 10;
private var hpCost:int = 10;
private var dmgCost:int = 5;

function Awake(){
	var go : GameObject = GameObject.FindGameObjectWithTag("GameManager");
	stateMan = go.GetComponent("StateManager");
	
	dmgPriceLabel.text = dmgCost.ToString();
	hpPriceLabel.text = hpCost.ToString();
	ammoPriceLabel.text = ammoCost.ToString();
	
	dmgLVLLabel.text = dmgLVL.ToString();
	hpLVLLabel.text = hpLVL.ToString();
	ammoLVLLabel.text = ammoLVL.ToString();
}

function Update(){
	scrapCount = stateMan.getScrap();
	scrapCountLabel.text = scrapCount.ToString();
	
	dmgLVLLabel.text = dmgLVL.ToString();
	hpLVLLabel.text = hpLVL.ToString();
	ammoLVLLabel.text = ammoLVL.ToString();
}

private function storeLogic(p_store:String){
	switch(p_store){
		case "DMG":
			if(scrapCount >= dmgCost){
				scrapCount -= dmgCost;
				dmgLVL ++;
				stateMan.updateScrap(scrapCount);
				stateMan.updateDMG(dmgLVL);
			}
		break;
		case "AMMO":
			if(scrapCount >= ammoCost){
				scrapCount -= ammoCost;
				ammoLVL ++;
				stateMan.updateScrap(scrapCount);
				stateMan.updateAMMO(ammoLVL);
			}
		break;
		case "HP":
			if(scrapCount >= hpCost){
				scrapCount -= hpCost;
				hpLVL ++;
				Debug.Log(hpLVL + " hpLVL");
				stateMan.updateScrap(scrapCount);
				stateMan.updateHP(hpLVL);
			}
		break;
	}
}

public function DMG(){
	storeLogic("DMG");
}

public function AMMO(){
	storeLogic("AMMO");
}

public function HP(){
	storeLogic("HP");
}