import { doc, getDoc } from 'firebase/firestore';
import { FC, useEffect, useState } from 'react'
import { db } from '../../firebase';
import { IEvent } from '../../types/types';
import EventItem from '../EventComponents/EventItem/EventItem';
import AppModal from '../UI/AppModal/AppModal'
import SecondButton from '../UI/SecondButton/SecondButton';
import CreateEventError from './ErrorModal';

interface ActiveEventsModalProps {
  isOpen: boolean;
  events: string[];
  setIsOpen: (arg: boolean) => void;
  setIsOpenEvent: (arg: boolean) => void;
  setCurrentEvent: (arg: IEvent) => void;
}

const ActiveEventsModal:FC<ActiveEventsModalProps> = ({isOpen, setIsOpen, events, setIsOpenEvent, setCurrentEvent}) => {

  const [totalEvents, setTotalEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    if (isOpen) events.map((event) => fetchEvent(event));
    return () => setTotalEvents([]);
  }, [isOpen, events])

  async function fetchEvent(event: string) {
    const docRef = doc(db, "events", event);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) setTotalEvents(prev => [...prev, docSnap.data() as IEvent]);
  }

  const handleOpen = (event: IEvent) => {
    setIsOpenEvent(true);
    setCurrentEvent(event);
  }

  if (events.length) {
    return (
      <AppModal style={{paddingTop: '60px'}} isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className='active-events__list'>
        <h2 data-testid="create-point" className='heading'>Active events</h2>
          <ul>
            {totalEvents.map(event => 
              <EventItem
                key={event.id}
                event={event}
                handle={handleOpen}
              />
            )}
          </ul>
      </div>
      <SecondButton text='Close' handle={() => setIsOpen(false)}/>
    </AppModal>
    )
  } else {
    return (
      <CreateEventError
        error='Not found events'
        message="You don't have any active events, join and then they will appear here"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    )
  }
}

export default ActiveEventsModal