import path from 'path';
import fs from 'fs';

const UPLOADS_PATH = process.env.UPLOADS_PATH;
export default () => {
    const tempDir = path.join(__dirname, UPLOADS_PATH, '/temp');

    fs.readdir(tempDir, (err, files) => {
        if (err) {
            console.error('Erro ao ler diretório temp:', err);
            return;
        }

        // Deletar cada arquivo na pasta temp
        files.forEach((file) => {
            const filePath = path.join(tempDir, file);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Erro ao deletar arquivo:', err);
                    return;
                }
                console.log(`Arquivo ${file} deletado.`);
            });
        });
    });
};