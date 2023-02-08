import { FC } from 'react'
import { IUserFull } from '../../types/types';
import UserAbout from '../AppComponents/UserAbout'
import AppModal from '../UI/AppModal/AppModal'
import SecondButton from '../UI/SecondButton/SecondButton'

interface UserAccountModalProps {
  isOpen: boolean;
  user: IUserFull| null;
  setIsOpen: (arg: boolean) => void;
  handleclose: (arg: boolean | undefined) => void;
}

const UserAccountModal:FC<UserAccountModalProps> = ({isOpen, setIsOpen, user, handleclose}) => {
  return (
    <AppModal isOpen={isOpen} setIsOpen={setIsOpen}> 
      <UserAbout user={user}/>
      <SecondButton handle={handleclose} text="Close"></SecondButton>
    </AppModal>
  )
}

export default UserAccountModal