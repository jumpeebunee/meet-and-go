import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { YMaps, Map, Placemark, GeolocationControl } from '@pbe/react-yandex-maps';
import { IEvent } from '../types/types';
import { currentUser, currentUserContent } from '../app/feautures/userSlice';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { useAppSelector } from '../app/hooks';
import CreatePoint from '../components/CreatePoint';
import AboutEvent from '../components/AboutEvent';
import UserProfile from '../components/UserProfile';
import AppModalToggle from '../components/UI/AppModalToggle/AppModalToggle';

const MainPage = () => {

  const MAP_CENTER = {
    center: [55.751574, 37.573856],
    zoom: 10,
  };

  const user = useAppSelector(currentUser);
  const userContent = useAppSelector(currentUserContent);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isCurrentOpen, setIsCurrentOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMeet, setIsMeet] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<IEvent>({id: '', title:'', cords: [], place: '', date: '', contribution: 0, participants: 0, activeUsers: []});
  const [eventCords, setEventCords] = useState([]);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [activeEventUsers, setActiveEventUsers] = useState(false);

  useEffect(() => {
    onSnapshot(collection(db, "events"), doc => {
      const data: IEvent[] = []
      doc.forEach((d) => {
        data.push(d.data() as IEvent);
      })
      setEvents(data);
    })
  }, [])

  useEffect(() => {
    if (!user.uid) {
      navigate('/login');
    } 
  },[])

  useMemo(() => {
    if (!isCurrentOpen && currentEvent.cords.length === 2) setCurrentEvent({id: '', title:'', cords: [], place: '', date: '',  contribution: 0, participants: 0, activeUsers: []});
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
                    iconImageSize: [42, 65],
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
            <button onClick={() => setIsProfileOpen(true)} className='app__profile-avatar'>
              <img alt="Avatar" src={userContent.image}/>
            </button>
          </div>
          <button className='app__events'><span></span></button>
      </YMaps>
      <CreatePoint 
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        eventCords={eventCords}
      />
      <AboutEvent
        isOpen={isCurrentOpen}
        setIsOpen={setIsCurrentOpen}
        setIsMeet={setIsMeet}
        currentEvent={currentEvent}
        activeEventUsers={activeEventUsers}
        setActiveEventUsers={setActiveEventUsers}
      />
      <UserProfile
        isOpen={isProfileOpen}
        setIsOpen={setIsProfileOpen}
      />
      <AppModalToggle
        isOpen={isMeet}
        setIsOpen={setIsMeet}
        text={'Go to event?'}
      />
    </div>
  )
}

export default MainPage