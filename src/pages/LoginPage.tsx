import { FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, currentUser } from '../app/feautures/userSlice'
import LoginBanner from "../components/LoginBanner"
import LoginForm from '../components/LoginForm'
import { ILogin } from '../types/types'

const LoginPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(currentUser);

  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleLogin = async(testik: ILogin) => {
    setErrorMessage('');
    try {
      const res = await signInWithEmailAndPassword(auth, testik.email, testik.password);
      const user = res.user;
      if (user.email && user.displayName && user.uid) {
        dispatch(addUser({username: user.displayName, email: user.email, uid: user.uid}));
      }
      navigate('/');
    } catch (error: any) {
      const errorMessage = error.message;
      setErrorMessage(errorMessage);
    }
  }
 
  return (
    <div className="app__content app__content_container app__content_login">
      <div className='login-page__content'>
        <LoginBanner/>
        <LoginForm
          handleLogin={handleLogin}
          visible={visible}
          handleVisible={handleVisible}
        />
        {errorMessage && <div className='error'>{errorMessage}</div>}
      </div>
      <p className='login-page__toggle'>Not a member? <Link to="/register"><span>Register now</span></Link></p>
    </div>
  )
}

export default LoginPage