import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/style.css';

function TelaClientes() {
    const [clientes, setClientes] = useState([]);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [coordenadaX, setCoordenadaX] = useState('');
    const [coordenadaY, setCoordenadaY] = useState('');
    const [filtro, setFiltro] = useState('');
    const [mostrarModalCadastrar, setModalCadastrar] = useState(false);
    const [mostrarModalCalcular, setModalCalcular] = useState(false);
    const [rota, setRota] = useState([]);
    const [clienteAtualIndex, setClienteAtualIndex] = useState(0);

    useEffect(() => {
        fetchClientes();
    }, []);

    async function fetchClientes() {
        try {
            const { data } = await axios.get(`http://localhost:3001/clientes`);
            const clientesOrdenados = ordenarClientesPorDistancia(data);
            setClientes(clientesOrdenados);
            setClientes(data);
        } catch (error) {
            console.error('Erro ao carregar clientes:', error);
        }
    }

    // Função para buscar clientes com base nos filtros
    const filtrarClientes = () => clientes.filter(cliente =>
        cliente.nome.toLowerCase().includes(filtro.toLowerCase()) ||
        cliente.email.toLowerCase().includes(filtro.toLowerCase()) ||
        cliente.telefone.includes(filtro)
      );

    async function cadastrarCliente() {
        try {
            const response = await axios.post('http://localhost:3001/cadastrar-cliente', { nome, email, telefone, coordenadaX, coordenadaY });
            setClientes([...clientes, response.data]);
            // Limpar campos após cadastro
            setNome('');
            setEmail('');
            setTelefone('');
            setCoordenadaX('');
            setCoordenadaY('');
            // Fechar o modal após o cadastro
            setModalCadastrar(false);
        } catch (error) {
            console.error('Erro ao cadastrar cliente:', error);
        }
    }

    // Função para calcular a distância Euclidiana até a sede
    function calcularDistancia(x, y) {
        return Math.sqrt(x * x + y * y);
    }

    // Função para ordenar os clientes por distância até a sede
    function ordenarClientesPorDistancia(clientes) {
        return clientes.sort((a, b) => {
            const distA = calcularDistancia(a.coordenada_x, a.coordenada_y);
            const distB = calcularDistancia(b.coordenada_x, b.coordenada_y);
            return distA - distB;
        });
    }

    function fecharModalCadastrar() {
        setModalCadastrar(false);
    }

    function fecharModalCalcular() {
        setModalCalcular(false);
    }

    return (
        <div className='container'>
            <div className='header'>
                <h1 className='header'>
                    <button className='buttonNovo' onClick={() => setModalCalcular(true)}>Calcular Menor Rota</button>
                    <button className='buttonNovo' onClick={() => setModalCadastrar(true)}>Novo Cliente</button>
                </h1>
            </div>
            <div className='modal' style={{ display: mostrarModalCalcular ? 'block' : 'none' }}>
                <div className='modalContent'>
                    <div>
                        <h2>Clientes Ordenados por Menor Distância</h2>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th className='th'>Nome</th>
                                <th className='th'>Email</th>
                                <th className='th'>Telefone</th>
                                <th className='th'>Coordenada X</th>
                                <th className='th'>Coordenada Y</th>
                                <th className='th'>Distância até a Sede</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map(cliente => (
                                <tr key={cliente.id}>
                                    <td className='td'>{cliente.nome}</td>
                                    <td className='td'>{cliente.email}</td>
                                    <td className='td'>{cliente.telefone}</td>
                                    <td className='td'>{cliente.coordenada_x}</td>
                                    <td className='td'>{cliente.coordenada_y}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                    <button onClick={fecharModalCalcular}>Fechar</button>
                </div>
            </div>

                <div className='modal' style={{ display: mostrarModalCadastrar ? 'block' : 'none' }}>
                    <div className='modalContent'>
                        <span className='close' onClick={fecharModalCadastrar}>&times;</span>
                        <h2>Cadastrar Novo Cliente</h2>
                        <form className='form' onSubmit={cadastrarCliente}>
                            <input 
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                className='input'
                                placeholder="Nome"
                            />
                            <input 
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='input'
                                placeholder="Email"
                            />
                            <input 
                                type="text"
                                value={telefone}
                                onChange={(e) => setTelefone(e.target.value)}
                                className='input'
                                placeholder="Telefone"
                            />
                            <input 
                                type="number"
                                value={coordenadaX}
                                onChange={(e) => setCoordenadaX(e.target.value)}
                                className='input'
                                placeholder="Coordenada X"
                            />
                            <input 
                                type="number"
                                value={coordenadaY}
                                onChange={(e) => setCoordenadaY(e.target.value)}
                                className='input'
                                placeholder="Coordenada Y"
                            />
                            <button className='button' type="submit">Cadastrar</button>
                            <button onClick={fecharModalCadastrar}>Cancelar</button>
                        </form>
                    </div>
                </div>
                <div className='filter-container'>
                    <input type="text" placeholder="Busque o cliente" onChange={e => setFiltro(e.target.value)} />
                <div>
                <h2>Lista de Clientes</h2>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th className='th'>Nome</th>
                                <th className='th'>Email</th>
                                <th className='th'>Telefone</th>
                                <th className='th'>Coordenada X</th>
                                <th className='th'>Coordenada Y</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtrarClientes().map(cliente => (
                                <tr key={cliente.id}>
                                    <td className='td'>{cliente.nome}</td>
                                    <td className='td'>{cliente.email}</td>
                                    <td className='td'>{cliente.telefone}</td>
                                    <td className='td'>{cliente.coordenada_x}</td>
                                    <td className='td'>{cliente.coordenada_y}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TelaClientes;