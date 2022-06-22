import { Usuario } from './Usuario'

type Especialidade = {
    nome:"JS" | "CSS" | "React" | "Typescript" | "POO"
}

export class Docente extends Usuario {
    private especialidade:Especialidade[] = []

    constructor(
        id: string,
        name: string,
        email: string,
        data_nasc: string,
        turma_id: string,
    ) {
        super(id, name, email, data_nasc, turma_id)
    }
    public getEspecialidade(): Especialidade[] {
        return this.especialidade
    }
}