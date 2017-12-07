const express = require('express');
const arduinoRoutes = express.Router();
const ConfigAC = require('../models/ConfigAC')
var SerialPort = require('serialport');

var myPort;


// Auto connect to the right serial port
// var arduPort;
// SerialPort.list(function (er, ports){
// 	ports.forEach(function(port){
// 		if(port.vendorId == '2a03'){
// 			arduPort = port.comName;
// 			console.log(arduPort);
// 		}
// 	})
// });

var port = new SerialPort('/dev/ttyACM0', function (err) {
  if (err) {
    return console.log('Error: ', err.message);
  }
});
//testing communication
port.write('Hola', function(err) {
  if (err) {
    return console.log('Error on write: ', err.message);
  }
  console.log('message written');
});

const Readline = SerialPort.parsers.Readline;
const parser = port.pipe(new Readline({ delimiter: '\r\n' }));
parser.on('data', console.log);


arduinoRoutes.post('/test', (req, res, next) =>{
	console.log("TEST!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
	const newTest = new ConfigAC({
		ledtest: req.body.ledtest
	})

	newTest.save( (err) =>{
		if (err) {return res.status(500).json(err)}
		return res.status(200).json(newTest)
	});
	console.log(newTest)
	led(newTest)
	function led(newTest){
			if (newTest.ledtest === 'H'){
				console.log("Sending data to Arduino = ON")
				port.write('H')
			} else if (newTest.ledtest === 'L') {
				console.log("Sending data to Arduino = OFF")
				port.write('L')
			}
		}

})

module.exports = arduinoRoutes;
