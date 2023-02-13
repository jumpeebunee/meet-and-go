import { FC } from 'react'
import { IEvent, IUserFull } from '../../types/types'
import '../../styles/components/AppComponents/userList.scss';
import UserItem from './UserItem';

interface UsersListProps {
  users: IUserFull[],
  currentEvent: IEvent;
  handleChoose: (arg: IUserFull) => void,
}

const UsersList:FC<UsersListProps> = ({users, handleChoose, currentEvent}) => {
  return (
    <ul className='user-list'>
      <h2 className='heading'>Active users</h2>
      {users.map((user, index) =>
        <UserItem index={index + 1} creator={currentEvent.leader === user.uid} key={user.uid} user={user} handleOpen={handleChoose}/>
      )}
    </ul>
  )
}

export default UsersList