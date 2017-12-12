const mongoose = require('mongoose')
const Schema = mongoose.Schema

const proyectorSchema = new Schema({
  state: String
},{
  timestamps:{
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const Proyector = mongoose.model('Proyector', proyectorSchema)
module.exports = Proyector
