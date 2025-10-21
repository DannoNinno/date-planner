import { LocationCoordinates } from "./distancia";

export function extractCoordinatesFromGoogleMapsURL(url: string | null): LocationCoordinates | null {
    let coordinates: LocationCoordinates | null = null;
    if (!url) return null;
    // Patrón 1: @lat,long
    const atPattern = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (atPattern) {
        coordinates = {
            lat: parseFloat(atPattern[1]),
            lon: parseFloat(atPattern[2]),
        }
    }

    // Patrón 2: !3dLAT!4dLONG
    const dPattern = url.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
    if (dPattern) {
        coordinates = {
            lat: parseFloat(dPattern[1]),
            lon: parseFloat(dPattern[2]),
        }
    }

    // Patrón 3: !8m2!3dLAT!4dLONG
    const mPattern = url.match(/!8m2!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
    if (mPattern) {
        coordinates = {
            lat: parseFloat(mPattern[1]),
            lon: parseFloat(mPattern[2]),
        }
    }
    // Si no se encuentra ningún patrón
    return coordinates;
}