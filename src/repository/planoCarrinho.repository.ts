import prisma from '../db';
import { Periodo } from '../models/periodo';
import { PlanoCarrinho } from '../models/planoCarrinho';

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

async function get(idCliente: number): Promise<PlanoCarrinho> {
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
  
      return planoCarrinho
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
export default {addPlanoCarrinho, get, Delete}