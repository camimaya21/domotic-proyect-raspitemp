const express = require('express');
const arduinoRoutes = express.Router();
const ConfigAC = require('../models/ConfigAC')

//Connected with Arduino via SerialPort
// const arduinoSerialPort = '/dev/ttyACM0';
// const fs = require('fs');
// const serialport = require('serialport');
// const serialPort = new serialport.SerialPort(arduinoSerialPort,
// {//Listening on the serial port for data coming from Arduino over USB
// 	parser: serialport.parsers.readline(';')
// });


const serialport = require("serialport");
const SerialPort  = serialport.SerialPort;
let myPort;

// Auto connect to the right serial port
serialport.list(function (err, ports) {
	ports.forEach(function(port) {
		if(port.manufacturer.indexOf("duino") != -1){
			myPort = new SerialPort(port.comName,{
			baudrate: 115200,
			parser: serialport.parsers.readline(";") //Listener
			});
			console.log("Port found: " + port.comName);
		}
	});
});

arduinoRoutes.post('/controlardu', (req, res, next) =>{
	const newTest = new ConfigAC({
		ledtest: req.body.ledtest
	})

	newTest.save( (err) =>{
		if (err) {return res.status(500).json(err)}
		return res.status(200).json(newTest)
	});

	function led(newTest){
			if (newTest === 'H'){
				console.log("Sending data to Arduino = ON")
				myPort.write('H')
			} else if (newTest === 'L') {
				console.log("Sending data to Arduino = OFF")
				myPort.write('L')
			}
		}

})

module.exports = arduinoRoutes;
