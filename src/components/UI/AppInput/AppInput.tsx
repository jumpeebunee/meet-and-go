import { FC } from 'react';
import cl from './AppInput.module.css';

type InputProps = React.ComponentProps<'input'>

const AppInput:FC<InputProps> = (props) => {
  return (
    <input className={cl.appInput} {...props}/>
  )
}

export default AppInput