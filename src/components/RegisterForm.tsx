import { FC } from 'react'
import { useForm } from 'react-hook-form';
import inputConfig from '../helpers/InputConfig';
import { IRegister } from '../types/types';
import ErrorMessage from './UI/ErrorMessage/ErrorMessage';
import MainButton from './UI/MainButton/MainButton'

interface RegisterFormProps {
  handleSubmitt: (data: IRegister) => void;
  visible: boolean,
  handleVisible: Function,
}

const RegisterForm:FC<RegisterFormProps> = ({handleSubmitt, visible, handleVisible}) => {

  const { register, formState: {errors}, handleSubmit } = useForm({});

  const onSubmit = (data: any) => {
    handleSubmitt(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-page__form">
      <div className='login-page__input-wrapper'>
        <input
          className='appInput'
          style={{padding: '20px'}}
          placeholder="Username"
          {...register('username', inputConfig())}
        />
        <ErrorMessage
          message={errors?.username?.message as string}
        />
      </div>
      <div className='login-page__input-wrapper'>
        <input
          className='appInput'
          style={{padding: '20px'}}
          placeholder="Email"
          {...register('email', {
            required: 'Area is requred!',
            pattern: {
              value: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]{2,3}$/i,
              message: 'invalid email address',
            },
          })}
        />
        <ErrorMessage
          message={errors?.email?.message as string}
        />
      </div>
      <div className='app-input__wrapper login-page__password login-page__input-wrapper'>
        <input
          className='appInput'
          style={{padding: '20px'}}
          placeholder="Password"
          type={visible ? 'text' : 'password'}
          {...register('password', inputConfig())}
        />
        <button 
          onClick={(e) => handleVisible(e)}
          className={visible ? 'login-page__password-icon login-page__password-icon_v' : 'login-page__password-icon'}>
        </button>
        <ErrorMessage
          message={errors?.password?.message as string}
        />
      </div>
      <MainButton text="Register"/>
    </form>
  )
}

export default RegisterForm