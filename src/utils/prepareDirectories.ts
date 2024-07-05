import path from 'path'
import fs from 'fs'

export default () => {
    const UPLOADS_PATH = process.env.UPLOADS_PATH
    const SOBRE_PATH = process.env.SOBRE_PATH
    const CONTATO_PATH = process.env.CONTATO_PATH
    const IMAGEM_USUARIO_PATH = process.env.IMAGEM_USUARIO_PATH
    const IMAGENS_PRODUTO_PATH = process.env.IMAGENS_PRODUTO_PATH
    const IMAGENS_PLANO_PATH = process.env.IMAGENS_PLANO_PATH
    
    const uploadPath = path.join(path.resolve(__dirname), UPLOADS_PATH)
    const uploadPaths = []
    uploadPaths.push(path.join(uploadPath, '/temp'))
    uploadPaths.push(path.join(uploadPath, SOBRE_PATH))
    uploadPaths.push(path.join(uploadPath, CONTATO_PATH))
    uploadPaths.push(path.join(uploadPath, IMAGEM_USUARIO_PATH))
    uploadPaths.push(path.join(uploadPath, IMAGENS_PRODUTO_PATH))
    uploadPaths.push(path.join(uploadPath, IMAGENS_PLANO_PATH))

    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath)
    }

    uploadPaths.forEach((uploadPath) => {
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, {recursive: true})
        }
    })
}