import React, { FC } from 'react'
import { IUserFull } from '../../types/types'
import UserProfileBaseItem from '../UserProfileBaseItem'
import UserProfileMain from '../UserProfileMain'
import AppList from './AppList'

interface UserAboutProps {
  user: IUserFull | null,
}

const UserAbout:FC<UserAboutProps> = ({user}) => {
  return (
    <div className='user-profile__wrapper'>
      {user &&
        <div>
          <UserProfileMain image={user.image} username={user.username} reputation={user.reputation}/>
          <AppList>
            <UserProfileBaseItem title="Total meets" body={user.totalMeets}/>
            <UserProfileBaseItem title="Created meets" body={user.createdMeets}/>
            {user.town && <UserProfileBaseItem title="Town" body={user.town}/>}
            {user.phone && <UserProfileBaseItem title="Phone" body={user.phone}/>}
          </AppList>
        </div>
      }
    </div>
  )
}

export default UserAbout