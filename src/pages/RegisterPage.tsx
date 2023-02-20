import { useState, FormEvent, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { addUser, addUserContent, currentUser } from '../app/feautures/userSlice';
import {createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore"; 
import { auth } from '../firebase';
import { db } from '../firebase';
import { IRegister } from "../types/types";
import { baseUserInfo } from "../dataConfig/baseUserInfo";
import LoginBanner from "../components/LoginBanner"
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(currentUser);

  const [visible, setVisible] = useState(false);
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    if (user.uid) {
      signOut(auth);
      dispatch(addUser({username: '', email: '', uid: ''}))
    }  
  }, [])

  const handleVisible = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setVisible(prev => !prev);
  }

  const handleSubmit = async(data: IRegister) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(response.user, { displayName: data.username });
      dispatch(addUser({username: data.username, email: data.email, uid: response.user.uid}));
      await setDoc(doc(db, "users", response.user.uid), {
        ...baseUserInfo,
        uid: response.user.uid,
        username: data.username,
        email: data.email,
      });
      dispatch((addUserContent({   
        ...baseUserInfo,       
        uid: response.user.uid,
        username: data.username,
        email: data.email,
      })))
      navigate('/');
      } catch (e: any) {
        const errorMessage = e.message;
        setServerError(errorMessage);
    }
  }

  return (
    <div className="app__content app__content_container app__content_login">
      <div className='login-page__content'>
        <LoginBanner/>
        <RegisterForm
          handleSubmitt={handleSubmit}
          visible={visible}
          handleVisible={handleVisible}
        />
        {serverError && <p className='error'>{serverError}</p>}
      </div>
      <p className='login-page__toggle'>Already register? <Link to="/login"><span>Sign in</span></Link></p>
    </div>
  ) 
}

export default RegisterPage