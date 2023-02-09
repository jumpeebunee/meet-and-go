import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { YMaps, Map, Placemark, GeolocationControl } from '@pbe/react-yandex-maps';
import { IEvent } from '../types/types';
import { currentUser, currentUserContent } from '../app/feautures/userSlice';
import { arrayUnion, collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
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

  const [isOpenCreateEvent, setIsOpenCreateEvent] = useState(false);
  const [isOpenEvent, setIsOpenEvent] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMeet, setIsMeet] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<IEvent>({id: '', title:'', cords: [], place: '', date: {seconds: 0, nanoseconds: 0}, contribution: 0, participants: 0, activeUsers: []});
  const [eventCords, setEventCords] = useState([]);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [activeEventUsers, setActiveEventUsers] = useState(false);

  useEffect(() => {
    if (!user.uid) {
      navigate('/login');
    } 
    getData();
  },[])

  useMemo(() => {
    if (!isOpenEvent && currentEvent.cords.length === 2) {
      setCurrentEvent(
      {
        id: '',
        title:'',
        cords: [],
        place: '',
        date: {seconds: 0, nanoseconds: 0}, 
        contribution: 0,
        participants: 0,
        activeUsers: []
      });
    }
  }, [isOpenEvent])

  const getData = () => {
    onSnapshot(collection(db, "events"), doc => {
      const data: IEvent[] = []
      doc.forEach((d) => {
        data.push(d.data() as IEvent);
      })
      setEvents(data);
    })
  }

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

  const handleMeet =  async() => {
    setIsMeet(false);
    setIsOpenEvent(false);
    let isActive = currentEvent.activeUsers.find(user => user.uid === userContent.uid);
    if (!isActive && currentEvent.participants > currentEvent.activeUsers.length) {
      const userActiveRef = doc(db, "events", currentEvent.id);
      await updateDoc(userActiveRef, {
        activeUsers: arrayUnion(userContent),
      })
    }
    getData();
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
                    iconImageHref: '../point.png',
                    iconImageSize: [52, 62],
                  }}
                  geometry={event.cords} 
                />
              </div>
            )}
            <GeolocationControl options={{
              float: 'left',
            }} />
          </Map>
          <button onClick={() => setIsProfileOpen(true)} className='app__profile'>
            <div>Account</div>
            <div className='app__profile-avatar'>
              <img alt="Avatar" src={userContent.image}/>
            </div>
          </button>
          <button className='app__events'><span></span></button>
      </YMaps>
      <CreatePoint 
        isOpen={isOpenCreateEvent}
        setIsOpen={setIsOpenCreateEvent}
        eventCords={eventCords}
      />
      <AboutEvent
        isOpen={isOpenEvent}
        setIsOpen={setIsOpenEvent}
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
        handleTrue={handleMeet}
      />
    </div>
  )
}

export default MainPage