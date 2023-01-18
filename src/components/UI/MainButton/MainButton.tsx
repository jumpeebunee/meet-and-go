import { FC } from 'react';
import cl from './mainButton.module.css';

interface MainButtonProps {
  text: string,
  handle?: Function,
}

const MainButton:FC<MainButtonProps> = ({text, handle}) => {
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

export default MainButton