import { Request, Response } from "express"
import { DocenteDatabase } from "../data/DocenteDatabase"
import { Docente } from "../model/Docente"


export default async function criarDocente(req: Request, res: Response): Promise<void> {
    try {
        const { nome, email, data_nasc, turma_id, especialidade } = req.body
        const id = Date.now().toString()

        const docente = new Docente(id, nome, email, data_nasc, turma_id, especialidade)
        const docenteDB = new DocenteDatabase()
        await docenteDB.criarDocente(docente)

        res.status(201).send("Docente criado com sucesso!")

    } catch (error:any) {
        res.status(500).send(error.message)
    }


}