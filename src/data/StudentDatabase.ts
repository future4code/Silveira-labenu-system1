import { BaseDatabase } from "./BaseDatabase";
import { Request, Response } from "express"
import { Estudante, Hobby } from "../model/Estudante";


const convertDate = (date:string):string =>{
    const arrDate = date.split("/")
    return `${arrDate[2]}-${arrDate[1]}-${arrDate[0]}`
}

export class StudentDatabase extends BaseDatabase {
    public async criarEstudante(estudante: Estudante) {
        try {
            await BaseDatabase.connection('Estudante')
                .insert({
                    id: estudante.getId(),
                    nome: estudante.getNome(),
                    email: estudante.getEmail(),
                    data_nasc: convertDate(estudante.getDataNasc()),
                    turma_id: estudante.getTurmaId()
                })
                await BaseDatabase.connection('Hobby')
                .insert({
                    id: Date.now().toString(),
                    nome: estudante.getHobby()
                })    
        } catch (error: any) {
            console.log(error.sqlMessage)
            throw new Error("Error inesperado")
        }
    }

    public async pegarEstudantes(nome: string) {
        try {
            const result = await BaseDatabase.connection("Estudante").select("*").where("nome", "LIKE", nome)
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

    public async addHobby(hobby: Hobby[]) {
        try {
            
        } catch (error:any) {
            
        }
    }
}
