import { UserInterface } from "@/resource/user.interface";
import { CSVHandler } from "@/services/CSVHandler/CSVHandler";
import { getNextId } from "./nextId.repository";
import * as path from 'path';

export class UserRepository {
    private csvHandler: CSVHandler;
    private csvFilePath: string;
    private counterFilePath: string;

    constructor() {
        this.csvHandler = new CSVHandler();
        const dbFolder = path.join(process.cwd(), 'db'); // carpeta db fuera de src
        this.csvFilePath = path.join(dbFolder, 'users.csv');
        this.counterFilePath = path.join(dbFolder, 'users-counter.txt');
    }

    public async AddUser(userData: Omit<UserInterface, 'id'>): Promise<number> {
        const id = await getNextId(this.counterFilePath);

        await this.csvHandler.parseCsvFile(this.csvFilePath, '|');

        const csvRow = `${id}|${userData.name}|${userData.password}|${userData.location}`;

        const newCSV = this.csvHandler.getCSVString()
            ? this.csvHandler.getCSVString() + '\n' + csvRow
            : 'id|name|password|location\n' + csvRow;

        this.csvHandler.setCSVString(newCSV);
        await this.csvHandler.saveCSVToFile(this.csvFilePath);

        return id;
    }
}

