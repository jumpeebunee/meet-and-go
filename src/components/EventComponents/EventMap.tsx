import { FC } from 'react'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { API_KEY, MAP_DEFAULT_OPTIONS } from '../../dataConfig/dataConfig';

interface EventMapProps {
  place: string;
  cords: number[];
  centerPosition: number[];
}

const EventMap:FC<EventMapProps> = ({place, cords, centerPosition}) => {
  return (
    <div>
      <div className='about-event__location'>
        <h3 className='second-heading'>Location</h3>
        <p>{place}</p>
      </div>
      <YMaps query={{apikey: API_KEY}}>
        {cords.length === 2 &&
          <div className='about-event__map-wrapper'>
            <Map className='about-event__map' defaultState={{zoom: 10, center: centerPosition}}>
              <Placemark
                options={MAP_DEFAULT_OPTIONS}
                geometry={cords} 
              />
            </Map>
          </div>
          }
      </YMaps>
    </div>
  )
}

export default EventMap