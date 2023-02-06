import { FC } from 'react'
import { IUserFull } from '../types/types'
import '../styles/components/AppComponents/userList.scss';

interface UsersListProps {
  users: IUserFull[],
}

const UsersList:FC<UsersListProps> = ({users}) => {
  return (
    <ul className='user-list'>
      <h2 className='heading'>Active users</h2>
      {users.map(user =>
        <li key={user.uid} className='user-list__item'>
          <img alt={user.username} src={user.image}/>
          <div>
            <h3>{user.username}</h3>
            <span>{user.email}</span>
          </div>
        </li>
      )}
    </ul>
  )
}

export default UsersList