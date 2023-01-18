import '../styles/pages/loginPage.scss'
import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase';
import LoginBanner from "../components/LoginBanner"
import AppInput from "../components/UI/AppInput/AppInput"
import MainButton from "../components/UI/MainButton/MainButton"

const RegisterPage = () => {

  const [visible, setVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({name: '', email: '', password: ''});
  const [errors, setErrors] = useState({name: false, email: false, password: false})
  const [serverError, setServerError] = useState('');

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
        <form onSubmit={(e) => handleSubmit(e)} className="login-page__form">
          <div>
            <AppInput
              style={{padding: '20px'}}
              placeholder="Username"
              onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
            />
            {errors.name && <p className='error'>Enter valid name</p>}
          </div>
          <div>
            <AppInput
              style={{padding: '20px'}}
              placeholder="Email"
              onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
            />
            {errors.email && <p className='error'>Enter valid email</p>}
          </div>
          <div>
            <div className='login-page__password'>
              <AppInput
                autoComplete='true'
                style={{padding: '20px'}}
                placeholder="Password"
                type={visible ? 'text' : 'password'}
                onChange={(e) => setUserInfo({...userInfo, password: e.target.value})}
              />
              <button 
                onClick={(e) => handleVisible(e)}
                className={visible ? 'login-page__password-icon login-page__password-icon_v' : 'login-page__password-icon'}>
              </button>
            </div>
            {errors.password && <p className='error'>Enter valid password</p>}
          </div>
          <MainButton text="Register"/>
        </form>
        {serverError && <p className='error'>{serverError}</p>}
      </div>
      <p className='login-page__toggle'>Already register? <Link to="/login"><span>Sign in</span></Link></p>
    </div>
  ) 
}

export default RegisterPage