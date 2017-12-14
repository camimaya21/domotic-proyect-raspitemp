const mongoose = require('mongoose')
const Schema = mongoose.Schema
const listMongoose = mongoose.plugin(require('mongoose-list'),{searchFields: ['createdAt']})

const tempGraphSchema = new Schema({
  temperature: String,
  humidity: String,
  fecha: String
},{
  timestamps:{
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const TempGraph = mongoose.model('TempGraph', tempGraphSchema)
module.exports = TempGraph
