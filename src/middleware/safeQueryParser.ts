import { NextFunction, Request, Response } from "express";
import { z } from 'zod'

export default (schema: z.ZodObject<any> | z.ZodUnion<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const Query = req.newQuery ? req.newQuery : req.query
        console.log('aqui', Query);

        const safeParse = schema.safeParse(Query)

        if (!safeParse.success){
            return res.status(400).json(safeParse.error.errors)
        } else {
            return next()
        }
    }
}