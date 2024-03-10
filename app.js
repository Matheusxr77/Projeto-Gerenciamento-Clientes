const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

// Importando das rotas
const clienteRoutes = require('../projeto-gerenciamento-clientes/backend/routes/clienteRoutes');

// Carregando as variáveis de ambiente de um arquivo .env
dotenv.config();

// Criando uma instância do aplicativo Express
const app = express();

// Analisando os corpos das solicitações POST com o body-parser
app.use(bodyParser.json());

app.use(cors());

// Usando as rotas
app.use('/', clienteRoutes);

// Lidando com rotas não encontradas
app.use((req, res, next) => {
    const error = new Error('Rota não encontrada');
    error.status = 404;
    next(error);
});

// Lidando com possíveis erros
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || 'Ocorreu um erro interno no servidor'
    });
});

// Iniciando o servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// Exportação do arquivo para ser usado por outros arquivos
module.exports = app;