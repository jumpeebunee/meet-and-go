import { FC } from 'react';
import cl from './EventItemAbout.module.scss';

interface EventItemAboutProps {
  icon: string;
  text: string;
}

const EventItemAbout:FC<EventItemAboutProps> = ({icon, text}) => {
  return (
    <li className={cl.eventItemAbout}>
      <div className={cl.eventItemIcon}>
        <span style={{backgroundImage: `url(${icon})`}}></span>
      </div>
      <p>{text}</p>
    </li>
  )
}

export default EventItemAbout