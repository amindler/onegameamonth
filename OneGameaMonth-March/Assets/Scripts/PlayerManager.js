#pragma strict

public var currHP:int = 50;
public var maxHP:int = 50;

public var currAMMO:int = 50;
public var maxAMMO:int = 50;
public var baseAMMO:int = 50;

public var gunDamage:float = 1;
public var baseGunDamage:float = 1;

public var swordDamage:float = 1;
public var baseSwordDamage:float = 1;

public var currMoney:int = 0;

public var baseMod:float = 1.25;

public var swordMod:float = 0;
public var gunMod:float = 0;
public var moneyMod:float = 0;
public var ammoMod:float = 0;
public var armorMod:float = 0;
public var speedMod:float = 0;
public var hpPickUpMod:float = 0;

public var statBaseCost : int = 100;
public var gunStatCost : int = 100;
public var swordStatCost : int = 100;
public var ammoStatCost : int = 100;
public var armorStatCost : int = 100;
public var speedStatCost : int = 100;

public var swdDMGlv:int = 0;
public var gunDMGlv:int = 0;
public var ammoLv:int = 0;
public var armorLv:int = 0;
public var speedLv:int = 0;

private var hpMaxCount:int = 150;
private var hpCurrCount:int = 0;

public var hpLabel:UILabel;
public var ammoLabel : UILabel;
public var moneyLabel : UILabel;

// ==== menu labels ==== //
public var gunLvLabel : UILabel;
public var gunPriceLabel : UILabel;

public var swordLvLabel : UILabel;
public var swordPriceLabel : UILabel;

public var ammoLvLabel : UILabel;
public var ammoPriceLabel : UILabel;

public var armorLvLabel : UILabel;
public var armorPriceLabel : UILabel;

public var speedLvLabel : UILabel;
public var speedPriceLabel : UILabel;

function Awake () {
	currHP = maxHP;
	currAMMO = maxAMMO;
	
	updateStats();
}

function Update () {
	if(currHP <= 0)
		Debug.Log("DEAD!!");
	
	if(currHP != maxHP){
		if(hpCurrCount < hpMaxCount){
			hpCurrCount ++;
		} else if (hpCurrCount >= hpMaxCount){
			currHP ++;
			hpCurrCount = 0;
		}
	}
	
	updateLabels();
}

private function updateLabels(){
	var hptxt : String = currHP.ToString() + "/" + maxHP.ToString();
	var ammotxt : String = currAMMO.ToString() + "/" + maxAMMO.ToString();
	var moneytxt : String = "$" + currMoney.ToString();
	hpLabel.text = hptxt;
	ammoLabel.text = ammotxt;
	moneyLabel.text = moneytxt;
	
	// menu labels //
	gunLvLabel.text = gunDMGlv.ToString();
	gunPriceLabel.text = gunStatCost.ToString();
	swordLvLabel.text = swdDMGlv.ToString();
	swordPriceLabel.text = swordStatCost.ToString();
	ammoLvLabel.text = ammoLv.ToString();
	ammoPriceLabel.text = ammoStatCost.ToString();
	armorLvLabel.text = armorLv.ToString();
	armorPriceLabel.text = armorStatCost.ToString();
	speedLvLabel.text = speedLv.ToString();
	speedPriceLabel.text = speedStatCost.ToString();
	
}

public function get gunDMG():float{
	return gunDamage;
}

public function get swordDMG():float{
	return swordDamage;
}

public function get Ammo():int{
	return currAMMO;
}

public function updateAmmo(p_val:int){
	var t_val : int = 0;
	if(p_val > 0)
		t_val = Mathf.Round(p_val * ammoMod);
		
	currAMMO += p_val + t_val;
	if(currAMMO < 0)
		currAMMO = 0;
	
	if(currAMMO > maxAMMO)
		currAMMO = maxAMMO;
}

public function get Money():int{
	return currMoney;
}

public function addMoney(p_val:int){
	var t_val : int = Mathf.Round(p_val * moneyMod);
	currMoney += p_val + t_val;
}

public function removeMoney(p_val:int){
	currMoney -= p_val;
	if(currMoney < 0)
		currMoney = 0;
}

public function damageHP(p_val:float){
	var t_val : float = p_val * armorMod;
	var t_dmg : int = Mathf.Round(p_val - t_val);
	
	currHP -= t_dmg;
	if(currHP <= 0){
		currHP = 0;
		Debug.Log("DEAD");
	}
}

public function modifyHP(p_val:float){
	var t_val : float = p_val * hpPickUpMod;
	Debug.Log(t_val + " HP percentage value");
	var t_hp : int = (Mathf.Round(p_val + t_val));
	Debug.Log(t_hp + " HP TO BE ADDED");
	currHP += t_hp;
	if(currHP > maxHP)
		currHP = maxHP;
}

public function upgradeGDMG(){
	if(currMoney >= gunStatCost){
		currMoney -= gunStatCost;
		gunDMGlv ++;
		gunMod = baseMod * gunDMGlv;
		gunStatCost = statBaseCost * gunDMGlv;
	}
	updateStats();
}

public function upgradeSDMG(){
	if(currMoney >= swordStatCost){
		currMoney -= swordStatCost;
		swdDMGlv ++;
		swordMod = baseMod * swdDMGlv;
		swordStatCost = statBaseCost * swdDMGlv;
	}
	updateStats();
}

public function upgradeAmmo(){
	if(currMoney >= ammoStatCost){
		currMoney -= ammoStatCost;
		ammoLv ++;
		ammoMod = baseMod * ammoLv;
		ammoStatCost = statBaseCost * ammoLv;
	}
	updateStats();
}

public function upgradeArmor(){
	if(currMoney >= armorStatCost){
		currMoney -= armorStatCost;
		armorLv ++;
		armorMod = baseMod * armorLv;
		armorStatCost = statBaseCost * armorLv;
	}
	updateStats();
}

public function upgradeSpeed(){
	if(currMoney >= speedStatCost){
		currMoney -= speedStatCost;
		speedLv ++;
		speedMod = baseMod * speedLv;
		speedStatCost = statBaseCost * speedLv;
	}
	updateStats();
}

private function updateStats(){
	gunDamage = baseGunDamage + (baseGunDamage * gunMod);
	swordDamage = baseSwordDamage + (baseSwordDamage * swordMod);
	maxAMMO = baseAMMO + (baseAMMO * ammoMod);
	armorMod = baseMod * armorLv;
	//speed
}