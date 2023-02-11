import { FC } from 'react'

interface AccountBtnProps {
  image: string;
  handleOpen: (arg: boolean) => void;
}

const AccountBtn:FC<AccountBtnProps> = ({handleOpen, image}) => {
  return (
    <button onClick={() => handleOpen(true)} className='app__profile'>
      <div>Account</div>
      <div className='app__profile-avatar'>
        <img alt="Avatar" src={image}/>
      </div>
    </button>
  )
}

export default AccountBtn