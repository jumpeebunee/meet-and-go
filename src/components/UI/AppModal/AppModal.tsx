import { FC, ReactNode } from 'react';
import cl from './appModal.module.css';

interface AppModalProps {
  isOpen: Boolean,
  setIsOpen: Function,
  children: ReactNode,
  style: React.CSSProperties,
}

const AppModal:FC<AppModalProps> = ({isOpen, setIsOpen, children, style}) => {

  const rootClasses = [cl.appModal];
  if (isOpen) rootClasses.push(cl.appModalActive);

  return (
    <div onClick={() => setIsOpen(false)} className={rootClasses.join(' ')}>
      <div style={style} onClick={(e) => e.stopPropagation()} className={cl.appModalContent}>
        {children}
      </div>
    </div>
  )
}

export default AppModal