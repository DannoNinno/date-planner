import type { NextApiRequest, NextApiResponse } from 'next';
import { UbicacionRepository } from '@/services/repositories/ubicacion.repository';

const repo = new UbicacionRepository();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
        const ubicacionData = req.body; // { description, latitude, longitude }
        const newId = await repo.AddUbicacion(ubicacionData);
        return res.status(201).json({ id: newId });
        } catch (err: any) {
        console.error(err);
        return res.status(500).json({ message: 'Error al agregar ubicación', error: err.message });
        }
    }
    res.status(405).json({ message: 'Método no permitido' });
}
