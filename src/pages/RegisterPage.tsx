import '../styles/pages/loginPage.scss'
import { Link } from 'react-router-dom'
import LoginBanner from "../components/LoginBanner"
import AppInput from "../components/UI/AppInput/AppInput"
import MainButton from "../components/UI/MainButton/MainButton"

const RegisterPage = () => {
  return (
    <div className="app__content app__content_container app__content_login">
      <div className='login-page__content'>
        <LoginBanner/>
        <form className="login-page__form">
          <AppInput
            style={{padding: '20px'}}
            placeholder="Username"
          />
          <AppInput
            style={{padding: '20px'}}
            placeholder="Email"
          />
          <AppInput
            style={{padding: '20px'}}
            placeholder="Password"
          />
          <MainButton handle={() => console.log('q')} text="Register"/>
        </form>
      </div>
      <p className='login-page__toggle'>Already register? <Link to="/login"><span>Sign in</span></Link></p>
    </div>
  )
}

export default RegisterPage