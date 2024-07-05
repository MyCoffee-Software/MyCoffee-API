# ☕ MyCoffee API
##  ✏️ Descrição
Esta é uma aplicação backend desenvolvida em TypeScript. Ela utiliza PostgreSQL como banco de dados e JWT para autenticação.

## ✅ Pré-requisitos
- Node.js
- TypeScript
- PostgreSQL
- Prisma
## 🪛 Instalação
1. Clone o repositório:


``` bash
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_REPOSITORIO>
```
2. Instale as dependências:
```bash
npm install
```
3. Configure as variáveis de ambiente. Crie um arquivo ```.env``` na raiz do projeto com o seguinte conteúdo:
```env
DATABASE_URL=<URL>

API_PORT=3000

JWT_SECRET="SECRET"
JWT_EXPIRATION="50m"

UPLOADS_PATH="../../uploads"
SOBRE_PATH="/descricoes"
SOBRE_FILE_NAME="sobre.html"
CONTATO_PATH="/descricoes/"
CONTATO_FILE_NAME="contato.html"
IMAGEM_USUARIO_PATH="/imagens/usuarios/"
IMAGENS_PRODUTO_PATH="/imagens/produtos"
IMAGENS_PLANO_PATH="/imagens/planos"
```
- `DATABASE_URL`: Caminho do banco de dados PostgreSQL.
- `API_PORT`: Porta que será exposta pela aplicação.
- `JWT_SECRET`: Chave de encoding do token JWT.
- `JWT_EXPIRATION`: Duração da chave JWT.
- Variáveis `*_PATH`: Caminhos dos diretórios onde haverá salvamento de arquivos durante a execução.
4. Gere os arquivos do Prisma:


```bash
npx prisma db pull
npx prisma generate
```
## ▶️ Scripts
- Para iniciar o servidor em modo de desenvolvimento:

```bash
npm run dev
```
- Para iniciar o servidor em modo de produção:

```bash
npm start
```
- Para compilar o projeto TypeScript:

```bash
npm run build
```
## 🏗️ Estrutura do Projeto
- `src/`: Contém o código-fonte da aplicação.
- `dist/`: Contém os arquivos compilados.
- `prisma/`: Contém os arquivos de configuração do Prisma.

## 🎲 Comandos úteis do Prisma
- Sincronizar o banco de dados:

```bash
npx prisma db pull
```
- Gerar o cliente do Prisma:

```bash
npx prisma generate
```
## 📚 Documentação da API
A documentação da API pode ser acessada via endpoint `/api-docs` pela interface Swagger.