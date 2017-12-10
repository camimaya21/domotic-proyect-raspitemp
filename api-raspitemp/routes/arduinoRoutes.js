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
parser.on('data', (data)=> {
  console.log(data);
});

// port.open((err) => {
//   if (err) {
//     return console.log('Error on write: ', err.message);
//   } else {
//     console.log("Arduino says Hi - Successfull Connection");
//     port.on('data', (sensorData) =>{
//       var tempData = JSON.parse(sensorData);
//       if (tempData.temperature.valido){
//     console.log("temperature:" + tempData.temperature.valor + "ºC")
//       }else{
//         console.log("Temperature: ERROR!!")
//       }
//       if (tempData.humidity.valido){
//     console.log("humidity:" + tempData.humidity.valor + "%")
//       }else{
//         console.log("Humidity: ERROR!!")
//       }
//     })
//   }
// })



// parser.on('data', (data)=>{
//    console.log("entro ======" + data)
//         console.log(typeof data);
//         var datosSerie = JSON.parse(data);
//         console.log("de que puto tipo eres ====>" + typeof datosSerie);
//         // // Humedad
//         // if (datosSerie.humidity.valido){
//         //     console.log("Humedad: " + datosSerie.humidity.valor + "%"  );
//         // } else {
//         //     console.log("Humedad: ERROR!!")
//         // }
//         //
//         // // Temperatura
//         // if (datosSerie.temperature.valido){
//         //     console.log("Temperatura: " + datosSerie.temperature.valor + "°C"  );
//         // } else {
//         //     console.log("Temperatura: ERROR!!")
//         // }
//  })


// ===== Temperature & Humidity RealTime ======

// arduinoRoutes.post('/realtime', (req, res, next) =>{
// var str = '';
// parser.on('data', function(data) {
//   str += data;
//   console.log(typeof data);
// });
//
// parser.on('data', function(str) {
//   var newData = JSON.parse(str);
//   console.log(typeof newData);
//   const newDataT = new TempGraph({
//     temperature,
//     humidity
//   })
//
//  TempGraph.save(newDataT)
//
//   //Send the Mongo query here
//   });
// });

//======= AC Config ========

arduinoRoutes.post('/controller', (req, res, next) =>{
  const newOrder = new ConfigAC ({
    room, state, setTemp, mode, fanSpeed, swing, calendar} = req.body);

  newOrder.save( (err) =>{
    if (err) {return res.status(500).json(err)}
    return res.status(200).json(newOrder)
  });

  console.log(newOrder);
  sendOrder(newOrder);

  function sendOrder(order){
    if (newOrder.state === '1'){ //"Sending order to turn ON the AC"
    console.log("order!!!!!!!!!!!!!!!!!!!");
      port.write('1')
    }else if (newOrder.state === '0'){ //"Sending order to turn OFF the AC"
      port.write('0')
    }
//    port.read()
  }
})


// ====== Led Test ======
arduinoRoutes.post('/test', (req, res, next) =>{
	const newTest = new ConfigAC({
		ledtest: req.body.ledtest
	})

	newTest.save( (err) =>{
		if (err) {return res.status(500).json(err)}
		return res.status(200).json(newTest)
	});

  led(newTest)

	function led(newTest){
			if (newTest.ledtest === 'H'){ //Sending data to Arduino = ON"
      console.log("Sending data to Arduino = ON")
				port.write('H');
  			} else if (newTest.ledtest === 'L') { //"Sending data to Arduino = OFF"
			console.log("Sending data to Arduino = OFF")
        port.write('L');
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
