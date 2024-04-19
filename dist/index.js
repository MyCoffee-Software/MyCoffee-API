"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const produtos_1 = __importDefault(require("./routes/produtos"));
const swagger_1 = __importDefault(require("./swagger"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
console.log('olá mundo');
app.get('/', (req, res) => {
    res.send('Olá, Mundo');
});
app.use('/pedidos', produtos_1.default);
app.use(swagger_1.default);
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
