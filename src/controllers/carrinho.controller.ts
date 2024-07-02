import { Request, Response } from 'express';
import { Usuario } from '../models/usuario';
import repository from '../repository/repository';

async function adicionarProduto(req: Request, res: Response){
  const User = req.user as Usuario
  const Body = req.body

  const resultado = await repository.itemCarrinho.addItemCarrinho(User.id, Body.idProduto, Body.quantidade)
  
  res.status(200).json({id: resultado})
} 

export default {adicionarProduto}