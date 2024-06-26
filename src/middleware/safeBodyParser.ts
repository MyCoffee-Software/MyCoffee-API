import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export default (schema: z.ZodObject<any> | z.ZodSchema<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const body = req.body

        const safeParse = schema.safeParse(body) 

        if (!safeParse.success){
            return res.status(400).json(safeParse.error.errors)
        }

        return next()
    }
}