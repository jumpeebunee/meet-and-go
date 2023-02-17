import { PLACEMARK_CONFIG } from '../dataConfig/dataConfig';
import { Placemark } from '@pbe/react-yandex-maps';
import { FC, useEffect } from 'react';
import { IEvent } from '../types/types';
import { unactiveEvents } from '../helpers/unactiveEvent';

interface MapPlacemarkProps {
  currenEvent: IEvent,
  openEvent: (id: string) => void;
}

const MapPlacemark:FC<MapPlacemarkProps> = ({openEvent, currenEvent}) => {

  useEffect(() => {
    let eventDate = new Date(currenEvent.date.seconds * 1000);
    if (eventDate.getTime() - Date.now() < 0) {
      unactiveEvents(currenEvent.id, currenEvent.activeUsers)
    }
  }, [currenEvent])

  return (
    <div className='app__map-placemark'>
      <Placemark
        onClick={() => openEvent(currenEvent.id)}
        options={PLACEMARK_CONFIG}
        geometry={currenEvent.cords} 
      />
    </div>
  )
}

export default MapPlacemark