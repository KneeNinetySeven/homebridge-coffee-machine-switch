let Gpio = require('onoff').Gpio;
let relais = new Gpio(14, 'out');
var Service, Characteristic;

const MINUTES_ALIVE = 30; 

module.exports = function(homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;

    homebridge.registerAccessory('homebridge-coffee-machine-switch', 'CoffeeMachineSwitch', RelayAccessory);
}

function RelayAccessory(log, config) {
    this.log = log;
    this.name = config['name']
    this.service = new Service.Switch(this.name);

    this.service
        .getCharacteristic(Characteristic.On)
        .on('get', this.getOn.bind(this))
        .on('set', this.setOn.bind(this));

    relais.writeSync(0);
}


RelayAccessory.prototype.onRegister = function(characteristic) {
    this.log('Registering coffee machine accessory');
    characteristic.eventEnabled = true;
}

let resetIntervalTime = 250;
let resetInterval;
let lastTrigger;
RelayAccessory.prototype.cycleRelay = function() {
    if(this.isMachineActive){
	this.log("Turning off machine");
	this.cancelHibernation();
    } else {
	this.log("Turning on machine");
	this.awaitHibernation()
    }
    relais.writeSync(1);
    resetInterval = setInterval(() => {
	relais.writeSync(0);
	clearInterval(resetInterval);
	this.isMachineActive = !this.isMachineActive;
    }, resetIntervalTime);
}

// ***************************************************
// GETTER FUNCTIONS
// ___________________________________________________

RelayAccessory.prototype.getServices = function() {
    return [this.service];
}

RelayAccessory.prototype.getOn = function(callback) {
    this.log("Is the machine active? " + this.isMachineActive);
    callback(null, this.isMachineActive);
}


// ***************************************************
// SETTER FUNCTIONS
// ___________________________________________________

RelayAccessory.prototype.setOn = function(on, callback) {
    this.cycleRelay();
    callback(null);
}

RelayAccessory.prototype.isMachineActive = false;
RelayAccessory.prototype.hibernationInterval = null;

RelayAccessory.prototype.hibernate = function(){
    this.log("Going to sleep mode");
    clearInterval(this.hibernationInterval);
    this.isMachineActive = false;
}

RelayAccessory.prototype.awaitHibernation = function(){
    this.log("Set timer for hibernation to " + MINUTES_ALIVE + " minutes. If not used the machine will have shut off by then");
    this.hibernationInterval = setInterval(() => {this.hibernate()}, 1000*60*MINUTES_ALIVE);
}

RelayAccessory.prototype.cancelHibernation = function(){
    this.log("Hibernation was cancelled")
    clearInterval(this.hibernationInterval);
}
