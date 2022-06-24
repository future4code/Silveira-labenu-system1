import { BaseDatabase } from "./BaseDatabase";
import { Request, Response } from "express"
import { Estudante, Hobby } from "../model/Estudante";


const convertDate = (date: string): string => {
    const arrDate = date.split("/")
    return `${arrDate[2]}-${arrDate[1]}-${arrDate[0]}`
}
// const getDayMonth = (date:string): string =>{
    
// }

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
            throw new Error("Error inesperado")
        }
    }

    public async estudantePorSigno(data_nasc: string) {
        try {
            const signos = ["Áries", "Touro", "Gêmeos", "Câncer", "Leão", "Virgem", "Libra", "Escorpião", "Sagitário", "Capricórnio", "Aquário", "Peixes"]

            const result = await BaseDatabase.connection("Estudante")
                .select("*")
                .where("data_nasc", data_nasc)
            // return result

            const filtrando = result.filter((estudante) => {
                while(data_nasc) {
            
                    if (estudante.data_nasc === "1960-03-22") {
                        return signos[0]
                    } else if (estudante.data_nasc === "1960-05-05") {
                        return signos[1]
                    } else if (estudante.data_nasc === "1960-05-04") {
                        return signos[2]
                    }
                }
            })
            return filtrando
            // const data = data_nasc
            // const filtroSignos = result.filter((estudante) => {
            //     if (estudante.data_nasc === data) {
            //         return estudante
            //     }
            // })
            // return filtroSignos
        } catch (error: any) {
            console.log(error.sqlMessage || error.message)
            throw new Error("Error inesperado")
        }
    }
}
