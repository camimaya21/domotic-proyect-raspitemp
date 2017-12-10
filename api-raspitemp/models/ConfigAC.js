const mongoose = require('mongoose')
const Schema = mongoose.Schema
const MODES = require('./modes.js')
const FAN = require('./fan.js')

const configACSchema = new Schema({
  room: Number,
  state: { type: String},// enum: [0, 1], default: 0 },
  setTemp: { type: Number, min: 18, max: 30, default: 25 },
  mode: { type: Number, enum: MODES, default: 4 },
  fanSpeed: { type: Number, enum: FAN, default: 6 },
  swing: { type: Number, enum: [0, 1], default: 0},
  calendar: Date,
  ledtest: { type: String, enum: ['H', 'L'], default:'H' } //creado solo para el test del Led
},{
  timestamps:{
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const ConfigAC = mongoose.model('ConfigAC', configACSchema)
module.exports = ConfigAC
