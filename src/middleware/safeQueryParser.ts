import { NextFunction, Request, Response } from "express";
import { z } from 'zod'

export default (schema: z.ZodObject<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const Query = req.newQuery ? req.newQuery : req.query

        const safeParse = schema.safeParse(Query)

        if (!safeParse.success){
            return res.status(400).json(safeParse.error.errors)
        } else {
            return next()
        }
    }
}