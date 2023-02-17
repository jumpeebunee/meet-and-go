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
import { clearEventData } from '../../helpers/clearEventData';

interface AboutEventModalProps {
  isOpen: boolean;
  currentEvent: IEvent,
  currentEventUsers: IUserFull[],
  centerPosition: number[],
  handleGo: () => void;
  setIsOpen: (arg: boolean) => void;
  setActiveEventUsers: (arg: boolean) => void;
  setIsOpenActiveEvents: (arg: boolean) => void;
}

const AboutEventModal:FC<AboutEventModalProps> = ({isOpen, setIsOpen, currentEvent, setActiveEventUsers, handleGo, centerPosition, currentEventUsers, setIsOpenActiveEvents}) => {

  const currentUser = useAppSelector(currentUserContent);

  const handleLeave = async() => {
    setIsOpen(false);
    setIsOpenActiveEvents(false);
    clearEventData(
      currentUser.uid,
      currentUser.reputation,
      currentEvent.id,
      currentEvent.leader,
      currentEvent.activeUsers
    );
  }

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
      <div>
        {currentEvent.activeUsers.length === currentEvent.participants
        ? 
        <div className='create-point__buttons'>
          <MainButton handle={handleLeave} text='Leave event'/>
          <SecondButton handle={() => setIsOpen(false)} text='Close'/>
        </div>
        :
        <div className='create-point__buttons'>
          {currentUser.activeMeets.includes(currentEvent.id)
          ? <MainButton handle={handleLeave} text='Leave event'/>
          : <MainButton handle={handleGo} text='Meet and go'/>
          }
          <SecondButton handle={() => setIsOpen(false)} text='Close'/>
        </div>
        }
      </div>
    </AppModal>
  )
}

export default AboutEventModal