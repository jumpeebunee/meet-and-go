import { FC } from 'react';
import cl from './secondButton.module.css';

interface MainButtonProps {
  text: string,
  handle?: (arg?: boolean) => void,
}

const SecondButton:FC<MainButtonProps> = ({text, handle}) => {
  if (handle) {
    return (
      <button onClick={() => handle()} className={cl.mainButton}>{text}</button>
    )
  } else {
    return (
      <button className={cl.mainButton}>{text}</button>
    )
  }
}

export default SecondButton