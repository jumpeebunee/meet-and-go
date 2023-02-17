import { useState, useMemo } from 'react'
import { IEvent, IUserFull } from '../types/types';
import { currentUser, currentUserContent } from '../app/feautures/userSlice';
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';
import { useAppSelector } from '../app/hooks';
import { useAuth } from '../hooks/useAuth';
import { getEvents } from '../helpers/getEvents';
import CreatePoint from '../components/CreatePoint';
import AboutEvent from '../components/AboutEvent';
import UserProfile from '../components/UserProfile';
import AppModalToggle from '../components/UI/AppModalToggle/AppModalToggle';
import AppMap from '../components/AppMap';
import ActiveEventsModal from '../components/AppModals/ActiveEventsModal';
import { ratingConfig } from '../dataConfig/ratingConfig';

const MainPage = () => {

  const user = useAppSelector(currentUser);
  const userContent = useAppSelector(currentUserContent);

  const [isOpenActiveEvents, setIsOpenActiveEvents] = useState(false);
  const [isOpenCreateEvent, setIsOpenCreateEvent] = useState(false);
  const [isOpenEvent, setIsOpenEvent] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMeet, setIsMeet] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<IEvent>(
    {
      id: '', 
      leader: '',
      title:'', 
      cords: [], 
      place: '',
      date: {seconds: 0, nanoseconds: 0}, 
      contribution: 0, 
      participants: 0, 
      activeUsers: []
    }
  );
  const [eventCords, setEventCords] = useState([]);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [activeEventUsers, setActiveEventUsers] = useState(false);
  const [currentEventUsers, setCurrentEventUsers] = useState<IUserFull[]>([]);

  useAuth(user.uid, getEvents, setEvents);

  useMemo(() => {
    if (isOpenEvent && currentEvent.id) currentEvent.activeUsers.map(id => fetchUsers(id));
    if (!isOpenEvent && currentEvent.cords.length === 2) {
      setCurrentEvent(
      {
        id: '',
        leader: '',
        title:'',
        cords: [],
        place: '',
        date: {seconds: 0, nanoseconds: 0}, 
        contribution: 0,
        participants: 0,
        activeUsers: []
      });
      setCurrentEventUsers([]);
    }
  }, [isOpenEvent])

  async function fetchUsers(id: string) {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) setCurrentEventUsers(prev => [...prev, docSnap.data() as IUserFull]);
  }

  const handleMeet =  async() => {
    setIsMeet(false);
    setIsOpenEvent(false);
    let isActive = currentEvent.activeUsers.find(id => id === userContent.uid);
    if (!isActive && currentEvent.participants > currentEvent.activeUsers.length) {
      const userActiveRef = doc(db, "events", currentEvent.id);
      await updateDoc(userActiveRef, {
        activeUsers: arrayUnion(userContent.uid),
      })
      await updateDoc(doc(db, "users", userContent.uid), {
        reputation: userContent.reputation + ratingConfig.meet,
        totalMeets: userContent.totalMeets + 1,
      })
      addEventToUser(currentEvent.id);
      getEvents(setEvents);
    }
  }

  const addEventToUser = async(id: string) => {
    const userRef = doc(db, "users", userContent.uid);
    await updateDoc(userRef, {
      activeMeets: arrayUnion(id),
    });
  }

  return (
    <div data-testid="map" className='app__content'>
      <AppMap
        events={events}
        image={userContent.image}
        handleOpen={setIsProfileOpen}
        setEventCords={setEventCords}
        setIsOpenEvent={setIsOpenEvent}
        setCurrentEvent={setCurrentEvent}
        setIsOpenCreateEvent={setIsOpenCreateEvent}
        setIsOpenActiveEvents={setIsOpenActiveEvents}
      />
      <CreatePoint 
        isOpen={isOpenCreateEvent}
        setIsOpen={setIsOpenCreateEvent}
        eventCords={eventCords}
        addEventToUser={addEventToUser}
      />
      <ActiveEventsModal
        isOpen={isOpenActiveEvents}
        events={userContent.activeMeets}
        setIsOpen={setIsOpenActiveEvents}
        setIsOpenEvent={setIsOpenEvent}
        setCurrentEvent={setCurrentEvent}
      />
      <AboutEvent
        isOpen={isOpenEvent}
        setIsOpen={setIsOpenEvent}
        setIsMeet={setIsMeet}
        currentEvent={currentEvent}
        activeEventUsers={activeEventUsers}
        currentEventUsers={currentEventUsers}
        setActiveEventUsers={setActiveEventUsers}
        setIsOpenActiveEvents={setIsOpenActiveEvents}
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