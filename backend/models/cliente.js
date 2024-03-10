// Definição dos atributos do objeto Cliente e seus métogos get e set
class Cliente {
    constructor(id, nome, email, telefone, coordenada_x, coordenada_y) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.coordenada_x = coordenada_x;
        this.coordenada_y = coordenada_y;
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getNome() {
        return this.nome;
    }

    setNome(nome) {
        this.nome = nome;
    }

    getEmail() {
        return this.email;
    }

    setEmail(email) {
        this.email = email;
    }

    getTelefone() {
        return this.telefone;
    }

    setTelefone(telefone) {
        this.telefone = telefone;
    }

    getCoordenada_x() {
        return this.coordenada_x;
    }

    setCoordenada_x(coordenada_x) {
        this.coordenada_x = coordenada_x;
    }

    getCoordenada_y() {
        return this.coordenada_y;
    }

    setCoordenada_y(coordenada_y) {
        this.coordenada_y = coordenada_y;
    }
}

// Exporta o Objeto para ser usado por outros arquivos
module.exports = Cliente;