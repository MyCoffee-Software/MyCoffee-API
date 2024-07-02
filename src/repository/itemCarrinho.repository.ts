import prisma from '../db'

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

export default {addItemCarrinho}