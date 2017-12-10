require('dotenv').config();
const express = require('express');
const arduinoRoutes = express.Router();
const mongoose = require('mongoose');
const ConfigAC = require('../models/ConfigAC');
const Proyector = require('../models/Proyector');
const TempGraph = require('../models/TempGraph');
const request = require('request');
const moment = require('moment');
const SerialPort = require('serialport');

//new serial port Connection
const portName = '/dev/ttyACM0'
let port = new SerialPort(portName, (err) => {
  if (err) {
    return console.log('Error: ', err.message);
  }
})

//testing communication
port.write('Hola', (err) => {
  if (err) {
    return console.log('Error on write: ', err.message);
  }
  console.log('message to Arduino');
});

// Reading and parser data from Arduino
let Readline = SerialPort.parsers.Readline;
let parser = port.pipe(new Readline({ delimiter: '\r\n' }));
let tempData;


// ===== Temperature & Humidity Real Time ======

arduinoRoutes.post('/realtime', (req, res, next) =>{
var str = '';
parser.on('data', function(data) {
  str += data;
  console.log(data);
});

parser.on('end', function() {
  var newData = JSON.parse(str);
  console.log(typeof newData);
  const newDataT = new TempGraph({
    temperature,
    humidity
  })

 TempGraph.save(newDataT)

  //Send the Mongo query here
  });
});

//======= AC Config ========

arduinoRoutes.post('/controller', (req, res, next) =>{
  const newOrder = new ConfigAC ({
    room, state, setTemp, mode, fanSpeed, swing, calendar} = req.body);

  newOrder.save( (err) =>{
    if (err) {return res.status(500).json(err)}
    return res.status(200).json(newOrder)
  });

  console.log(newOrder);
  sendOrder(newOrder)

  function sendOrder(order){
    //PENDING TO CODE --
  }
})


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


// ====== Proyector ======
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
