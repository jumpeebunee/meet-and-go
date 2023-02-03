import { FC, FormEvent } from 'react'
import AppInput from './UI/AppInput/AppInput'
import MainButton from './UI/MainButton/MainButton'

type IInfo = {
  email: string,
  password: string,
}

interface LoginFormProps {
  userInfo: IInfo,
  handleLogin: (e: FormEvent<HTMLFormElement>) => void;
  setUserInfo: Function,
  visible: boolean
  handleVisible: Function,
  errorMessage: string,
}

const LoginForm:FC<LoginFormProps> = ({userInfo, handleLogin, setUserInfo, visible, handleVisible, errorMessage}) => {
  return (
    <form onSubmit={(e) => handleLogin(e)} className="login-page__form">
      <AppInput
        value={userInfo.email}
        onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
        style={{padding: '20px'}}
        placeholder="Email"
      />
      <div className='login-page__password login-page__input-wrapper'>
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
  )
}

export default LoginForm