import React, { FC } from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase'
import { auth } from '../firebase';
import { doc, updateDoc } from "firebase/firestore";
import { updateProfile } from 'firebase/auth';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { currentUserContent } from '../app/feautures/userSlice';
import { addUserImage } from '../app/feautures/userSlice';
import { db } from '../firebase';

interface UserProfileMainProps {
  username: string,
  reputation: number,
}

const UserProfileMain:FC<UserProfileMainProps> = ({username, reputation}) => {

  const currentUser = useAppSelector(currentUserContent);
  const dispatch = useAppDispatch();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const storageRef = ref(storage, username);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', 
      (snapshot) => {},
      (error) => {}, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
          dispatch(addUserImage(downloadURL));
          await updateProfile(auth.currentUser as any, { photoURL: downloadURL, })
          const userRef = doc(db, "users", currentUser.uid);
          await updateDoc(userRef, { image: downloadURL, });
        });
      }
    );
  }

  return (
    <div className='user-profile__user'>
      <div className='user-profile__user-image'>
        <img src={currentUser.image}/>
        <div className='user-profile__user-change'></div>
        <div className='user-profile__user-image_online'></div>
        <input onChange={(e) => handleFileChange(e)} type="file"/>
      </div>
      <h2 className='user-profile__heading heading'>{username}</h2>
      <p>Reputation: {reputation}</p>
    </div>
  )
}

export default UserProfileMain