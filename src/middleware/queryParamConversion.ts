import { NextFunction, Request, Response, query } from "express";

type queryType = 'bigint' | 'int' | 'string'

export default (queryTypeMap: {[param: string ]:queryType }) => {
    return (req: Request, res: Response, next: NextFunction) => {
        req.newQuery = {}
        for (const param in req.query){
            if (queryTypeMap[param]){
                switch (queryTypeMap[param]){
                    
                    case "bigint":
                        let bigint = Number(req.query[param])
                        if (isNaN(bigint)){
                            return res.status(400).json({ error: `Valor inválido para o parâmetro ${param}`})
                        } 
                        req.newQuery[param] = BigInt(bigint)
                        break;
                    case "int":
                        let number = Number(req.query[param])
                        if (isNaN(number)){
                            return res.status(400).json({ error: `Valor inválido para o parâmetro ${param}`})
                        } 
                        req.newQuery[param] = (number)
                        break;
                    case "string":
                        let string = req.query[param]
                        req.newQuery[param] = string
                        break;
                }
            }
        }

        next()
    }
} 