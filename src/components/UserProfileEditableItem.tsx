import React, { FC, ChangeEvent } from 'react'

interface UserProfileEditableItemProps {
  title: string,
  placeholder: string,
  isEdit: boolean,
  current: string,
  changeCurrent: (arg: ChangeEvent<HTMLInputElement>) => void,
}

const UserProfileEditableItem:FC<UserProfileEditableItemProps> = ({title, placeholder, isEdit, current, changeCurrent}) => {
  return (
    <li>
      <h3>{title}</h3>
      {isEdit
        ?
        <input  
          value={current}
          onChange={(e) => changeCurrent(e)}
          autoFocus
          type="tel"
          placeholder='Your phone' 
          className={isEdit ? 'user-profile__input user-profile__input_active' : 'user-profile__input'}
        />
        : 
        <div className='user-profile__input'>{current ? current : placeholder}</div>
      }
    </li>
  )
}

export default UserProfileEditableItem