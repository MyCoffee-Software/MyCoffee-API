import { Usuario } from "../models/usuario";

declare module 'express' {
    interface Request {
        user?: Usuario
        newQuery?: any
    }
}