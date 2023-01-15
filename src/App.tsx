import { useState } from 'react'
import { YMaps, Map, Placemark, GeolocationControl } from '@pbe/react-yandex-maps';
import CreatePoint from './components/CreatePoint';
import { IEvent } from './types/types';

const App = () => {
  const defaultState = {
    center: [55.751574, 37.573856],
    zoom: 10,
  };

  const [isOpen, setIsOpen] = useState(false);
  const [eventCords, setEventCords] = useState([]);
  const [events, setEvents] = useState<IEvent[]>([
    {id: '1', title:' Погулять c собакой', cords: [55.684758, 37.738521]},
    {id: '2', title:' Погулять c собакой', cords: [55.684758, 38.738521]},
  ]);

  function createEvent(e:any) {
    setIsOpen(true);
    setEventCords(e.get('coords'));
  }

  return (
    <div className='app'>
      <div data-testid="map" className='app__content'>
        <YMaps
          query={{
            apikey: "bb874fcf-3722-4db8-8062-76756ffbcd45",
          }}
        >
          <Map onClick={(e:any) => createEvent(e)} className='app__map' defaultState={defaultState}>
            {events.map(event =>
              <Placemark
                onClick={() => console.log('q')}
                key={event.id}
                options={{
                  iconLayout: 'default#image',
                  iconImageHref: '../point.svg',
                  iconImageSize: [62, 85],
                }}
                geometry={event.cords} 
              />
            )}
            <GeolocationControl options={{
              float: 'left'
            }} />
          </Map>
        </YMaps>
        <CreatePoint 
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setEvents={setEvents}
          eventCords={eventCords}
        />
      </div>
    </div>
  )
}

export default App