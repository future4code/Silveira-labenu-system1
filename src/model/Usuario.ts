export class Usuario {
    constructor(
        private id: string,
        private nome: string,
        private email: string,
        private data_nasc: string,
        private turma_id: string
    ) { }
    public getId() {
        return this.id
    }
    public getNome() {
        return this.nome
    }
    public getEmail() {
        return this.email
    }
    public getDataNasc() {
        return this.data_nasc
    }
    public getTurmaId() {
        return this.turma_id
    }
}