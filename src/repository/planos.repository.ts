import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PlanoRepository {
  async getAll() {
    return prisma.planoAssinatura.findMany();
  }

  async getById(id: number) {
    return prisma.planoAssinatura.findUnique({ where: { idPlanoAssinatura: id } });
  }

  async create(plano: any) {
    return prisma.planoAssinatura.create({ data: plano });
  }

  async update(id: number, plano: any) {
    return prisma.planoAssinatura.update({
      where: { idPlanoAssinatura: id },
      data: plano,
    });
  }

  async delete(id: number) {
    return prisma.planoAssinatura.delete({ where: { idPlanoAssinatura: id } });
  }
}
