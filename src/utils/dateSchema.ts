import { z } from "zod";



export const DateStringSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "A data deve estar no formato AAAA-MM-DD",
})

export const DateSchema = DateStringSchema.transform((dateString) => {
    const date = new Date(dateString)
    if (isNaN(date.getTime())){
        throw new Error("Data inválida")
    }

    return date;
})