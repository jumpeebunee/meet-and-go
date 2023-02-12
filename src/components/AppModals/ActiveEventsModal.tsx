import { doc, getDoc } from 'firebase/firestore';
import { FC, useEffect, useState } from 'react'
import { db } from '../../firebase';
import { IEvent } from '../../types/types';
import EventItem from '../EventComponents/EventItem/EventItem';
import AppModal from '../UI/AppModal/AppModal'
import SecondButton from '../UI/SecondButton/SecondButton';

interface ActiveEventsModal {
  isOpen: boolean;
  events: string[];
  setIsOpen: (arg: boolean) => void;
  setIsOpenEvent: (arg: boolean) => void;
  setCurrentEvent: (arg: IEvent) => void;
}

const ActiveEventsModal:FC<ActiveEventsModal> = ({isOpen, setIsOpen, events, setIsOpenEvent, setCurrentEvent}) => {

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

  return (
    <AppModal style={{paddingTop: '60px'}} isOpen={isOpen} setIsOpen={setIsOpen}>
      <div>
        <h2 data-testid="create-point" className='heading'>Active events</h2>
        {events.length
        ?
          <ul>
            {totalEvents.map(event => 
              <EventItem
                event={event}
                handle={handleOpen}
              />
            )}
          </ul>
        :
          <p style={{marginTop: '15px'}} className='description'>You don't have any active events, join and then they will appear here</p>
        }
      </div>
      <SecondButton text='Close' handle={() => setIsOpen(false)}/>
    </AppModal>
  )
}

export default ActiveEventsModal