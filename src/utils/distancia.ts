// Interfaz para representar una ubicación geográfica
export interface LocationCoordinates {
    lat: number;
    lon: number;
}

// Función para calcular la distancia en línea recta (en kilómetros)
export function calculateDistance(loc1: LocationCoordinates, loc2: LocationCoordinates): number {
    const R = 6371; // Radio de la Tierra en km
    const toRadians = (degrees: number) => degrees * (Math.PI / 180);

    const dLat = toRadians(loc2.lat - loc1.lat);
    const dLon = toRadians(loc2.lon - loc1.lon);

    const lat1Rad = toRadians(loc1.lat);
    const lat2Rad = toRadians(loc2.lat);

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}