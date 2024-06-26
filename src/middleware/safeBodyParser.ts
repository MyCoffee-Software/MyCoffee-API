import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export default (schema: z.ZodObject<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const body = req.body

        const safeParse = schema.safeParse(body) 

        console.log(safeParse.success)

        if (!safeParse.success){
            return res.status(400).json(safeParse.error.errors)
        }

        return next()
    }
}