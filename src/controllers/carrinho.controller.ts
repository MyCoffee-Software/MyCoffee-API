import { Request, Response } from 'express';
import { Usuario } from '../models/usuario';
import repository from '../repository/repository';

async function adicionarProduto(req: Request, res: Response){
  const User = req.user as Usuario
  const Body = req.body

  const resultado = await repository.itemCarrinho.addItemCarrinho(User.id, Body.idProduto, Body.quantidade)
  
  res.status(200).json({id: resultado})
} 

async function adicionarPlano(req: Request, res: Response){
  const User = req.user as Usuario
  const Body = req.body

  const existePlanoCarrinho = await repository.planoCarrinho.get(User.id)
  if (existePlanoCarrinho) {
    return res.status(409).json({error: 'Ja existe um plano no carrinho'})
  }

  const resultado = await repository.planoCarrinho.addPlanoCarrinho(User.id, Body.idPlano, Body.periodo)

  res.status(200).json(resultado)
}

async function atualizarPlano(req: Request, res: Response){
  
  const User = req.user as Usuario
  const Body = req.body

  await repository.planoCarrinho.Delete(User.id)

  const resultado = await repository.planoCarrinho.addPlanoCarrinho(User.id, Body.idPlano, Body.periodo)

  res.status(200).json(resultado)
}
export default {adicionarProduto, adicionarPlano, atualizarPlano}