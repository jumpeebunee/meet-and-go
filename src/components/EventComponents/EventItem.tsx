import { FC } from 'react'
import { formatDate } from '../../helpers/formatDate';
import { IDate } from '../../types/types';

interface EventItemProps {
  title: string;
  date: IDate;
}
 
const EventItem:FC<EventItemProps> = ({date, title}) => {
  return (
    <li>
      <div>
        <h3>{title}</h3>
        <p>{formatDate(date)}</p>
      </div>
    </li>
  )
}

export default EventItem