import { FC, useMemo, useState } from 'react'
import { IEvent, IUserFull } from '../types/types'
import AppModal from './UI/AppModal/AppModal'
import SecondButton from './UI/SecondButton/SecondButton';
import UsersList from './AppComponents/UsersList';
import UserAbout from './AppComponents/UserAbout';
import AboutEventModal from './AppModals/AboutEventModal';

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

  if (isOpenUserAccount) {
    return (
      <AppModal isOpen={isOpenUserAccount} setIsOpen={setIsUserAccount}> 
        <UserAbout user={choosedUser}/>
        <SecondButton handle={handleCloseUser} text="Close"></SecondButton>
      </AppModal>
    )
  } else if (activeEventUsers) {
    return (
      <AppModal isOpen={activeEventUsers} setIsOpen={setActiveEventUsers}>
        <UsersList handleChoose={handleOpenUser} users={currentEvent.activeUsers}/>
        <SecondButton handle={() => setActiveEventUsers(false)} text='Close'/>
      </AppModal>
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

export default AboutEvent