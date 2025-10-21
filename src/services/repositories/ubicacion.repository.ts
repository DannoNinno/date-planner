import { LocationInterface } from "@/resource/location.interface";
import { CSVHandler } from "@/services/CSVHandler/CSVHandler";
import { getNextId } from "@/services/repositories/nextId.repository"; // tu función getNextId
import * as path from 'path';

export class UbicacionRepository {
    private csvHandler: CSVHandler;
    private csvFilePath: string;
    private counterFilePath: string;

    constructor() {
        this.csvHandler = new CSVHandler();
        const dbFolder = path.join(process.cwd(), 'db'); // fuera de src
        this.csvFilePath = path.join(dbFolder, 'ubicaciones.csv');
        this.counterFilePath = path.join(dbFolder, 'ubicaciones-counter.txt');
    }

    public async AddUbicacion(ubicacionData: Omit<LocationInterface, 'id'>): Promise<number> {
        // 1️⃣ Generar ID
        const id = await getNextId(this.counterFilePath);

        // 2️⃣ Crear fila CSV
        const csvNewRow = `${id}|${ubicacionData.description}|${ubicacionData.latitude}|${ubicacionData.longitude}`;

        // 3️⃣ Leer CSV existente
        await this.csvHandler.parseCsvFile(this.csvFilePath, '|');

        // 4️⃣ Construir CSV completo (agregar headers si estaba vacío)
        const newCSV = this.csvHandler.getCSVString()
            ? this.csvHandler.getCSVString() + '\n' + csvNewRow
            : 'id|description|latitude|longitude\n' + csvNewRow;

        this.csvHandler.setCSVString(newCSV);

        // 5️⃣ Guardar CSV
        await this.csvHandler.saveCSVToFile(this.csvFilePath);

        return id;
    }
}
