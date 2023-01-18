import '../styles/pages/loginPage.scss'
import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { addUser } from '../app/feautures/userSlice'
import LoginBanner from "../components/LoginBanner"
import AppInput from "../components/UI/AppInput/AppInput"
import MainButton from "../components/UI/MainButton/MainButton"

const LoginPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userInfo, setUserInfo] = useState({email: '', password: ''});

  const handleVisible = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setVisible(prev => !prev);
  }

  const validate = () => {
    const email = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]{2,3}$/.test((userInfo.email.trim()));
    const password = userInfo.password.trim().length >= 6;
    return true ? (email && password) : false;
  }

  const handleLogin = async(e: FormEvent<HTMLFormElement>) => {
    setErrorMessage('');
    e.preventDefault();
    if (validate()) {
      try {
        const res = await signInWithEmailAndPassword(auth, userInfo.email, userInfo.password);
        const user = res.user;
        if (user.email && user.displayName && user.uid) {
          dispatch(addUser({username: user.displayName, email: user.email, uid: user.uid}));
        }
        navigate('/');
      } catch (error: any) {
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
      }
    } else {
      setErrorMessage('Enter valid data');
    }
  }
 
  return (
    <div className="app__content app__content_container app__content_login">
      <div className='login-page__content'>
        <LoginBanner/>
        <form onSubmit={(e) => handleLogin(e)} className="login-page__form">
          <AppInput
            value={userInfo.email}
            onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
            style={{padding: '20px'}}
            placeholder="Email"
          />
          <div className='login-page__password'>
            <AppInput
              value={userInfo.password}
              onChange={(e) => setUserInfo({...userInfo, password: e.target.value})}
              style={{padding: '20px'}}
              placeholder="Password"
              autoComplete='true'
              type={visible ? 'text' : 'password'}
            />
            <button 
              onClick={(e) => handleVisible(e)}
              className={visible ? 'login-page__password-icon login-page__password-icon_v' : 'login-page__password-icon'}>
            </button>
          </div>
          {errorMessage && <div style={{marginTop: '-10px'}} className='error'>{errorMessage}</div>}
          <MainButton text="Sign in"/>
        </form>
      </div>
      <p className='login-page__toggle'>Not a member? <Link to="/register"><span>Register now</span></Link></p>
    </div>
  )
}

export default LoginPage