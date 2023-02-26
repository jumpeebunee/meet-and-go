import { YMaps, Map, GeolocationControl, SearchControl } from '@pbe/react-yandex-maps';
import { FC, useState } from 'react';
import { API_KEY, MAP_CENTER } from '../dataConfig/dataConfig';
import { IEvent } from '../types/types';
import AccountBtn from './AccountBtn';
import MapPlacemark from './MapPlacemark';

interface AppMapProps {
  image: string;
  events: IEvent[];
  handleOpen: (arg: boolean) => void;
  setEventCords: (event: any) => void;
  setIsOpenEvent: (arg: boolean) => void;
  setCurrentEvent: (event: IEvent) => void;
  setIsOpenCreateEvent: (arg: boolean) => void;
  setIsOpenActiveEvents: (arg: boolean) => void;
}

const AppMap:FC<AppMapProps> = ({events, image, handleOpen, setEventCords, setIsOpenCreateEvent, setIsOpenEvent, setCurrentEvent, setIsOpenActiveEvents}) => {

  const [isSearch, setIsSearch] = useState(false);

  const createEvent = (e:any) => {
    setIsOpenCreateEvent(true);
    setEventCords(e.get('coords'));
  }

  const openEvent = (id: string) => {
    const findedEvent = events.find(event => event.id === id);
    if (findedEvent) {
      setCurrentEvent(findedEvent);
      setIsOpenEvent(true);
    }
  }

  return (
    <YMaps query={{ apikey: API_KEY}}>
      <Map onClick={(e:any) => createEvent(e)} className='app__map' defaultState={MAP_CENTER}>
        {events.map(event =>
          <MapPlacemark
            currenEvent={event}
            key={event.id}
            openEvent={openEvent}
          />
        )}
        <GeolocationControl options={{float: 'left', position: {top: 40, left: 30}}}/>
        {isSearch && <SearchControl options={{position: {top: 40, right: 30}, noPlacemark: true}}/>}
      </Map>
      {!isSearch && <AccountBtn image={image} handleOpen={handleOpen}/>}
      {!isSearch &&
        <button 
          data-testid="events-btn"
          onClick={() => setIsOpenActiveEvents(true)}
          className='app__events'>
            <span></span>
        </button>
      }
      <button
        data-testid="search-btn"
        onClick={() => setIsSearch(prev => !prev)}
        className={isSearch ? 'app__search app__search_close' : 'app__search'}>
          <span></span>
      </button> 
    </YMaps>
  )
}

export default AppMap