import { FC } from 'react';
import cl from './mainButton.module.css';

interface MainButtonProps {
  text: string,
}

const MainButton:FC<MainButtonProps> = ({text}) => {
  return (
    <button className={cl.mainButton}>{text}</button>
  )
}

export default MainButton