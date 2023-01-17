import '../styles/components/userProfile.scss';
import { FC } from 'react'
import AppModal from './UI/AppModal/AppModal'
import SecondButton from './UI/SecondButton/SecondButton';

interface UserProfileProps {
  isOpen: boolean,
  setIsOpen: Function,
}
 
const UserProfile:FC<UserProfileProps> = ({isOpen, setIsOpen}) => {
  return (
    <AppModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div>
        <div className='user-profile__user'>
          <div className='user-profile__user-image'>
            <div className='user-profile__user-image_online'></div>
          </div>
          <h2 className='heading'>Alex Fame</h2>
          <p>Reputation: 4.6</p>
        </div>
        <ul className='user-profile__list'>
          <li>
            <h3>Total meets</h3>
            <p>42</p>
          </li>
          <li>
            <h3>Created meets</h3>
            <p>5</p>
          </li>
          <li>
            <h3>Town</h3>
            <p>Dmitrov</p>
          </li>
          <li>
            <h3>Phone</h3>
            <p>+81113123123123</p>
          </li>
        </ul>
      </div>
      <SecondButton handle={() => setIsOpen(false)} text={'Cancel'}/>
    </AppModal>
  )
}

export default UserProfile