const mongoose = require('mongoose');
const { Schema } = mongoose;

const cadastroSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    require: true
  },
  requestsCount: {
    type: Number,
    default: 0
  },
}, {
    versionKey: false
});

module.exports = mongoose.model('cadastro', cadastroSchema);
