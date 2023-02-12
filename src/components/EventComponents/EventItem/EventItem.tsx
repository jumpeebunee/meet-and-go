import cl from './EventItem.module.scss';
import { FC } from 'react'
import { formatDate } from '../../../helpers/formatDate';
import { IEvent } from '../../../types/types';
import dateIcon from '../../../assets/date.svg';
import mapIcon from '../../../assets/map.svg';
import EventItemAbout from '../EventItemAbout/EventItemAbout';

interface EventItemProps {
  event: IEvent;
  handle: (event: IEvent) => void;
}
 
const EventItem:FC<EventItemProps> = ({event, handle}) => {
  return (
    <li onClick={() => handle(event)} className={cl.eventItem}>
      <div className={cl.eventItemContent}>
        <h3>{event.title}</h3>
        <ul className={cl.eventItemAboutList}>
          <EventItemAbout
            text={formatDate(event.date)}
            icon={dateIcon}
          />
          <EventItemAbout
            text={event.place}
            icon={mapIcon}
          />
        </ul>
      </div>
    </li>
  )
}

export default EventItem