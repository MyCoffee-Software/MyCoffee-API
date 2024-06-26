import { Request, Response, Router } from "express";
import { PlanoRepository } from "../repository/planos.repository";

const PlanosRouter = Router();
const planoRepository = new PlanoRepository();

/**
 * @swagger
 * tags:
 *   name: Planos
 *   description: API para gerenciar planos de assinatura
 */

/**
 * @swagger
 * /planos:
 *   get:
 *     summary: Retorna todos os planos
 *     tags: [Planos]
 *     responses:
 *       200:
 *         description: Lista de planos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Plano'
 */
PlanosRouter.get('/', async (req: Request, res: Response) => {
    try {
        const planos = await planoRepository.getAll();
        res.json(planos);
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

/**
 * @swagger
 * /planos/{id}:
 *   get:
 *     summary: Retorna um plano pelo ID
 *     tags: [Planos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do plano
 *     responses:
 *       200:
 *         description: Plano encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plano'
 *       404:
 *         description: Plano não encontrado
 */
PlanosRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const plano = await planoRepository.getById(Number(id));
        if (plano) {
            res.json(plano);
        } else {
            res.status(404).json({ error: 'Plano não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

/**
 * @swagger
 * /planos:
 *   post:
 *     summary: Cria um novo plano
 *     tags: [Planos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Plano'
 *     responses:
 *       201:
 *         description: Plano criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plano'
 *       500:
 *         description: Erro interno do servidor
 */
PlanosRouter.post('/', async (req: Request, res: Response) => {
    try {
        const plano = req.body;
        const novoPlano = await planoRepository.create(plano);
        res.status(201).json(novoPlano);
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

/**
 * @swagger
 * /planos/{id}:
 *   put:
 *     summary: Atualiza um plano existente
 *     tags: [Planos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do plano
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Plano'
 *     responses:
 *       200:
 *         description: Plano atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plano'
 *       404:
 *         description: Plano não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
PlanosRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const plano = req.body;
        const planoAtualizado = await planoRepository.update(Number(id), plano);
        if (planoAtualizado) {
            res.json(planoAtualizado);
        } else {
            res.status(404).json({ error: 'Plano não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

/**
 * @swagger
 * /planos/{id}:
 *   delete:
 *     summary: Deleta um plano pelo ID
 *     tags: [Planos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do plano
 *     responses:
 *       200:
 *         description: Plano deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plano'
 *       404:
 *         description: Plano não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
PlanosRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const planoDeletado = await planoRepository.delete(Number(id));
        if (planoDeletado) {
            res.json(planoDeletado);
        } else {
            res.status(404).json({ error: 'Plano não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

export default PlanosRouter;
