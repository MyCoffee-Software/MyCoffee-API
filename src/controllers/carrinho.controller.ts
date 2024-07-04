import { Request, Response } from 'express';
import { Usuario } from '../models/usuario';
import repository from '../repository/repository';
import { Carrinho } from '../models/carrinho';
import { ItemCarrinho } from '../models/itemCarrinho';

async function get(req: Request, res: Response){
  const User = req.user as Usuario

  const carrinho: Carrinho = {
    produtos: await repository.itemCarrinho.get(User.id),
    plano: await repository.planoCarrinho.get(User.id),
    total: 0
  }

  carrinho.total = carrinho.produtos.reduce((total, item) => {return total + item.total}, 0) + carrinho.plano?.total

  res.status(200).json(carrinho)
}

async function adicionarProduto(req: Request, res: Response){
  const User = req.user as Usuario
  const Body = req.body

  const resultado = await repository.itemCarrinho.addItemCarrinho(User.id, Body.idProduto, Body.quantidade)
  
  res.status(200).json({id: resultado})
} 

async function atualizarProduto(req: Request, res: Response){
  const User = req.user as Usuario
  const Body = req.body as ItemCarrinho[]

  await repository.itemCarrinho.DeleteByUser(User.id)

  const resultado = await Promise.all(Body.map((i) => repository.itemCarrinho.addItemCarrinho(User.id, i.idProduto, i.quantidade)))

  res.status(200).json(resultado)
}

async function adicionarPlano(req: Request, res: Response){
  const User = req.user as Usuario
  const Body = req.body

  const existePlanoCarrinho = await repository.planoCarrinho.exists(User.id)
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
export default {adicionarProduto, atualizarProduto, adicionarPlano, atualizarPlano, get}