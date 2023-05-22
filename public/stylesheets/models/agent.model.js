const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const agentSchema = new Schema({
  id_agent: {
    type: Number,
    required: true,
    unique: true
  },
  identificacion_corredor: {
    type: String,
    required: true
  },
  Name: {
    type: String,
    required: true
  },
  Surname: {
    type: String,
    default: null
  },
  address: {
    type: String,
    default: null
  },
  city: {
    type: String,
    default: null
  },
  Province: {
    type: String,
    default: null
  },
  zip_code: {
    type: Number,
    required: true,
    min: 0
  },
  Telephone: {
    type: Number,
    min: 0,
    default: null
  },
  Email: {
    type: String,
    default: null,
    match: /^\S+@\S+\.\S+$/
  },
  Date_Register: {
    type: Date,
    default: null
  },
  Observaciones: {
    type: String,
    default: ''
  },
  id_realstate: {
    type: Number,
    required: true
  }
});

const Agent = mongoose.model('Agent', agentSchema);

module.exports = Agent;