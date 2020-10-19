# A switch for my coffee machine
**homebridge-coffee-machine-switch**

A simple homebridge plugin to perform a simple on-button functionality with a relay on my coffee machine.

**WARRANTY:** I do not provide any warranty for damages to either machinery or computer hardware. All actions done are on your own risk. The software is provided as is and the further support is not garuanteed. 

## General functionality
The plugin is able to switch on and off a relay via the GPIO 14. 
Of course Vcc and GND have to be provided additionally from the Pi. 



As this is specifically pointed into the direction of my coffee machine, the Rancilio Silvia, special behaviour has been implemented additionally: 
The machine has the behaviour to switch off after 30 minutes of non-use automatically. This was implemented by Rancilio in regard to the energy saving requirements in the EU. 

## Software Installation 
Installation of homebridge is required here... I will not go into detail on this. There are so many tutorials. Just choose one and do it.

```
git clone <this repo>
npm install 
(if required: sudo) npm link
```

## Hardware installation
Please check out page 32 of the [manual](https://www.ranciliogroupna.com/filebin/images/Downloadables/User_Manuals/Homeline/Silvia_User_Manual_2017.PDF).

**| /!\ ATTENTION /!\ |** Looking at page 31, you can see that the original Silvia (NOT Silvia E) was having the main power (230V) running through the on switch. 
Working on mains power is absolutely not recommended. This plugin is solely made for the Rancilio Silvia E as it only has 12V running through.

As you can see, the main switch of the Silvia E has 12V running through it and works as a closer button. It is connecting Pins 5 and 6 of the "CPU" logic brick. 
So, I decided to solder my wires directly to the contacts crimped on the wires, but you can also connect directly to 5 and 6. 

Then, make sure you have the NO (normally open) and not the NC (normally closed) contact of your relay connected. 

Done. Thats it. Just adding a second way to close the connection of 5 and 6. 
Now, you can connect your homebridge to the local HomeKit instance and try out the button. 
