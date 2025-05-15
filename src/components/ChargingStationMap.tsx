import React, { useEffect, useRef } from 'react';

interface Location {
  lat: number;
  lng: number;
}

interface ChargingStation {
  name: string;
  location: Location;
  address: string;
  rating?: number;
}

interface ChargingStationMapProps {
  userLocation: Location | null;
  chargingStations: ChargingStation[];
}

declare global {
  interface Window {
    google: any;
  }
}

export function ChargingStationMap({ userLocation, chargingStations }: ChargingStationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    // Load Google Maps script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCXo5DViPSCe7Ngv9xob9VaAS1kH7HyiPs&libraries=places`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = initializeMap;

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current && userLocation) {
      updateMap();
    }
  }, [userLocation, chargingStations]);

  const initializeMap = () => {
    if (!mapRef.current || !userLocation) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: userLocation,
      zoom: 13,
    });

    mapInstanceRef.current = map;
    updateMap();
  };

  const updateMap = () => {
    if (!mapInstanceRef.current || !userLocation) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add user location marker
    const userMarker = new window.google.maps.Marker({
      position: userLocation,
      map: mapInstanceRef.current,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: '#4285F4',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2,
      },
      title: 'Your Location',
    });
    markersRef.current.push(userMarker);

    // Add charging station markers
    chargingStations.forEach(station => {
      const marker = new window.google.maps.Marker({
        position: station.location,
        map: mapInstanceRef.current,
        title: station.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#34A853',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        },
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div>
            <h3 style="font-weight: bold; margin-bottom: 4px;">${station.name}</h3>
            <p style="margin: 0;">${station.address}</p>
            ${station.rating ? `<p style="margin: 4px 0;">Rating: ${station.rating} ⭐</p>` : ''}
          </div>
        `,
      });

      marker.addListener('click', () => {
        infoWindow.open(mapInstanceRef.current, marker);
      });

      markersRef.current.push(marker);
    });

    // Fit map to show all markers
    const bounds = new window.google.maps.LatLngBounds();
    markersRef.current.forEach(marker => bounds.extend(marker.getPosition()));
    mapInstanceRef.current.fitBounds(bounds);
  };

  return (
    <div 
      ref={mapRef} 
      className="w-full h-[400px] rounded-lg shadow-md"
      style={{ minHeight: '400px' }}
    />
  );
} 