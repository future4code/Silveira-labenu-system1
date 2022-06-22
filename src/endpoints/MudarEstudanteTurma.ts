import { Request, Response } from "express"
import { StudentDatabase } from "../data/StudentDatabase"


export default async function mudarEstudanteTurma(req: Request, res: Response): Promise<void> {
    try {
        const { turma_id } = req.body

        const atualizar = new StudentDatabase()
        await atualizar.mudarEstudanteTurma(turma_id, req.params.id)
        res.status(201).send("Mudança de turma realizada com sucesso!")
    } catch (error: any) {
        res.status(500).send(error.message)
    }
}