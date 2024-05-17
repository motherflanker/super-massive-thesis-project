import React, { useEffect } from 'react';
import { usePage } from '@inertiajs/inertia-react';
import IBus from '@/types/IBus';



interface Props {
    buses: IBus[];
}



const Map: React.FC<Props> = ({ buses }) => {
  useEffect(() => {
      const yandexMapScript = document.createElement('script');
      yandexMapScript.src = 'https://api-maps.yandex.ru/2.1/?apikey=YOUR_YANDEX_API_KEY&lang=en_US';
      yandexMapScript.type = 'text/javascript';
      yandexMapScript.onload = () => {
          window.ymaps.ready(initMap);
      };
      document.head.appendChild(yandexMapScript);

      return () => {
          document.head.removeChild(yandexMapScript);
      };
  }, [buses]);

  const initMap = () => {
      const map = new window.ymaps.Map('map', {
          center: [buses[0]?.latitude || 0, buses[0]?.longitude || 0],
          zoom: 8,
      });

      buses.forEach(bus => {
          const marker = new window.ymaps.Placemark(
              [bus.latitude, bus.longitude],
              { hintContent: `Bus ID: ${bus.bus_id}`, balloonContent: `<div>Bus ID: ${bus.bus_id}</div>` },
              { preset: 'islands#icon', iconColor: '#0095b6' }
          );

          map.geoObjects.add(marker);
      });
  };

  return <div id="map" style={{ width: '100%', height: '500px' }}></div>;
};

export default Map;