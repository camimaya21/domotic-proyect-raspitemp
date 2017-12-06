const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tempGraphSchema = new Schema({
  temperture: Number,
  humidity: Number,
  date: Date  
},{
  timestamps:{
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const TempGraph = mongoose.model('TempGraph', tempGraphSchema)
module.exports = TempGraph