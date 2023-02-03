import React, { FC } from 'react'

interface AppListProps {
  children: React.ReactNode,
}

const AppList:FC<AppListProps> = ({children}) => {
  return (
    <ul className='user-profile__list'>
      {children}
    </ul>
  )
}

export default AppList