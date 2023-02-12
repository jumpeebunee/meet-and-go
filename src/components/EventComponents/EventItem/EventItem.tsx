import cl from './EventItem.module.scss';
import { FC } from 'react'
import { formatDate } from '../../../helpers/formatDate';
import { IDate } from '../../../types/types';
import dateIcon from '../../../assets/date.svg';
import mapIcon from '../../../assets/map.svg';
import EventItemAbout from '../EventItemAbout/EventItemAbout';

interface EventItemProps {
  title: string;
  place: string;
  date: IDate;
}
 
const EventItem:FC<EventItemProps> = ({date, title, place}) => {
  return (
    <li className={cl.eventItem}>
      <div className={cl.eventItemContent}>
        <h3>{title}</h3>
        <ul className={cl.eventItemAboutList}>
          <EventItemAbout
            text={formatDate(date)}
            icon={dateIcon}
          />
          <EventItemAbout
            text={place}
            icon={mapIcon}
          />
        </ul>
      </div>
    </li>
  )
}

export default EventItem