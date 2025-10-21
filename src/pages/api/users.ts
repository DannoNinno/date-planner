import type { NextApiRequest, NextApiResponse } from 'next';
import { UserRepository } from '@/services/repositories/user.repository';

const repo = new UserRepository();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
        const userData = req.body; // { id, name, password, location }
        const newId = await repo.AddUser(userData);
        return res.status(201).json({ id: newId });
        } catch (err: any) {
        console.error(err);
        return res.status(500).json({ message: 'Error al agregar usuario', error: err.message });
        }
    }
    res.status(405).json({ message: 'Método no permitido' });
}
