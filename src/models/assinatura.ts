import { z } from 'zod'
import { DateSchema } from '../utils/dateSchema';

export const AssinaturaSchema = z.object({
    idAssinatura: z.number().optional(),
    idPlano: z.number(),
    idCliente: z.number(),
    formaPagamento: z.string(),
    enderecoEntrega: z.string(),
    cpfSignatario: z.string(),
    dataInicio: DateSchema,
    dataFim: DateSchema,
    valor: z.number(),
  });

  export type Assinatura = z.infer<typeof AssinaturaSchema>;