import { Request, Response } from "express";
import prisma from "../db";
import { DateSchema } from "../utils/dateSchema";

async function ResumoVendasPeriodo(req: Request, res: Response) {
    console.log(1)
    const dataInicial = DateSchema.parse(req.body.dataInicial)
    const dataFinal = DateSchema.parse(req.body.dataInicial)
    const relatorio = await prisma.$queryRaw`
select
co."idCompra",
max(co."dataPagamento"),
max(us."nome_completo"),
sum(ic."valor" * ic."quantidade") as valor_total,
count(ic."idProduto") as quantidade_produtos,
sum(ic."quantidade") as quantidade_itens
from
"itemCompra" ic
inner join "compra" co on ic."idCompra" = co."idCompra"
inner join "cliente" cl on co."idCliente" = cl."idCliente"
inner join "usuario" us on cl."idCliente" = us."id"
where 
(co."dataPagamento" >= ${dataInicial} and co."dataPagamento" <= ${dataFinal} )
group by
co."idCompra"
order by
co."dataPagamento" desc`
    if (relatorio == undefined) {
        res.status(500).json({ error: 'Não foi possiível gerar o relatório.' })
    }
    res.status(200).json(relatorio)
}

async function ResumoVendasPorProduto(req: Request, res: Response) {
    console.log(2)
    const dataInicial = DateSchema.parse(req.body.dataInicial)
    const dataFinal = DateSchema.parse(req.body.dataInicial)
    const relatorio = await prisma.$queryRaw`
select
pr."idProduto",
max(pr."nomeProduto"),
max(pr."marca"),
sum(ic.quantidade) as vendas,
sum(ic.valor * ic.quantidade) as receita
from
"itemCompra" ic
inner join "produto" pr on ic."idProduto" = pr."idProduto"
inner join "compra" co on ic."idCompra" = co."idCompra"
where 
(co."dataPagamento" >=  ${dataInicial} and co."dataPagamento" <= ${dataFinal} )
group by
pr."idProduto"
order by
sum(ic.valor * ic.quantidade) desc`
    if (relatorio == undefined) {
        res.status(500).json({ error: 'Não foi possiível gerar o relatório.' })
    }
    res.status(200).json(relatorio)
}

async function ResumoVendasPorCliente(req: Request, res: Response) {
    console.log(3)
    const dataInicial = DateSchema.parse(req.body.dataInicial)
    const dataFinal = DateSchema.parse(req.body.dataInicial)
    const relatorio = await prisma.$queryRaw`
select
cl."idCliente",
max(us."nome_completo"),
count(distinct co."idCompra") as quantidade_compras,
sum(ic."quantidade") as quantidade_itens,
sum(ic."quantidade" * ic."valor") as receita
from
"itemCompra" ic
inner join "compra" co on ic."idCompra" = co."idCompra"
inner join "cliente" cl on co."idCliente" = cl."idCliente"
inner join "usuario" us on us."id" = cl."idCliente"
where 
(co."dataPagamento" >=  ${dataInicial} and co."dataPagamento" <= ${dataFinal} )
group by
cl."idCliente"
order by
sum(ic."quantidade" * ic."valor") desc`
    if (relatorio == undefined) {
        res.status(500).json({ error: 'Não foi possiível gerar o relatório.' })
    }
    res.status(200).json(relatorio)
}
export default { ResumoVendasPeriodo, ResumoVendasPorProduto, ResumoVendasPorCliente }