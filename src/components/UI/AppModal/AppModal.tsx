import { FC, ReactNode } from 'react';
import cl from './appModal.module.css';

interface AppModalProps {
  dataTest?: string;
  isOpen: Boolean,
  setIsOpen: Function,
  children: ReactNode,
  style?: React.CSSProperties,
}

const AppModal:FC<AppModalProps> = ({dataTest, isOpen, setIsOpen, children, style}) => {

  const rootClasses = [cl.appModal];
  if (isOpen) rootClasses.push(cl.appModalActive);

  return (
    <div data-testid={dataTest ? dataTest : ''} onClick={() => setIsOpen(false)} className={rootClasses.join(' ')}>
      <div style={style} onClick={(e) => e.stopPropagation()} className={cl.appModalContent}>
        {children}
      </div>
    </div>
  )
}

export default AppModal