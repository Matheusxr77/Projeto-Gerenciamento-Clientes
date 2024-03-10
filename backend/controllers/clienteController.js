const pool = require('../config/conexão');

const Cliente = require('../models/cliente');

class ClienteController {
    constructor() {}

    // Método que cadastra um novo cliente
    async cadastrarCliente(req, res) {
        try {
            // Verifica se todos os campos necessários foram fornecidos no corpo da requisição
            if (!req.body.nome || !req.body.email || !req.body.telefone || !req.body.coordenada_x || !req.body.coordenada_y) {
                return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
            }
    
            // Extrai os dados do corpo da requisição
            const { nome, email, telefone, coordenada_x, coordenada_y } = req.body;
    
            // Verifica se há duplicidade de nome
            const verificaNome = await pool.query('SELECT * FROM clientes WHERE nome = $1', [nome]);
            if (verificaNome.rows.length > 0) {
                return res.status(400).json({ message: 'Já existe um cliente cadastrado com esse nome.' });
            }
    
            // Verifica se há duplicidade de email
            const verificaEmail = await pool.query('SELECT * FROM clientes WHERE email = $1', [email]);
            if (verificaEmail.rows.length > 0) {
                return res.status(400).json({ message: 'Já existe um cliente cadastrado com esse email.' });
            }
    
            // Verifica se há duplicidade de telefone
            const verificaTelefone = await pool.query('SELECT * FROM clientes WHERE telefone = $1', [telefone]);
            if (verificaTelefone.rows.length > 0) {
                return res.status(400).json({ message: 'Já existe um cliente cadastrado com esse telefone.' });
            }
    
            // Query SQL para inserir um novo cliente na tabela
            const query = 'INSERT INTO clientes (nome, email, telefone, coordenada_x, coordenada_y) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    
            // Executa a consulta para inserir o novo cliente
            const result = await pool.query(query, [nome, email, telefone, coordenada_x, coordenada_y]);
    
            // Retorna o cliente cadastrado
            res.status(201).json(result.rows[0]);
        } catch (error) { // Tratamento de erro
            console.error('Erro ao cadastrar cliente:', error);
            // Se ocorrer um erro durante o processo de cadastro, retorna um status 400 (Bad Request)
            res.status(400).json({ message: 'Erro ao cadastrar cliente' });
        }
    }
    
    // Método que lista todos os clientes
    async listarClientes(req, res) {
        try {
            // Query SQL que busca todos os clientes
            const query = 'SELECT * FROM clientes';

            // Executa a consulta
            const result = await pool.query(query);

            res.json(result.rows);
        } catch (error) {
            console.error('Erro ao listar clientes:', error);
            res.status(500).json({ message: 'Erro ao listar clientes' });
        }
    }

    // Método que listar os clientes baseado no filtro
    async listarClientesPorFiltros(req, res) {
        try {
            // Utilizando req.query para acessar os filtros
            const { nome, email, telefone } = req.query;
    
            let conditions = [];
            let params = [];
            let counter = 1;
    
            if (nome) {
                conditions.push(`nome ILIKE $${counter}`);
                params.push(`%${nome}%`);
                counter++;
            }
            if (email) {
                conditions.push(`email ILIKE $${counter}`);
                params.push(`%${email}%`);
                counter++;
            }
            if (telefone) {
                conditions.push(`telefone ILIKE $${counter}`);
                params.push(`%${telefone}%`);
            }
    
            const whereClause = conditions.length ? `WHERE ${conditions.join(' OR ')}` : '';
            const query = `SELECT * FROM clientes ${whereClause}`;
    
            const result = await pool.query(query, params);
            res.json(result.rows);
        } catch (error) {
            console.error('Erro ao listar clientes por filtro:', error);
            res.status(500).json({ message: 'Erro ao listar clientes por filtro' });
        }
    }
    
    async calcularMenorRota(req, res) {
        try {
            const query = 'SELECT * FROM clientes';
            const result = await pool.query(query);
            const clientes = result.rows;

            // Aplica o algoritmo para calcular a menor rota - Exemplo com Vizinho Mais Próximo
            const rota = this.calcularRota(clientes);

            res.json(rota);
        } catch (error) {
            console.error('Erro ao calcular menor rota:', error);
            res.status(500).json({ message: 'Erro ao calcular menor rota' });
        }
    }

    calcularRota(clientes) {
        let clientesNaoVisitados = clientes.slice();
        let rota = [];
        let pontoAtual = { coordenada_x: 0, coordenada_y: 0 };

        while (clientesNaoVisitados.length > 0) {
            let indiceProximoCliente = 0;
            let distanciaMinima = Number.MAX_VALUE;

            for (let i = 0; i < clientesNaoVisitados.length; i++) {
                let distancia = this.calcularDistancia(pontoAtual.coordenada_x, pontoAtual.coordenada_y, clientesNaoVisitados[i].coordenada_x, clientesNaoVisitados[i].coordenada_y);
                if (distancia < distanciaMinima) {
                    distanciaMinima = distancia;
                    indiceProximoCliente = i;
                }
            }

            rota.push(clientesNaoVisitados[indiceProximoCliente]);
            pontoAtual = clientesNaoVisitados[indiceProximoCliente];
            clientesNaoVisitados.splice(indiceProximoCliente, 1);
        }

        return rota;
    }

    calcularDistancia(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
    
}

// Exporta o Objeto para ser usado por outros arquivos
module.exports = new ClienteController();