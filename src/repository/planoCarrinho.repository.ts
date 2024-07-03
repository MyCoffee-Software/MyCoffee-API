import prisma from '../db';
import { PlanoCarrinhoOutput } from '../models/carrinho';
import { Periodo } from '../models/periodo';
import { PlanoCarrinho } from '../models/planoCarrinho';
import repository from './repository';

async function get(idCliente: number): Promise<PlanoCarrinhoOutput> {
  const queryResult = await prisma.planoCarrinho.findUnique({
    include: {planoAssinatura: true},
    where: {
      idCliente
    }
  })

  if (queryResult != undefined) {
    const planoCarrinho: PlanoCarrinhoOutput = {
      idPlano: Number(queryResult.planoAssinatura.idPlanoAssinatura),
      nome: queryResult.planoAssinatura.nomePlanoAssinatura,
      descricao: queryResult.planoAssinatura.descricao,
      ativo: queryResult.planoAssinatura.ativo,
      precoMensal: Number(queryResult.planoAssinatura.precoMensal),
      precoAnual: Number(queryResult.planoAssinatura.precoAnual),
      desconto: Number(queryResult.planoAssinatura.descontoPorcentual),
      periodo: queryResult.periodo as Periodo,
      categorias: [],
      total: 0
    }  

    planoCarrinho.categorias = await repository.planoCategoria.getByPlano(planoCarrinho.idPlano)
    planoCarrinho.total = planoCarrinho.periodo == 'Mensal' ? planoCarrinho.precoMensal : planoCarrinho.precoAnual

    return planoCarrinho
  }

  return undefined
}

async function addPlanoCarrinho(idCliente: number, idPlano: number, periodo: string): Promise<PlanoCarrinho> {
  const queryResult = await prisma.planoCarrinho.create({
    data: {
      idCliente,
      idPlano,
      periodo
    }
  })

  if (queryResult != undefined) {
    const planoCarrinho: PlanoCarrinho = {
      idCliente: Number(queryResult.idCliente),
      idPlano: Number(queryResult.idPlano),
      periodo: queryResult.periodo as Periodo
    }
  
    return planoCarrinho
  }

}

async function exists(idCliente: number): Promise<Boolean> {
  const queryResult = await prisma.planoCarrinho.findUnique({
    where: {
      idCliente
    }
  })

  if (queryResult != undefined) {
    const planoCarrinho: PlanoCarrinho = {
      idCliente: Number(queryResult.idCliente),
      idPlano: Number(queryResult.idPlano),
      periodo: queryResult.periodo as Periodo
    }
  
    return (planoCarrinho != undefined)
  }
}

async function Delete(idCliente: number): Promise<PlanoCarrinho> {
  const queryResult = await prisma.planoCarrinho.delete({
    where: {
      idCliente
    }
  })

  if (queryResult != undefined) {
    const planoCarrinho: PlanoCarrinho = {
      idCliente: Number(queryResult.idCliente),
      idPlano: Number(queryResult.idPlano),
      periodo: queryResult.periodo as Periodo
    }
  
      return planoCarrinho
  }
}
export default {addPlanoCarrinho, get, Delete, exists}