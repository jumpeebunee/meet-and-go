import { FC } from 'react'
import cl from './ValueInput.module.scss';

interface ValueInputProps {
  title: string;
  body: string;
  value: number;
  add: () => void;
  remove: () => void;
}

const ValueInput:FC<ValueInputProps> = ({value, add, remove, title, body}) => {
  return (
    <div className={cl.valueInputContent}>
      <h2 className='second-heading'>{title}</h2>
      <p>{body}</p>
      <div className={cl.valueInputPointInput}>
        <button className={cl.valueInputPointInputButton} onClick={remove}>-</button>
        <div>{value}</div>
        <button className={cl.valueInputPointInputButton} onClick={add}>+</button>
      </div>
    </div>
  )
}

export default ValueInput