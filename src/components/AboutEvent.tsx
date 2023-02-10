import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { FC, useMemo, useState } from 'react'
import { db } from '../firebase';
import { IEvent, IUserFull } from '../types/types'
import AboutEventModal from './AppModals/AboutEventModal';
import ActiveUsersModal from './AppModals/ActiveUsersModal';
import UserAccountModal from './AppModals/UserAccountModal';

interface AboutEventProps {
  isOpen: boolean,
  activeEventUsers: boolean,
  currentEvent: IEvent,
  currentUser: IUserFull,
  currentEventUsers: IUserFull[],
  setIsOpen: (arg: boolean) => void,
  setIsMeet: (arg: boolean) => void,
  setActiveEventUsers: (arg: boolean) => void,
}

const AboutEvent:FC<AboutEventProps> = ({isOpen, setIsOpen, setIsMeet, currentUser, currentEvent, activeEventUsers, setActiveEventUsers, currentEventUsers}) => {

  const [centerPosition, setCenterPosition] = useState([55.751574, 37.573856]);
  const [choosedUser, setChoosedUser] = useState<IUserFull | null>(null);
  const [isOpenUserAccount, setIsUserAccount] = useState(false);

  useMemo(() => {
    if (currentEvent.cords.length > 0) setCenterPosition(currentEvent.cords);
  }, [currentEvent])

  const handleGo = () => {
    setIsMeet(true);
  }

  const handleLeave = async() => {
    setIsOpen(false);
    const userEvents = doc(db, "users", currentUser.uid);
    const eventUser = doc(db, "events", currentEvent.id);

    await updateDoc(userEvents, {
      activeMeets: arrayRemove(currentEvent.id),
    });
    await updateDoc(eventUser, {
      activeUsers: arrayRemove(currentUser.uid),
    });
  }

  const handleOpenUser = (user: IUserFull) => {
    setChoosedUser(user);
    setIsUserAccount(true);
  }

  const handleCloseUser = () => {
    setChoosedUser(null);
    setIsUserAccount(false);
  }

  const activeModal = () => {
    if (isOpenUserAccount) {
      return (
        <UserAccountModal
          isOpen={isOpenUserAccount}
          user={choosedUser}
          setIsOpen={setIsUserAccount}
          handleclose={handleCloseUser}
        />
      )
    } else if (activeEventUsers) {
      return (
        <ActiveUsersModal
          isOpen={activeEventUsers}
          users={currentEventUsers}
          setIsOpen={setActiveEventUsers}
          chooseUser={handleOpenUser}
          setActive={setActiveEventUsers}
        />
      )
    } else {
      return (
        <AboutEventModal
          isOpen={isOpen}
          currentEvent={currentEvent}
          centerPosition={centerPosition}
          handleGo={handleGo}
          handleLeave={handleLeave}
          setIsOpen={setIsOpen}
          currentEventUsers={currentEventUsers}
          setActiveEventUsers={setActiveEventUsers}
        />
      )
    }
  }

  return activeModal();
}

export default AboutEvent