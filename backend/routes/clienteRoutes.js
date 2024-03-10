const express = require('express');
const router = express.Router();
// Importação dos métodos do controller
const clienteController = require('../controllers/clienteController');

// Rota que lista todos os clientes
router.get('/clientes', clienteController.listarClientes);

// Rota que obtém um cliente por filtro
router.get('/clientes/filtrar', clienteController.listarClientesPorFiltros);

// Rota que cadastra um novo cliente
router.post('/cadastrar-cliente', clienteController.cadastrarCliente);

// Rota que define a menor rota a ser realizada pela empresa
router.get('/calcular-menor-rota', clienteController.calcularMenorRota);

// Exportação para ser usado por outros arquivos
module.exports = router;