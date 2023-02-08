import { FC, useMemo, useState } from 'react'
import { IEvent, IUserFull } from '../types/types'
import AboutEventModal from './AppModals/AboutEventModal';
import ActiveUsersModal from './AppModals/ActiveUsersModal';
import UserAccountModal from './AppModals/UserAccountModal';

interface AboutEventProps {
  isOpen: boolean,
  activeEventUsers: boolean,
  currentEvent: IEvent,
  setIsOpen: (arg: boolean) => void,
  setIsMeet: (arg: boolean) => void,
  setActiveEventUsers: (arg: boolean) => void,
}

const AboutEvent:FC<AboutEventProps> = ({isOpen, setIsOpen, setIsMeet, currentEvent, activeEventUsers, setActiveEventUsers}) => {

  const [centerPosition, setCenterPosition] = useState([55.751574, 37.573856]);
  const [choosedUser, setChoosedUser] = useState<IUserFull | null>(null);
  const [isOpenUserAccount, setIsUserAccount] = useState(false);

  useMemo(() => {
    if (currentEvent.cords.length > 0) setCenterPosition(currentEvent.cords);
  }, [currentEvent])

  const handleGo = () => {
    setIsOpen(false);
    setIsMeet(true);
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
          users={currentEvent.activeUsers}
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
          setIsOpen={setIsOpen}
          setActiveEventUsers={setActiveEventUsers}
        />
      )
    }
  }

  return activeModal();
}

export default AboutEvent