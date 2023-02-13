import { FC } from 'react'
import { IUserFull } from '../../types/types'

interface UserItemProps {
  user: IUserFull;
  index: number;
  creator: boolean;
  handleOpen: (arg: IUserFull) => void;
}

const UserItem:FC<UserItemProps> = ({user, creator, handleOpen, index}) => {
  return (
    <li style={{order: creator ? 0 : index}} onClick={() => handleOpen(user)} key={user.uid} className={creator ? 'user-list__item user-list__item_active' : 'user-list__item'}>
      <img alt={user.username} src={user.image}/>
      {creator && <div className='user-list__item_active-img'></div>}
      <div>
        <h3>{user.username}</h3>
        <span>{user.email}</span>
      </div>
    </li>
  )
}

export default UserItem