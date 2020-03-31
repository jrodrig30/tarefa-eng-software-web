const restful = require('node-restful')
const mongoose = restful.mongoose
const propostaSchema = new mongoose.Schema({
    nome           : { type: String, required: true },
    email          : { type: String, required: true },
    cpf            : { type: String, required: true },
    dataNascimento : { type: String, required: true },
    convenio       : { type: String, required: true },
    sexo           : { type: String, required: true },
    celular        : { type: String, required: true },
    documento      : { type: String, required: true },
    cep            : { type: String, required: true },
    logradouro     : { type: String, required: true },
    numero         : { type: String, required: true },
    bairro         : { type: String, required: true },
    complemento    : { type: String },
    estado         : { type: String, required: true },
    estado_id      : { type: String, required: true },
    cidade         : { type: String, required: true },
    cidade_id      : { type: String, required: true },
    responsavelId  : { type: String, required: true },
    status         : { type: String, required: true, default: 'Adicionada' },
    dataAdd        : { type: Date, required:true, default: Date.now },
})

module.exports = restful.model('proposta', propostaSchema)