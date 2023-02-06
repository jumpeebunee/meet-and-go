import { FC } from 'react'
import { IUserFull } from '../types/types'

interface UserAvatarsProps {
  users: IUserFull[],
  handleOpen: () => void,
}

const UserAvatars:FC<UserAvatarsProps> = ({users, handleOpen}) => {
  return (
    <button onClick={handleOpen} className='about-event__avatars'>
      {users.map(user =>
        <img key={user.uid} alt={user.username} src={user.image} className='about-event__avatar'/>
      )}
  </button>
  )
}

export default UserAvatars