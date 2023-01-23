import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { currentUserContent } from '../app/feautures/userSlice';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';
import AppModal from './UI/AppModal/AppModal'
import SecondButton from './UI/SecondButton/SecondButton';
import MainButton from './UI/MainButton/MainButton';

interface UserProfileProps {
  isOpen: boolean,
  setIsOpen: Function,
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
    if (target.length > 0 && target.length < 12) {
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
        <div className='user-profile__user'>
          <div className='user-profile__user-image'>
            <div className='user-profile__user-image_online'></div>
          </div>
          <h2 className='heading'>{currentUser.username}</h2>
          <p>Reputation: {currentUser.reputation}</p>
        </div>
        <ul className='user-profile__list'>
          <li>
            <h3>Total meets</h3>
            <p>{currentUser.totalMeets}</p>
          </li>
          <li>
            <h3>Created meets</h3>
            <p>{currentUser.createdMeets}</p>
          </li>
          <li>
            <h3>Town</h3>
            <input 
              value={town}
              onChange={(e) => changeTown(e)}
              disabled={!isEdit}
              placeholder='Your town' 
              className={isEdit ? 'user-profile__input user-profile__input_active' : 'user-profile__input'}
              />
          </li>
          <li>
            <h3>Phone</h3>
            <input 
              value={phone}
              onChange={(e) => changePhone(e)}
              disabled={!isEdit} 
              type="tel"
              placeholder='Your phone' 
              className={isEdit ? 'user-profile__input user-profile__input_active' : 'user-profile__input'}
              />
          </li>
        </ul>
      </div>
      <div className='user-profile__btns'>
        <MainButton handle={() => handleEdit()} text={isEdit ? 'Confirm' : 'Edit profile'}/>
        <SecondButton handle={() => setIsOpen(false)} text={'Cancel'}/>
      </div>
    </AppModal>
  )
}

export default UserProfile