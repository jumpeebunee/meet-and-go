import React, { FC } from 'react'
import { IUserFull } from '../../types/types'
import UserAvatars from '../UserAvatars'

interface EventAboutProps {
  activeUsers: IUserFull[];
  participants: number;
  contribution: number;
  setActiveEventUsers: (arg: boolean) => void;
}

const EventAbout:FC<EventAboutProps> = ({activeUsers, participants, contribution, setActiveEventUsers}) => {
  return (
    <div>
      <div onClick={() => setActiveEventUsers(true)} className='about-event__base-info about-event__base-info_users'>
        <h2 className='second-heading'>Participants</h2>
        <div className='about-event__base-content'>
          <UserAvatars users={activeUsers}/>
          <p>{activeUsers.length}/{participants}</p>
        </div>
      </div>
      <div className='about-event__base-info'>
        <h2 className='second-heading'>Сontribution</h2>
        <p>${contribution}</p>
      </div>
    </div>
  )
}

export default EventAbout