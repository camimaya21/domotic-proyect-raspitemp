const mongoose = require('mongoose')
const Schema = mongoose.Schema
const MODES = require('./modes.js')
const FAN = require('./fan.js')

const configACSchema = new Schema({
  room: String,
  state: { type: String, default: "OFF"},
  setTemp: { type: String, min: 18, max: 30, default: 25 },
  mode: { type: String, enum: MODES, default: 3 },
  fanSpeed: { type: String, enum: FAN, default: 3 },
  swing: { type: String, default: "OFF"},
  calendar: Date,
  ledtest: { type: String, enum: ['H', 'L'], default:'L' } //creado solo para el test del Led
},{
  timestamps:{
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const ConfigAC = mongoose.model('ConfigAC', configACSchema)
module.exports = ConfigAC
