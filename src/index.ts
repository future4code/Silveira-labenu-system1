import { Request, Response } from "express"
import { app } from "./app"
import criarTurma from "./endpoints/CriarTurma"
import buscarTurmas from "./endpoints/BuscarTurmas"
import mudarModulo from "./endpoints/MudarModulo"
import criarEstudante from "./endpoints/CriarEstudante"
import buscarEstudantes from "./endpoints/BuscarEstudantes"
import mudarEstudanteTurma from "./endpoints/MudarEstudanteTurma"

app.post("/criarturma", criarTurma)
app.get("/buscarturma", buscarTurmas)
app.put("/mudarmodulo/:id", mudarModulo)

app.post("/criarestudante", criarEstudante)
app.get("/buscaestudante", buscarEstudantes)
app.put("/mudarestudanteturma/:id", mudarEstudanteTurma)
app.post("/relacionarhobbyestudante", )

app.post("/criardocente", )
app.get("/buscardocentes", )
app.put("/mudardocenteturma", )
