import '../styles/components/createPoint.scss';
import { FC, FormEvent, KeyboardEvent, useState } from "react"
import AppInput from "./UI/AppInput/AppInput"
import AppModal from './UI/AppModal/AppModal';
import MainButton from './UI/MainButton/MainButton';
import SecondButton from './UI/SecondButton/SecondButton';
import { IEvent } from '../types/types';
import { nanoid } from '@reduxjs/toolkit';

interface CreatePointProps {
  isOpen: boolean,
  setIsOpen: Function,
  setEvents: Function,
  eventCords: number[],
}

const CreatePoint:FC<CreatePointProps> = ({isOpen, setIsOpen, eventCords, setEvents}) => {

  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventNewInterest, setEventNewInterest] = useState('');
  const [eventInterest, setEventInterest] = useState<string[]>([]);

  const handleAdd = () => {
    if (eventName.length > 1 && eventName.length > 10) return;
    setEventInterest((prev) => [...prev, eventNewInterest]);
    setEventNewInterest('');
  }

  const handleRemove = (e: FormEvent<HTMLButtonElement>) => {
    setEventInterest(eventInterest.filter(event => event !== e.currentTarget.value));
  }

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && eventInterest.length <= 4) handleAdd();
  }

  const handleCreate = () => {
    if (eventName.length > 2 && eventLocation.length > 2) {
      setEvents((prev: IEvent[]) => [...prev,  {id: nanoid(), title: eventName, cords: eventCords, interest: eventInterest}])
      setIsOpen(false);
    }
  }

  return (  
    <AppModal style={{paddingTop: '60px'}} isOpen={isOpen} setIsOpen={setIsOpen}>
      <div>
        <h2 data-testid="create-point" className='heading'>Create a new event <br/> with friends</h2>
        <div className='create-point__info'>
          <AppInput value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder='Event name'/>
          <AppInput value={eventLocation} onChange={(e) => setEventLocation(e.target.value)}  placeholder='Event location'/>
        </div>
        <div className='create-point__interest'>
          <h3 className='second-heading create-point__interest-heading'>Interest</h3>
          <AppInput value={eventNewInterest} onChange={(e) => setEventNewInterest(e.target.value)} onKeyDown={(e) => handleEnter(e)} placeholder='Add interests'/>
          <ul className='create-point__interest-list'>
            {eventInterest.map(interest => 
              <button onClick={(e) => handleRemove(e)} key={interest} value={interest} className='create-point__interest-item'>{interest}</button> 
            )}
          </ul>
        </div>
      </div>
      <div className='create-point__buttons'>
        <MainButton handle={() => handleCreate()} text='Continue'/>
        <SecondButton handle={() => setIsOpen(false)} text='Cancel'/>
      </div>
    </AppModal>
  ) 
}

export default CreatePoint