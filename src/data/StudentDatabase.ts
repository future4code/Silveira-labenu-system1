import { BaseDatabase } from "./BaseDatabase";
import { Request, Response } from "express"
import { Estudante, Hobby } from "../model/Estudante";


const convertDate = (date: string): string => {
    const arrDate = date.split("/")
    return `${arrDate[2]}-${arrDate[1]}-${arrDate[0]}`
}

export class StudentDatabase extends BaseDatabase {
    public async criarEstudante(estudante: Estudante) {
        try {
            const hobbies = estudante.getHobby()

            const hobbyId = (): string => {
                return Date.now().toString()
            }

            const estudanteHobbyId = (): string => {
                return Date.now().toString()
            }

            await BaseDatabase.connection('Estudante')
                .insert({
                    id: estudante.getId(),
                    nome: estudante.getNome(),
                    email: estudante.getEmail(),
                    data_nasc: convertDate(estudante.getDataNasc()),
                    turma_id: estudante.getTurmaId()
                })

            for (let hobby of hobbies) {
                const id = hobbyId()

                await BaseDatabase.connection('Hobby')
                    .insert({
                        id: id,
                        nome: hobby.nome
                    })

                await StudentDatabase.connection('Estudante_hobby')
                    .insert({
                        id: estudanteHobbyId(),
                        estudante_id: estudante.getId(),
                        hobby_id: id
                    })
            }
        } catch (error: any) {
            console.log(error.sqlMessage)
            throw new Error("Error inesperado")
        }
    }

    public async pegarEstudantes(nome: string) {
        try {
            const result = await BaseDatabase.connection("Estudante")
                .select("Estudante.nome as nomeDoEstudante", "Estudante.email", "Estudante.data_nasc", "Estudante.turma_id", "Hobby.nome as hobby")
                .from("Estudante_hobby")
                .join("Estudante", "Estudante.id", "Estudante_hobby.estudante_id")
                .join("Hobby", "Hobby.id", "Estudante_hobby.hobby_id")
                .where("Estudante.nome", "LIKE", nome)
            return result
        } catch (error: any) {
            console.log(error.sqlMessage)
            throw new Error("Error inesperado")
        }
    }

    public async mudarEstudanteTurma(turma_id: string, id: string) {
        try {
            await BaseDatabase.connection('Estudante')
                .update({
                    turma_id: turma_id
                })
                .where("id", id)
        } catch (error: any) {
            throw new Error("Error inesperado")
        }
    }

    public async estudantesMesmoHobby(hobby: string) {
        try {
            const result = await BaseDatabase.connection("Estudante")
                .select("Estudante.nome as nomeDoEstudante", "Estudante.email", "Estudante.data_nasc", "Estudante.turma_id", "Hobby.nome as HobbyNome")
                .from("Estudante_hobby")
                .join("Estudante", "Estudante.id", "Estudante_hobby.estudante_id")
                .join("Hobby", "Hobby.id", "Estudante_hobby.hobby_id")
                .where("Hobby.nome", "LIKE", hobby)
            return result
        } catch (error: any) {
            console.log(error.sqlMessage || error.messag)
            throw new Error("Error inesperado")
        }
    }
}
