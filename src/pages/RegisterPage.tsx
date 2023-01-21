import '../styles/pages/loginPage.scss'
import {createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore"; 
import { useState, FormEvent, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, addUserContent, currentUser } from '../app/feautures/userSlice';
import { db } from '../firebase';
import LoginBanner from "../components/LoginBanner"
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(currentUser);

  const [visible, setVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({name: '', email: '', password: ''});
  const [errors, setErrors] = useState({name: false, email: false, password: false})
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

  const validate = () => {
    const name = userInfo.name.trim().length >= 3 && userInfo.name.trim().length <= 12;
    const email = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]{2,3}$/.test((userInfo.email.trim()));
    const password = userInfo.password.trim().length >= 6;

    setErrors({name: !name, email: !email, password: !password});
    return true ? (name && email && password) : false;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({name: false, email: false, password: false});
    if (validate()) {
      try {
        const response = await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password);
        await updateProfile(response.user, { displayName: userInfo.name });
        dispatch(addUser({username: userInfo.name, email: userInfo.email, uid: response.user.uid}));
        await setDoc(doc(db, "users", response.user.uid), {
          uid: response.user.uid,
          username: userInfo.name,
          email: userInfo.email,
          reputation: 0,
          phone: '',
          town: '',
          interests: [],
          totalMeets: 0,
          createdMeets: 0,
        });
        dispatch((addUserContent({          
          uid: response.user.uid,
          username: userInfo.name,
          email: userInfo.email,
          reputation: 0,
          phone: '',
          town: '',
          interests: [],
          totalMeets: 0,
          createdMeets: 0,
        })))
        navigate('/');
      } catch (e: any) {
        const errorMessage = e.message;
        setServerError(errorMessage);
      }
    } else {
      return;
    }
  }

  return (
    <div className="app__content app__content_container app__content_login">
      <div className='login-page__content'>
        <LoginBanner/>
        <RegisterForm
          userInfo={userInfo}
          handleSubmit={handleSubmit}
          setUserInfo={setUserInfo}
          errors={errors}
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