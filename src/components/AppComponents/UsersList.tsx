import { FC } from 'react'
import { IUserFull } from '../../types/types'
import '../../styles/components/AppComponents/userList.scss';
import UserItem from './UserItem';

interface UsersListProps {
  users: IUserFull[],
  handleChoose: (arg: IUserFull) => void,
}

const UsersList:FC<UsersListProps> = ({users, handleChoose}) => {
  return (
    <ul className='user-list'>
      <h2 className='heading'>Active users</h2>
      {users.map(user =>
        <UserItem key={user.uid} user={user} handleOpen={handleChoose}/>
      )}
    </ul>
  )
}

export default UsersList