import { PLACEMARK_CONFIG } from '../dataConfig/dataConfig';
import { Placemark } from '@pbe/react-yandex-maps';
import { FC } from 'react';

interface MapPlacemarkProps {
  id: string;
  cords: number[];
  openEvent: (id: string) => void;
}

const MapPlacemark:FC<MapPlacemarkProps> = ({id, cords, openEvent}) => {
  return (
    <div className='app__map-placemark'>
      <Placemark
        onClick={() => openEvent(id)}
        options={PLACEMARK_CONFIG}
        geometry={cords} 
      />
    </div>
  )
}

export default MapPlacemark