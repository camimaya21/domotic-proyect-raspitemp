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
const path = require('path');
const debug = require('debug')("angularauth:" + path.basename(__filename).split('.')[0]);
mongoose.plugin(require('mongoose-list'), {
  searchFields: ['createdAt']
})


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
let parser = port.pipe(new Readline({
  delimiter: '\r\n'
}));


// ===== Temperature & Humidity RealTime ======

parser.on('data', data => {
  var tempData = JSON.parse(data);
  console.log(tempData);
  console.log(tempData.temperature);
  console.log(tempData.humidity);

  let currentDate = new Date()
  const newData = new TempGraph({
    temperature: tempData.temperature,
    humidity: tempData.humidity,
    fecha: currentDate.getHours()+":"+currentDate.getMinutes()+":"+currentDate.getSeconds()    
  })

  newData.save()
    .then(newData => {
      if (err) {
        return res.status(500).json({
          message: 'Something went wrong'
        });
      }
      res.status(200).json(newData);
    })
});


arduinoRoutes.get('/realtime', (req, res, err) => {
  TempGraph.list({
    limit: 1,
    sort: {
      'created_at': -1
    }
  }, function (err, count, results) {
    console.log(results);

    if (err) {
      return res.status(500).json(err)
    }
    return res.status(200).json(results)
  })
});


//======= AC Config ========

arduinoRoutes.post('/controller', (req, res, next) => {
  const newOrder = new ConfigAC({
    room,
    state,
    setTemp,
    mode,
    fanSpeed,
    swing,
    calendar
  } = req.body);

  newOrder.save((err) => {
    if (err) {
      return res.status(500).json(err)
    }
    return res.status(200).json(newOrder)
  });

  console.log(newOrder);
  sendOrder(newOrder);

  function sendOrder(order) {
    if (newOrder.state === '1') { //"Sending order to turn ON the AC"
      console.log("order!!!!!!!!!!!!!!!!!!!");
      port.write('1')
    } else if (newOrder.state === '0') { //"Sending order to turn OFF the AC"
      port.write('0')
    }
  }
})


// ====== Led Test ======
arduinoRoutes.post('/test', (req, res, next) => {
  console.log("ENTRO TEST")
  const newTest = new ConfigAC({
    ledtest: req.body.ledtest
  })

  newTest.save((err) => {
    if (err) {
      return res.status(500).json(err)
    }
    return res.status(200).json(newTest)
  });

  led(newTest)

  function led(newTest) {
    if (newTest.ledtest === 'H') { //Sending data to Arduino = ON"
      console.log("Sending data to Arduino = ON")
      port.write('1');
    } else if (newTest.ledtest === 'L') { //"Sending data to Arduino = OFF"
      console.log("Sending data to Arduino = OFF")
      port.write('2');
    }
  }
})


// ====== Proyector ======
arduinoRoutes.post('/proyector', (req, res, next) => {
  console.log("TEST PROYECTOR de Marc!!!!!!!!!!");
  const testProyector = new Proyector({
    state: req.body.state
  })

  testProyector.save((err) => {
    if (err) {
      return res.status(500).json(err)
    }
    return res.status(200).json(testProyector)
  });
  console.log(testProyector);
  proyect(testProyector)

  function proyect(testProyector) {
    console.log("JESUS", testProyector);
    if (testProyector.state == 'ON') {
      console.log("Sending test proyector");
      port.write('3');
    } else if (testProyector.state == 'OFF'){
      console.log("Sending test proyector");
      port.write('4');
    }
  }
});



module.exports = arduinoRoutes;