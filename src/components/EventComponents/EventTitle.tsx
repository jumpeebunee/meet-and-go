import { FC } from 'react'
import { formatDate } from '../../helpers/formatDate';
import { IDate } from '../../types/types';

interface EventTitleProps {
  title: string;
  date: IDate;
}

const EventTitle:FC<EventTitleProps> = ({title, date}) => {
  return (
    <div>
      <div className='about-event__date'>{formatDate(date)}</div>
      {title
        ? <h2 className='about-event__heading heading'>{title}</h2>
        : <div className='about-event__heading_loading'></div>
      }
    </div>
  )
}

export default EventTitle