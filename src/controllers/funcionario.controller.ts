import { Request, Response, query } from "express";
import repository from "../repository/repository";

async function get(req: Request, res: Response) {
    const Query = req.newQuery

    if('id' in Query){
        const result = await repository.funcionario.getById(Query.id)
        if (result != undefined){
            result.usuario = await repository.usuario.getById(result.id);
        }
        return res.status(200).json(result)
    }

    if('pagina' in Query && 'limite' in Query){
        const result = await repository.funcionario.getAll({pagina: Query.pagina, limite: Query.limite})
        return res.status(200).json(result)
    }        
}

async function create(req: Request, res: Response) {
    const Body = req.body

    const usuario = await repository.usuario.create(Body.usuario)
    if (usuario != undefined){
        Body.id = usuario.id
        const resultado = await repository.funcionario.create(Body)
        resultado.usuario = usuario
        res.status(200).json(resultado)
    }       
}

async function update(req: Request, res: Response) {
    const Query = req.newQuery
    const Body = req.body

    const usuario = await repository.usuario.update(Body.usuario, Query.id)
    if (usuario != undefined){
    const resultado = await repository.funcionario.update(Body, Query.id)
        resultado.usuario = usuario
        res.status(200).json(resultado)
    }
}

async function Delete(req: Request, res: Response) {
    const Query = req.newQuery
    const funcionario = await repository.funcionario.Delete(Query.id)
    if (funcionario != undefined) {
        funcionario.usuario = await repository.usuario.Delete(Query.id)
        res.status(200).json(funcionario)
    }

}
export default {get, create, update, Delete} 