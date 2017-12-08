const express = require('express');
const arduinoRoutes = express.Router();
const ConfigAC = require('../models/ConfigAC');
const Proyector = require('../models/Proyector');
var SerialPort = require('serialport');

var myPort;

//new serial port
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

let Readline = SerialPort.parsers.Readline;
let parser = port.pipe(new Readline);
//parser.on('data', console.log);

// ====== Led Test ======
arduinoRoutes.post('/test', (req, res, next) =>{
	console.log("LED TEST!!!!!!!!!!!!!!!!!!!!!!!");
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

  arduinoRoutes.post('/proyector', (req, res, next) =>{
    console.log("TEST PROYECTOR de Marc!!!!!!!!!!");
    const testProyector = new Proyector({
      state: req.body.state
    })

    testProyector.save( (err) => {
      if (err) {return res.status(500).json(err)}
      return res.status(200).json(testProyector)
    });
    console.log(testProyector);
    proyect(testProyector)

    function proyect(testProyector){
      console.log("JESUS", testProyector);
      if (testProyector.state == '0'){
        console.log("Sending test proyector");
        port.write('0')
      }
    }


  });



module.exports = arduinoRoutes;
