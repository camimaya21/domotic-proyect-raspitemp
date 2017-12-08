const express = require('express');
const arduinoRoutes = express.Router();
const TempGraph = require('../models/TempGraph');
var request = require('request');
var moment = require('moment');

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


// ===== Temperature & Humidity Real Time ======
arduinoRoutes.get('/dashboard', (req, res, next) =>{
	console.log("TEST DASHBOARD!!!!!!!!!!!!!!!!!!!!! :)")
  let dataT = parser.on('data');

  const graphicRT = new TempGraph({
      temperture: dataT.temperature,
      humidity: dataT.humidity
  })

})
