import { FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, currentUser } from '../app/feautures/userSlice'
import LoginBanner from "../components/LoginBanner"
import LoginForm from '../components/LoginForm'

const LoginPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(currentUser);

  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userInfo, setUserInfo] = useState({email: '', password: ''});

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
        <LoginForm
          userInfo={userInfo}
          handleLogin={handleLogin}
          setUserInfo={setUserInfo}
          visible={visible}
          handleVisible={handleVisible}
          errorMessage={errorMessage}
        />
      </div>
      <p className='login-page__toggle'>Not a member? <Link to="/register"><span>Register now</span></Link></p>
    </div>
  )
}

export default LoginPage