import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { currentUserContent } from '../app/feautures/userSlice';
import { doc, updateDoc } from "firebase/firestore";
import { validatePhone } from '../helpers/validatePhone';
import { db, auth } from '../firebase';
import AppModal from './UI/AppModal/AppModal'
import SecondButton from './UI/SecondButton/SecondButton';
import MainButton from './UI/MainButton/MainButton';
import UserProfileMain from './UserProfileMain';
import UserProfileBaseItem from './UserProfileBaseItem';
import UserProfileEditableItem from './UserProfileEditableItem';
import AppList from './AppComponents/AppList';

interface UserProfileProps {
  isOpen: boolean,
  setIsOpen: (arg: boolean) => void,
}
 
const UserProfile:FC<UserProfileProps> = ({isOpen, setIsOpen}) => {

  const currentUser = useSelector(currentUserContent);

  const [phone, setPhone] = useState(currentUser.phone);
  const [town, setTown] = useState(currentUser.town);
  const [isEdit, setIsEdit] = useState(false);
  const [isError, setIsError] = useState('');

  const handleEdit = async() => {
    if (isEdit) {
      if (validatePhone(phone)) {
        setIsEdit(false);
        const userRef = doc(db, "users", currentUser.uid);
        await updateDoc(userRef, {
          phone,
          town,
        });
      } else {
        setIsError('Wrong number!');
      }
    } else {
      setIsEdit(true);
      setIsError('');
    }
  }

  const changePhone = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target.value;
    setPhone(target); 
    return;
  }

  const changeTown = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target.value;
    if (target.length >= 0 && target.length < 12) {
      setTown(target);
    }
    return;
  }

  const handleClose = () => {
    if (isError) {
      setPhone(currentUser.phone);
      setIsError('');
    }
    setIsOpen(false);
  }

  useEffect(() => {
    if (isEdit && !isOpen) {
      setIsEdit(false);
    }
  },[isOpen])

  return (
    <AppModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className='user-profile__wrapper'>
        <button onClick={() => auth.signOut()} className='user-profile__logout'></button>
        <UserProfileMain username={currentUser.username} reputation={currentUser.reputation}/>
        <AppList>
          <UserProfileBaseItem title="Total meets" body={currentUser.totalMeets}/>
          <UserProfileBaseItem title="Created meets" body={currentUser.createdMeets}/>
          <UserProfileEditableItem 
            title="Town"
            placeholder="Your phone" 
            isEdit={isEdit} 
            current={town}
            changeCurrent={changeTown}
          />
          <UserProfileEditableItem 
            title="Phone"
            placeholder="Your phone" 
            isEdit={isEdit} 
            current={phone}
            changeCurrent={changePhone}
          />
          {isError && <div className='error'>{isError}</div>}
        </AppList>
      </div>
      <div className='user-profile__btns'>
        <MainButton handle={() => handleEdit()} text={isEdit ? 'Confirm' : 'Edit profile'}/>
        <SecondButton handle={handleClose} text={'Close'}/>
      </div>
    </AppModal>
  )
}

export default UserProfile