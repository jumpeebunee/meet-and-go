import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { currentUserContent } from '../app/feautures/userSlice';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';
import AppModal from './UI/AppModal/AppModal'
import SecondButton from './UI/SecondButton/SecondButton';
import MainButton from './UI/MainButton/MainButton';
import UserProfileMain from './UserProfileMain';
import UserProfileBaseItem from './UserProfileBaseItem';
import UserProfileEditableItem from './UserProfileEditableItem';
import AppList from './AppList';

interface UserProfileProps {
  isOpen: boolean,
  setIsOpen: (arg: boolean) => void,
}
 
const UserProfile:FC<UserProfileProps> = ({isOpen, setIsOpen}) => {

  const currentUser = useSelector(currentUserContent);

  const [phone, setPhone] = useState(currentUser.phone);
  const [town, setTown] = useState(currentUser.town);
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = async() => {
    if (isEdit) {
      setIsEdit(false);
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        phone,
        town,
      });
    } else {
      setIsEdit(true);

    }
  }

  const changePhone = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target.value;
    if ((+target || target.length === 0) && +target.length <= 12) {
      setPhone(target);
    }
    return;
  }

  const changeTown = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target.value;
    if (target.length >= 0 && target.length < 12) {
      setTown(target);
    }
    return;
  }

  useEffect(() => {
    if (isEdit && !isOpen) {
      setIsEdit(false);
    }
  },[isOpen])

  return (
    <AppModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div>
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
        </AppList>
      </div>
      <div className='user-profile__btns'>
        <MainButton handle={() => handleEdit()} text={isEdit ? 'Confirm' : 'Edit profile'}/>
        <SecondButton handle={() => setIsOpen(false)} text={'Cancel'}/>
      </div>
    </AppModal>
  )
}

export default UserProfile