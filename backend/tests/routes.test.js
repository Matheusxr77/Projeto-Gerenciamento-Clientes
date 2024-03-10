// Arquivo de testes unitários
const request = require('supertest');
const express = require('express');
// Importação das rotas
const router = require('../routes/clienteRoutes'); 

const app = express();
app.use(express.json());
// Uso das rotas no aplicativo Express
app.use(router); 

// Escrita dos testes unitários das rotas 
describe('Testes das rotas de clientes', () => {
    it('Teste de listar todos os clientes', async () => {
        const response = await request(app).get('/clientes');
        expect(response.status).toBe(200);
    });

    it('Teste de listar clientes por filtro', async () => {
        const filtro = 'filtro';
        const response = await request(app).get(`/clientes/filtro/${filtro}`);
        expect(response.status).toBe(200);
    });

    it('Teste de cadastrar um novo cliente', async () => {
        const novoCliente = {
            nome: 'Novo Cliente',
            email: 'novo@cliente.com',
            telefone: '123456789',
            coordenadaX: 2,
            coordenadaY: 4
        };
        const response = await request(app)
            .post('/cadastrar-cliente')
            .send(novoCliente);
        expect(response.status).toBe(201);
    });

    it('Teste de calcular a menor rota', async () => {
        const response = await request(app).get('/calcular-menor-rota');
        expect(response.status).toBe(200);
    });
});