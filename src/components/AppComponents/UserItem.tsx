import { FC } from 'react'
import { IUserFull } from '../../types/types'

interface UserItemProps {
  user: IUserFull;
  handleOpen: (arg: IUserFull) => void;
}

const UserItem:FC<UserItemProps> = ({user, handleOpen}) => {
  return (
    <li onClick={() => handleOpen(user)} key={user.uid} className='user-list__item'>
      <img alt={user.username} src={user.image}/>
        <div>
        <h3>{user.username}</h3>
        <span>{user.email}</span>
      </div>
    </li>
  )
}

export default UserItem