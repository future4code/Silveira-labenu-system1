import { Request, Response } from "express"
import { StudentDatabase } from "../data/StudentDatabase"


export default async function buscarEstudantes(req: Request, res: Response): Promise<void> {
    try {
        const nome = req.query.nome as string
        const turma = new StudentDatabase()
        res.status(201).send(await turma.pegarEstudantes(nome))
    } catch (error: any) {
        res.status(500).send(error.message)
    }
}
