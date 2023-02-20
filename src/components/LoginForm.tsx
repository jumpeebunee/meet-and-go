import { FC, FormEvent } from 'react'
import { useForm } from 'react-hook-form';
import inputConfig from '../helpers/InputConfig';
import { ILogin } from '../types/types';
import ErrorMessage from './UI/ErrorMessage/ErrorMessage';
import MainButton from './UI/MainButton/MainButton'

interface LoginFormProps {
  handleVisible: (e: FormEvent<HTMLButtonElement>) => void,
  handleLogin: (testik: ILogin) => void;
  visible: boolean
}

const LoginForm:FC<LoginFormProps> = ({handleLogin, visible, handleVisible}) => {

  const { register, formState: {errors}, handleSubmit } = useForm({});

  const onSubmit = (data: any) => {
    handleLogin(data);
  }

  return (
    <form className='login-page__form' onSubmit={handleSubmit(onSubmit)}>
      <div className='app-input__wrapper'>
        <input 
          style={{padding: '20px'}}
          className='appInput'
          placeholder="Email"
          {...register('email', inputConfig())}
        />
        <ErrorMessage
          message={errors?.email?.message as string}
        />
      </div>
      <div className='app-input__wrapper login-page__password login-page__input-wrapper'>
        <input 
          type={visible ? 'text' : 'password'}
          style={{padding: '20px'}}
          className='appInput'
          placeholder="Password"
          {...register('password', inputConfig())}
        />
        <ErrorMessage
          message={errors?.password?.message as string}
        />
          <button 
            onClick={(e) => handleVisible(e)}
            className={visible ? 'login-page__password-icon login-page__password-icon_v' : 'login-page__password-icon'}>
          </button>
      </div>
      <MainButton text="Sign in"/>
    </form>
  )
}

export default LoginForm