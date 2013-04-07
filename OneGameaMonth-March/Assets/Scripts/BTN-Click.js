#pragma strict
public var sig:SignalSender;

function OnClick(){
	sig.SendSignals(this);
}