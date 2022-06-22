import { BaseDatabase } from "./BaseDatabase";
import { Request, Response } from "express"
import { Turma } from "../model/Turma";

export class TurmaDatabase extends BaseDatabase {
    public async criarTurma(turma: Turma) {
        try {
            await BaseDatabase.connection('Turma')
                .insert({
                    id: turma.getId(),
                    nome: turma.getNome(),
                    modulo: turma.getModulo()
                })
        } catch (error: any) {
            throw new Error("Error inesperado")
        }
    }

    public async pegarTurmas() {
        try {
            const result = await BaseDatabase.connection("Turma").select("*")
            return result
        } catch (error: any) {
            throw new Error("Error inesperado")
        }
    }

    public async mudarModulo(modulo: string, id: string) {
        try {
            await BaseDatabase.connection('Turma')
            .update({
                modulo: modulo
            })
            .where("id", id)
        } catch (error: any) {
            throw new Error("Error inesperado")
        }
    }
}