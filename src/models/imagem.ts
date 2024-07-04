import { z } from "zod";

/**
 * @swagger
 * components:
 *   schemas:
 *     Imagem:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome do arquivo
 *           example: "Imagem.jpg"
 *         imagem:
 *           type: string
 *           description: Base64 da imagem
 */

export const ImagemSchema = z.object({
    nome: z.string(),
    imagem: z.string()
})

export type Imagem = z.infer<typeof ImagemSchema>;