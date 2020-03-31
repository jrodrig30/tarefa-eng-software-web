const proposta =  require('../models/proposta')

proposta.methods(['get', 'post', 'put', 'delete'])

proposta.updateOptions({ new: true, runValidators: true})

module.exports = proposta