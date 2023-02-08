import { FC } from 'react'
import { IUserFull } from '../../types/types';
import UsersList from '../AppComponents/UsersList';
import AppModal from '../UI/AppModal/AppModal'
import SecondButton from '../UI/SecondButton/SecondButton';

interface ActiveUsersModalProps {
  isOpen: boolean;
  users: IUserFull[];
  setIsOpen: (arg: boolean) => void;
  chooseUser: (arg: IUserFull) => void;
  setActive: (arg: boolean) => void;
}
 
const ActiveUsersModal:FC<ActiveUsersModalProps> = ({isOpen, setIsOpen, users, chooseUser, setActive}) => {
  return (
    <AppModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <UsersList handleChoose={chooseUser} users={users}/>
      <SecondButton handle={() => setActive(false)} text='Close'/>
    </AppModal>
  )
}

export default ActiveUsersModal