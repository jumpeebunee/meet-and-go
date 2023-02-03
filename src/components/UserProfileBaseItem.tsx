import React, { FC } from 'react'

interface UserProfileBaseItem {
  title: string | number,
  body: string | number,
}

const UserProfileBaseItem:FC<UserProfileBaseItem> = ({title, body}) => {
  return (
    <li>
      <h3>{title}</h3>
      <p>{body}</p>
    </li>
  )
}

export default UserProfileBaseItem