import React, { FC } from 'react'

interface UserProfileMainProps {
  username: string,
  reputation: number,
}

const UserProfileMain:FC<UserProfileMainProps> = ({username, reputation}) => {
  return (
    <div className='user-profile__user'>
      <div className='user-profile__user-image'>
        <div className='user-profile__user-image_online'></div>
      </div>
      <h2 className='heading'>{username}</h2>
      <p>Reputation: {reputation}</p>
    </div>
  )
}

export default UserProfileMain