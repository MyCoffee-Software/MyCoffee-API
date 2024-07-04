import prisma from '../db'
import { itemCarrinhoOutput } from '../models/carrinho'
import repository from './repository'

async function get(idCliente: number): Promise<itemCarrinhoOutput[]> {
  const queryResult = await prisma.itemCarrinho.findMany({
    where: {
      idCliente
    },
    include: {
      produto: true
    }
  })

  if (queryResult != undefined) {
    const itensCarrinho: itemCarrinhoOutput[] = await Promise.all(queryResult.map(async (r) => {
      const itemCarrinho: itemCarrinhoOutput = {
        idProduto: Number(r.produto.idProduto),
        nome: r.produto.nomeProduto,
        descricao: r.produto.descricaoProduto,
        marca: r.produto.marca,
        preco: r.produto.preco,
        quantidade: Number(r.quantidade),
        codigo_de_barras: r.produto.codigoDeBarras,
        subTotal: 0,
        total: 0,
      }

      itemCarrinho.subTotal = itemCarrinho.preco * itemCarrinho.quantidade

      itemCarrinho.categorias = await repository.produtoCategoria.getByProduto(itemCarrinho.idProduto)

      itemCarrinho.descontos.produto = {
        porcentual: r.produto.descontoPorcentualProduto,
        real: itemCarrinho.preco * r.produto.descontoPorcentualProduto / 100
      }

      const assinaturaVigente = await repository.assinatura.getVigente(idCliente)
      if (assinaturaVigente != undefined){
        const categoriasContempladas = await repository.planoCategoria.getByPlano(assinaturaVigente.idPlano)
        const idsCategoriasContempladas = categoriasContempladas.map((c) => c.id);
        const idsCategoriasProduto = itemCarrinho.categorias.map((c) => c.id);
        const idContemplado = idsCategoriasContempladas.find((id) => idsCategoriasProduto.includes);

        if (idContemplado != undefined){
          const plano = await repository.plano.getById(assinaturaVigente.idPlano)
          itemCarrinho.descontos.plano = {
            porcentual: plano.desconto,
            real: itemCarrinho.preco * plano.desconto / 100
          }
        }
        
      }

      const descontoRealPlano = itemCarrinho.descontos.plano.real? itemCarrinho.descontos.plano.real: 0
      const descontoRealProduto = itemCarrinho.descontos.produto.real? itemCarrinho.descontos.produto.real: 0 

      itemCarrinho.descontos.descontosTotais = descontoRealPlano + descontoRealProduto

      return itemCarrinho
    }))

    return itensCarrinho
  }
}

async function addItemCarrinho(idCliente: number, idProduto: number, quantidade: number): Promise<{idProduto: number, quantidade: number}> {
  const queryResult = await prisma.itemCarrinho.findUnique({
    where: {
      idCliente_idProduto: {
        idCliente,
        idProduto
      }
    }
  })

  if (queryResult != undefined) { 
    if(Number(queryResult.quantidade) + quantidade > 0){   
      const updateResult = await prisma.itemCarrinho.update({
        where: {
          idCliente_idProduto: {
            idCliente,
            idProduto
          }
        },
        data: {
          quantidade: Number(queryResult.quantidade) + quantidade
        }
      })
  
      return {
        idProduto: Number(updateResult.idProduto),
        quantidade: Number(updateResult.quantidade)
      }
    } else {
      const deleteResult = await prisma.itemCarrinho.delete({
        where: {
          idCliente_idProduto: {
            idCliente,
            idProduto
          }
        }
      })

      return {
        idProduto,
        quantidade: 0
      }
    }
  } else {
    const insertResult = await prisma.itemCarrinho.create({
      data: {
        idCliente,
        idProduto,
        quantidade
      }
    })

    return {
      idProduto: Number(insertResult.idProduto),
      quantidade: Number(insertResult.quantidade)
    }
 }
}

export default {addItemCarrinho, get}