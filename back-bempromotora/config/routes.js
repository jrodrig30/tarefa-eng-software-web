const express = require('express')

module.exports = function(server) {
    const router = express.Router()
    server.use('/', router)
    const propostaService = require('../services/propostaService')
    propostaService.register(router, '/proposta')
}