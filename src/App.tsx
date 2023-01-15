import { useState, useMemo } from 'react'
import { YMaps, Map, Placemark, GeolocationControl } from '@pbe/react-yandex-maps';
import CreatePoint from './components/CreatePoint';
import { IEvent } from './types/types';
import AboutEvent from './components/AboutEvent';

const App = () => {
  const defaultState = {
    center: [55.751574, 37.573856],
    zoom: 10,
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isCurrentOpen, setIsCurrentOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<IEvent>({id: '', title:'', cords: [], place: '', interest: []});
  const [eventCords, setEventCords] = useState([]);
  const [events, setEvents] = useState<IEvent[]>([
    {id: '1', title: 'Погулять c собакой', cords: [55.684758, 37.738521], place: 'Тульская', interest: ['Животные', 'Собаки', 'прогулка', 'Отдых']},
    {id: '2', title: 'Убить Фейма', cords: [56.34929007185356, 37.51838062216117], place: 'Дом Михаловых', interest: ['Убийство', 'Скотина', 'Предатель']},
  ]);

  function createEvent(e:any) {
    setIsOpen(true);
    setEventCords(e.get('coords'));
  }

  const openEvent = (id: string) => {
    const findedEvent = events.find(event => event.id === id);
    if (findedEvent) {
      setCurrentEvent(findedEvent);
      setIsCurrentOpen(true);
    }
  }

  useMemo(() => {
    if (!isCurrentOpen && currentEvent.cords.length === 2) setCurrentEvent({id: '', title:'', cords: [], place: '', interest: []});
  }, [isCurrentOpen])

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
                onClick={() => openEvent(event.id)}
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
        <AboutEvent
          isOpen={isCurrentOpen}
          setIsOpen={setIsCurrentOpen}
          currentEvent={currentEvent}
        />
      </div>
    </div>
  )
}

export default App