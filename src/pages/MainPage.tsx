import { useState, useMemo, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { YMaps, Map, Placemark, GeolocationControl } from '@pbe/react-yandex-maps';
import { IEvent } from '../types/types';
import { currentUser } from '../app/feautures/userSlice';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import CreatePoint from '../components/CreatePoint';
import AboutEvent from '../components/AboutEvent';
import UserProfile from '../components/UserProfile';

const MainPage = () => {

  const MAP_CENTER = {
    center: [55.751574, 37.573856],
    zoom: 10,
  };

  const user = useSelector(currentUser);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isCurrentOpen, setIsCurrentOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<IEvent>({id: '', title:'', cords: [], place: '', date: '', contribution: 0, participants: 0});
  const [eventCords, setEventCords] = useState([]);
  const [events, setEvents] = useState<IEvent[]>([
    {
      id: '1',
      title:'Погулять c собакой',
      cords: [55.684758, 37.738521],
      place: 'Тульская',
      date: 'Tue Jan 24 2023 00:00:00 GMT+0300 (Москва, стандартное время)',
      contribution: 10, 
      participants: 5,
    },
  ]);

  useEffect(() => {
    onSnapshot(collection(db, "events"), doc => {
      doc.forEach((d: any) => {
        console.log(d.data())
      })
    })
  }, [])

  useEffect(() => {
    if (!user.uid) {
      navigate('/login');
    } 
  },[])

  useMemo(() => {
    if (!isCurrentOpen && currentEvent.cords.length === 2) setCurrentEvent({id: '', title:'', cords: [], place: '', date: '',  contribution: 0, participants: 0});
  }, [isCurrentOpen])

  const createEvent = (e:any) => {
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

  return (
    <div data-testid="map" className='app__content'>
      <YMaps
          query={{
            apikey: "bb874fcf-3722-4db8-8062-76756ffbcd45",
          }}
        >
          <Map onClick={(e:any) => createEvent(e)} className='app__map' defaultState={MAP_CENTER}>
            {events.map(event =>
            <div className='app__map-placemark' key={event.id}>
                <Placemark
                  onClick={() => openEvent(event.id)}
                  options={{
                    iconLayout: 'default#image',
                    iconImageHref: '../point.svg',
                    iconImageSize: [62, 85],
                  }}
                  geometry={event.cords} 
                />
              </div>
            )}
            <GeolocationControl options={{
              float: 'left',
            }} />
          </Map>
          <div className='app__profile'>
            <div>Account</div>
            <button onClick={() => setIsProfileOpen(true)} className='app__profile-avatar'></button>
          </div>
      </YMaps>
      <CreatePoint 
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        eventCords={eventCords}
      />
      <AboutEvent
        isOpen={isCurrentOpen}
        setIsOpen={setIsCurrentOpen}
        currentEvent={currentEvent}
      />
      <UserProfile
        isOpen={isProfileOpen}
        setIsOpen={setIsProfileOpen}
      />
    </div>
  )
}

export default MainPage