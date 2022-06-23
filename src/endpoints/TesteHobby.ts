// const hobbyParaEstudante = async (
//     estudante_id: string,
//     hobby_id: string
// ) => {
//     await connection
//         .insert({
//             estudante_id: estudante_id,
//             hobby_id: hobby_id
//         })
//         .into("Estudante_hobby")
// }

// const getHobby: any = async (hobby_id: string) => {
//     const resultado await connection 
//     .select("id", "nome")
//     .from("Hobby")
//     .where("Hobby.id", hobby_id)
// }

// const pegarHobby = async (req: Request, res: Response) => {
//     try {
//         const { estudante_id, hobby_id } = req.body
//         const resultado = await getHobby(hobby_id)

//         await hobbyParaEstudante(
//             estudante_id,
//             hobby_id
//         )
//         res.status(200).send({ message: "Hobby adicionado ao Estudante!" });
//     } catch (error: any) {
//         throw new Error("Erro")
//     }
// }