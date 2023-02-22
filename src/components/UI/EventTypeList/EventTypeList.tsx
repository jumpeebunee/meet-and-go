import { FC } from 'react';
import cl from './EventTypeList.module.scss';

interface EventTypeListProps {
  onChange: (arg: string) => void;
}

const EventTypeList:FC<EventTypeListProps> = ({onChange}) => {

  const BASE_EVENT_TYPES = ['basketball', 'volleyball', 'tennis', 'jogging', 'cycling'];

  const changeEvent = (event: string) => onChange(event);

  return (
    <ul className={cl.eventTypeList}>
      {BASE_EVENT_TYPES.map(event => 
        <li onClick={() => changeEvent(event)} value={event} className={cl.eventTypeItem} key={event}>{event}</li>
      )}
    </ul>
  )
}

export default EventTypeList