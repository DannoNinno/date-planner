import * as fs from 'fs';
import * as path from 'path';

export async function getNextId(counterFilePath: string): Promise<number> {
    const folderPath = path.dirname(counterFilePath);

    // Crear carpeta si no existe
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    // Crear archivo si no existe e inicializar en 0
    if (!fs.existsSync(counterFilePath)) {
        fs.writeFileSync(counterFilePath, '0', 'utf-8');
    }

    // Leer el número actual
    const counterStr = await fs.promises.readFile(counterFilePath, 'utf-8');
    let counter = parseInt(counterStr, 10) || 0;
    console.log('Valor actual:', counter);

    // Incrementar y guardar
    await fs.promises.writeFile(counterFilePath, String(counter + 1), 'utf-8');

    return counter;
}
