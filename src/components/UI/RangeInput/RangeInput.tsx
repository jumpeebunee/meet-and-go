import { FC } from 'react'
import cl from './RangeInput.module.scss';

interface RangeInputProps {
  title: string;
  body: string;
  value: string;
  setValue: (val: string) => void;
}

const RangeInput:FC<RangeInputProps> = ({title, body, value, setValue}) => {
  return (
    <div className={cl.rangeInput}>
      <h2 className='second-heading'>{title}</h2>
      <p>{body}</p>
      <div className={cl.rangeIpnutInput}>
        <input 
          className={cl.rangeInputRange}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          step="10"
          min="0" max="100"
          type="range"
        />
        <p>${value}</p>
      </div>
    </div>
  )
}

export default RangeInput