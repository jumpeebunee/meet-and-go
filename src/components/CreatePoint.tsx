import '../styles/components/createPoint.scss';
import { FC } from "react"
import AppInput from "./UI/AppInput/AppInput"
import AppModal from './UI/AppModal/AppModal';
import MainButton from './UI/MainButton/MainButton';
import SecondButton from './UI/SecondButton/SecondButton';

interface CreatePointProps {
  isOpen: boolean,
  setIsOpen: Function,
  setEvents: Function,
  eventCords: number[],
  setEventCords: Function,
}

const CreatePoint:FC<CreatePointProps> = ({isOpen, setIsOpen, setEventCords, eventCords, setEvents}) => {
  return (  
    <AppModal style={{paddingTop: '60px'}} isOpen={isOpen} setIsOpen={setIsOpen}>
      <div>
        <h2 data-testid="create-point" className='heading'>Create a new event <br/> with friends</h2>
        <div className='create-point__info'>
          <AppInput placeholder='Event name'/>
          <AppInput placeholder='Event location'/>
        </div>
        <div className='create-point__interest'>
          <h3 className='second-heading create-point__interest-heading'>Interest</h3>
          <AppInput placeholder='Add interests'/>
          <ul className='create-point__interest-list'>
            {/* <li className='create-point__interest-item'>Test</li> */}
          </ul>
        </div>
      </div>
      <div className='create-point__buttons'>
        <MainButton text='Continue'/>
        <SecondButton text='Cancel'/>
      </div>
    </AppModal>
  ) 
}

export default CreatePoint