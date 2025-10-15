'use client';

import { calculateDistance, LocationCoordinates } from "@/utils/distancia";
import { extractCoordinatesFromGoogleMapsURL } from "@/utils/gmapsFormatter";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const coordinates: LocationCoordinates | null = extractCoordinatesFromGoogleMapsURL('https://www.google.com/maps/place/Pontificia+Universidad+Cat%C3%B3lica+de+Chile+-+Campus+San+Joaqu%C3%ADn/@-33.4934873,-70.6284669,13.88z/data=!4m6!3m5!1s0x9662d00eab4e9d4d:0x420f55d3226bf853!8m2!3d-33.4983075!4d-70.6118147!16s%2Fg%2F1tgz1syn?entry=ttu&g_ep=EgoyMDI1MTAxMi4wIKXMDSoASAFQAw%3D%3D');
  const distance = coordinates ? calculateDistance({lat: -33.3808603, lon: -70.6370368}, coordinates) : null; // Ejemplo: distancia desde Santiago, Chile
  return (
    <>
      <header>
        <div className="bg-white max-sm:p-2 flex max-sm:flex-col max-sm:items-stretch w-full justify-around p-3 border-b-2 border-slate-300"> 
          {coordinates ? ' Lat: ' + coordinates.lat + ' Lon: ' + coordinates.lon : 'No coordinates found'}<br />
          {distance !== null ? `Distance to Santiago, Chile: ${distance.toFixed(2)} km` : 'Distance not available'}
        </div>
      </header>
      {children}
      <footer className="bg-white max-sm:p-2 flex max-sm:flex-col max-sm:items-stretch w-full justify-around p-3 border-b-2 border-slate-300">
          Header
      </footer>
    </>
  );
}
