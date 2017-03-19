// MQTT Setup
var PythonShell = require('python-shell');
var mqtt = require('mqtt');
console.log("Connecting to MQTT broker...");
var mqtt = require('mqtt');
var options = {
  port: 1883,
  host: '192.168.0.67',
  clientId: 'gpio18'
};
var client = mqtt.connect(options);
console.log("gpio18 Connected to MQTT broker");

var Accessory = require('../').Accessory;
var Service = require('../').Service;
var Characteristic = require('../').Characteristic;
var uuid = require('../').uuid;

// here's a fake hardware device that we'll expose to HomeKit
var GPIO18= {
  powerOn: false,
  
  setPowerOn: function(on) { 
    console.log("Turning the gpio18 %s!", on ? "on" : "off");
    if (on) {
      client.publish('gpio18', 'on');
      GPIO18.powerOn = on;
	PythonShell.run('/python/encenderGPIO18.py', function (err) {
 	console.log('On Success');
	});
   	}
    else {
	    client.publish('gpio18','off');
      GPIO18.powerOn = false;
	PythonShell.run('/python/apagarGPIO18.py', function (err) {
 	console.log('Off Success');
	});
   };

  },
  identify: function() {
    console.log("Identify the light!");
  }
}

// Generate a consistent UUID for our light Accessory that will remain the same even when
// restarting our server. We use the `uuid.generate` helper function to create a deterministic
// UUID based on an arbitrary "namespace" and the word "gpio18".
var lightUUID = uuid.generate('hap-nodejs:accessories:gpio18');

// This is the Accessory that we'll return to HAP-NodeJS that represents our fake light.
var light = exports.accessory = new Accessory('gpio18', lightUUID);

// Add properties for publishing (in case we're using Core.js and not BridgedCore.js)
light.username = "2A:1B:1C:1D:5E:1F";
light.pincode = "031-45-154";

// set some basic properties (these values are arbitrary and setting them is optional)
light
  .getService(Service.AccessoryInformation)
  .setCharacteristic(Characteristic.Manufacturer, "Lisergio")
  .setCharacteristic(Characteristic.Model, "Ver-1")
  .setCharacteristic(Characteristic.SerialNumber, "06001");

// listen for the "identify" event for this Accessory
light.on('identify', function(paired, callback) {
  GPIO18.identify();
  callback(); // success
});

// Add the actual Lightbulb Service and listen for change events from iOS.
// We can see the complete list of Services and Characteristics in `lib/gen/HomeKitTypes.js`
light
  .addService(Service.Lightbulb, "gpio18") // services exposed to the user should have "names" like "Fake Light" for us
  .getCharacteristic(Characteristic.On)
  .on('set', function(value, callback) {
    GPIO18.setPowerOn(value);
    callback(); // Our fake Light is synchronous - this value has been successfully set
  });

// We want to intercept requests for our current power state so we can query the hardware itself instead of
// allowing HAP-NodeJS to return the cached Characteristic.value.
light
  .getService(Service.Lightbulb)
  .getCharacteristic(Characteristic.On)
  .on('get', function(callback) {
    
    // this event is emitted when you ask Siri directly whether your light is on or not. you might query
    // the light hardware itself to find this out, then call the callback. But if you take longer than a
    // few seconds to respond, Siri will give up.
    
    var err = null; // in case there were any problems
    
    if (GPIO18.powerOn) {
      console.log("Are we on? Yes.");
      callback(err, true);
    }
    else {
      console.log("Are we on? No.");
      callback(err, false);
    }
  });

