import * as fs from 'fs';
import * as path from 'path';

export class CSVHandler {
    private data: any[];
    private csvString: string;

    constructor(data: any[] = [], csvString: string = '') {
        this.data = data;
        this.csvString = csvString;
    }

    // * SETTERS Y GETTERS
    public setData(data: any[]): void {
        this.data = data;
    }
    public getData(): any[] {
        return this.data;
    }
    public setCSVString(csvString: string): void {
        this.csvString = csvString;
    }
    public getCSVString(): string {
        return this.csvString;
    }

    // * METODOS CORE de la clase
    public async transformDataToCSVString(
        data: any[] = this.data,
        separator: string = '|'
    ): Promise<string> {
        if (!data || data.length === 0) {
        throw new Error('La clase no tiene cargada data para la transformación a CSV');
        }
        const keys = Object.keys(data[0]);
        const headers = keys.join(separator);
        const rows = data
        .map(item =>
            keys
            .map(key => `"${String(item[key]).replace(/"/g, '""')}"`)
            .join(separator)
        )
        .join('\n');

        const sepLine = separator === "|" ? "sep=|\n" : "";
        const result = `${sepLine}${headers}\n${rows}`;
        this.csvString = result;
        return result;
    }

    public async parseCsvFile(filePath: string = '', separator: string = '|'): Promise<{ headers: string[], data: Record<string, string>[] }> {
        console.log('Parsing CSV file:', filePath);
        if (this.csvString === '') {
        // Crear carpeta si no existe
        const folderPath = path.dirname(filePath);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        // Crear archivo vacío si no existe
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, '', 'utf-8');
        }

        this.csvString = await fs.promises.readFile(filePath, 'utf-8');
        }

        const [rawHeaderLine, ...lines] = this.csvString.trim().split('\n');
        const headers = rawHeaderLine
        ? rawHeaderLine.replace(/\r/g, '').split(separator).map(h => h.trim().replace(/^"|"$/g, ''))
        : [];

        const records = lines.map(line => {
        const values = line.replace(/\r/g, '').split(separator);
        const obj: Record<string, string> = {};
        headers.forEach((header, index) => {
            obj[header] = values[index]?.trim().replace(/^"|"$/g, '') ?? '';
        });
        return obj;
        });

        return { headers, data: records };
    }

    public async getCSVrowCount(filePath: string = ''): Promise<number> {
        if (this.csvString === '') {
        // Crear carpeta y archivo si no existen
        const folderPath = path.dirname(filePath);
        if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });
        if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '', 'utf-8');

        this.csvString = await fs.promises.readFile(filePath, 'utf-8');
        }
        const [, ...lines] = this.csvString.trim().split('\n');
        return lines.length;
    }

    public async saveCSVToFile(filePath: string): Promise<void> {
        if (this.csvString === '') {
        throw new Error('No hay datos CSV para guardar.');
        }

        // Crear carpeta si no existe
        const folderPath = path.dirname(filePath);
        if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        }

        await fs.promises.writeFile(filePath, this.csvString, 'utf-8');
    }
}
