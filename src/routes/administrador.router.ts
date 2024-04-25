import { Request, Response, Router } from "express";

const AdministradorRouter = Router();

AdministradorRouter.get('/', (req: Request, res: Response) => {
    res.send('Olá, você está na controladora Administrador')
})

export default AdministradorRouter;