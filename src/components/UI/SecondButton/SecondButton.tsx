import { FC } from 'react';
import cl from './secondButton.module.css';

interface MainButtonProps {
  text: string,
}

const SecondButton:FC<MainButtonProps> = ({text}) => {
  return (
    <button className={cl.mainButton}>{text}</button>
  )
}

export default SecondButton