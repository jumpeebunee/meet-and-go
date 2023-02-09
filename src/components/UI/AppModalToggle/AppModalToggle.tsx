import { FC } from "react"
import MainButton from "../MainButton/MainButton";
import SecondButton from "../SecondButton/SecondButton";
import cl from './appModalToggle.module.css';

interface AppModalToggleProps {
  text: string;
  isOpen: Boolean;
  setIsOpen: (arg: boolean) => void;
  handleTrue: () => void;
}

const AppModalToggle:FC<AppModalToggleProps> = ({isOpen, setIsOpen, text, handleTrue}) => {

  const rootClasses = [cl.appModal];
  if (isOpen) rootClasses.push(cl.appModalActive);

  return (
    <div onClick={() => setIsOpen(false)} className={rootClasses.join(' ')}>
      <div onClick={(e) => e.stopPropagation()} className={cl.appModalContent}>
        <h2 className={cl.appModalHeading}>{text}</h2>
        <div className={cl.appModalBtns}>
          <MainButton handle={handleTrue} text={"Yes"}/>
          <SecondButton handle={() => setIsOpen(false)} text={"No"}/>
        </div>
      </div>
    </div>
  )
}

export default AppModalToggle