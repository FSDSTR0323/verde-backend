const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const agentSchema = new Schema({
  id_agent: {
    type: Number,
    required: true,
    unique: true
  },
  identification_agent: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  surname: {
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
  province: {
    type: String,
    default: null
  },
  zip_code: {
    type: Number,
    required: true,
    min: 0
  },
  telephone: {
    type: Number,
    min: 0,
    default: null
  },
  email: {
    type: String,
    default: null,
    match: /^\S+@\S+\.\S+$/
  },
  date_register: {
    type: Date,
    default: null
  },
  observations: {
    type: String,
    default: ''
  },
  id_realstate: {
    type: Number,
    required: true
  },
  deleteAt: {
    type: Date
  },
},  

{
  timestamps:true }
);

const Agent = mongoose.model('Agent', agentSchema);

module.exports = Agent;