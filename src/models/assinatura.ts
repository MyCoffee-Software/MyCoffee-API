import { z } from 'zod'

export const AssinaturaSchema = z.object({
    idAssinatura: z.number().optional(),
    idPlano: z.number(),
    idCliente: z.number(),
    formaPagamento: z.string(),
    enderecoEntrega: z.string(),
    cpfSignatario: z.string(),
    dataInicio: z.date(),
    dataFim: z.date(),
    valor: z.number(),
  });

  export type Assinatura = z.infer<typeof AssinaturaSchema>;