import * as fs from 'fs';

export class CSVHandler {
    private data: any;
    private csvString: string;
    constructor(data: Object[] = [], csvString: string = '') {
        this.data = data;
        this.csvString = csvString;
    }
    // * SETTERS Y GETTERS
    public setData(data:Object[]): void {
        this.data = data;
    }
    public getData(){
        return this.data;
    }
    public setCSVString(csvString: string): void {
        this.csvString = csvString;
    }
    public getCSVString(): string {
        return this.csvString;
    }
    // * METODOS CORE  de la clase
    public async transformDataToCSVString(
        data: Record<string, any>[] = this.data,
        separator: string = '|'
    ): Promise<string> {
        try {
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
            const result = `${sepLine}${headers}\n${rows}`; // <- ¡Aquí está correctamente cerrado!
            this.csvString = result;
            return result;
        } catch (e) {
            throw e;
        }
    }
    public async parseCsvFile(filePath: string = '', separator: string = '|'): Promise<{headers: string[], data: Record<string, string>[]}> {
        if (this.csvString === '') {
            this.csvString = await fs.promises.readFile(filePath, 'utf-8');
        }
        const [rawHeaderLine, ...lines] = this.csvString.trim().split('\n');
        // Limpiar \r antes de hacer split
        const headerLine = rawHeaderLine.replace(/\r/g, '');
        const headers = headerLine.split(separator).map(h =>
            h.trim().replace(/^"|"$/g, '')
        );
        console.log('Headers:', headers);
        const records = lines.map(line => {
            const values = line.replace(/\r/g, '').split(separator);
            const obj: Record<string, string> = {};
            headers.forEach((header, index) => {
                obj[header] = values[index]?.trim().replace(/^"|"$/g, '') ?? '';
            });
            return obj;
        });
        return { headers, data: records};
    }
    public async getCSVrowCount(filePath: string = ''): Promise<number> {
        if (this.csvString === '') {
            this.csvString = await fs.promises.readFile(filePath, 'utf-8');
        }
        const [rawHeaderLine, ...lines] = this.csvString.trim().split('\n');
        return lines.length; // Retorna el número de líneas, que es el número de registros
    }
}   
