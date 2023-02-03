import { FC, FormEvent } from 'react'
import AppInput from './UI/AppInput/AppInput'
import MainButton from './UI/MainButton/MainButton'

type IInfo = {
  password: string;
  email: string;
  name: string;
}

type IError = { 
  password: boolean;
  email: boolean;
  name: boolean;
}

interface RegisterFormProps {
  userInfo: IInfo;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  setUserInfo: Function,
  errors: IError,
  visible: boolean,
  handleVisible: Function,
}

const RegisterForm:FC<RegisterFormProps> = ({handleSubmit, setUserInfo, userInfo, errors, visible, handleVisible}) => {
  return (
    <form onSubmit={(e) => handleSubmit(e)} className="login-page__form">
      <div className='login-page__input-wrapper'>
        <AppInput
          style={{padding: '20px'}}
          placeholder="Username"
          onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
        />
        {errors.name && <p className='error'>Enter valid name</p>}
      </div>
      <div className='login-page__input-wrapper'>
        <AppInput
          style={{padding: '20px'}}
          placeholder="Email"
          onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
        />
        {errors.email && <p className='error'>Enter valid email</p>}
      </div>
      <div className='login-page__input-wrapper'>
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
  )
}

export default RegisterForm