import { FC } from 'react'
import { IEvent, IUserFull } from '../../types/types';
import { useAppSelector } from '../../app/hooks';
import { currentUserContent } from '../../app/feautures/userSlice';
import AppModal from '../UI/AppModal/AppModal'
import MainButton from '../UI/MainButton/MainButton';
import SecondButton from '../UI/SecondButton/SecondButton';
import EventTitle from '../EventComponents/EventTitle';
import EventMap from '../EventComponents/EventMap';
import EventAbout from '../EventComponents/EventAbout';
interface AboutEventModalProps {
  isOpen: boolean;
  currentEvent: IEvent,
  currentEventUsers: IUserFull[],
  centerPosition: number[],
  handleGo: () => void;
  handleLeave: () => void;
  setIsOpen: (arg: boolean) => void;
  setActiveEventUsers: (arg: boolean) => void;
}

const AboutEventModal:FC<AboutEventModalProps> = ({isOpen, setIsOpen, currentEvent, setActiveEventUsers, handleGo, handleLeave, centerPosition, currentEventUsers}) => {

  const currentUser = useAppSelector(currentUserContent);

  return (
    <AppModal isOpen={isOpen} setIsOpen={setIsOpen}>  
      <div>
        <EventTitle date={currentEvent.date} title={currentEvent.title}/>
          <EventMap 
            place={currentEvent.place}
            cords={currentEvent.cords}
            centerPosition={centerPosition}
          />
          <EventAbout
            activeUsers={currentEventUsers}
            participants={currentEvent.participants}
            contribution={currentEvent.contribution}
            setActiveEventUsers={setActiveEventUsers}
          />
      </div>
      <div className='create-point__buttons'>
        {currentUser.activeMeets.includes(currentEvent.id)
        ? <MainButton handle={handleLeave} text='Leave event'/>
        : <MainButton handle={handleGo} text='Meet and go'/>
        }
        <SecondButton handle={() => setIsOpen(false)} text='Close'/>
      </div>
    </AppModal>
  )
}

export default AboutEventModal