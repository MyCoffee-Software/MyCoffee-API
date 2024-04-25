import { Request, Response, Router } from "express";

const UsuariosRouter = Router();

UsuariosRouter.get('/', (req: Request, res: Response) => {
    res.send('Olá, você está na controladora Usuários')
})

export default UsuariosRouter;