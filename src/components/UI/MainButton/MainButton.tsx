import { FC, FormEvent } from 'react';
import cl from './mainButton.module.css';

interface MainButtonProps {
  text: string;
  form?: string;
  handle?: (e?: FormEvent) => void;
}

const MainButton:FC<MainButtonProps> = ({text, form, handle}) => {
  if (handle) {
    return (
      <button form={form ? form : ''} onClick={() => handle()} className={cl.mainButton}>{text}</button>
    )
  } else {
    return (
      <button className={cl.mainButton}>{text}</button>
    )
  }
}

export default MainButton