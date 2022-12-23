const mongoose = require('mongoose');
const { Schema } = mongoose;

const pessoaSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    require: true
  },
  salarioBruto: {
    type: mongoose.Types.Decimal128,
    require: true
  },
  descontos: {
    type: mongoose.Types.Decimal128,
    require: true
  },
}, {
    versionKey: false
});

module.exports = mongoose.model('pessoa', pessoaSchema);