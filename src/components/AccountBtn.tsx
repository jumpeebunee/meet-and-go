import React, { FC } from 'react'

interface AccountBtnProps {
  image: string;
  handleOpen: (arg: boolean) => void;
}

const AccountBtn:FC<AccountBtnProps> = ({handleOpen, image}) => {
  return (
    <>
      <button onClick={() => handleOpen(true)} className='app__profile'>
        <div>Account</div>
        <div className='app__profile-avatar'>
          <img alt="Avatar" src={image}/>
        </div>
      </button>
      <button className='app__events'><span></span></button>
    </>
  )
}

export default AccountBtn