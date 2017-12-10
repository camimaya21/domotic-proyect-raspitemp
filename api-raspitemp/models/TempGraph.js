const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tempGraphSchema = new Schema({
  temperature: String,
  humidity: String,
  date: Date
},{
  timestamps:{
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const TempGraph = mongoose.model('TempGraph', tempGraphSchema)
module.exports = TempGraph
