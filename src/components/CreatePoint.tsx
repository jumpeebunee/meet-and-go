import { FC, useState } from "react"
import { IEvent } from '../types/types';
import { nanoid } from '@reduxjs/toolkit';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../firebase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AppInput from "./UI/AppInput/AppInput"
import AppModal from './UI/AppModal/AppModal';
import MainButton from './UI/MainButton/MainButton';
import SecondButton from './UI/SecondButton/SecondButton';

interface CreatePointProps {
  isOpen: boolean,
  eventCords: number[],
  setIsOpen: (arg: boolean) => void,
}

const CreatePoint:FC<CreatePointProps> = ({isOpen, setIsOpen, eventCords}) => {

  const [price, setPrice] = useState('0');
  const [participants, setParticipants] = useState(2);
  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [startDate, setStartDate] = useState<Date | string>();

  const handleCreate = async() => {
    if (eventName.length > 2 && eventLocation.length > 2 && startDate) {
      await addDoc(collection(db, "events"), {
        id: nanoid(),
        title: eventName,
        cords: eventCords,
        place: eventLocation, 
        date: startDate,
        contribution: price,
        participants: participants,
      })
      setPrice('0');
      setParticipants(2);
      setEventName('');
      setEventLocation('');
      setStartDate('');
      setIsOpen(false);
    } else {
      console.log('Иди нахуй')
    }
  }

  const handleAdd = () => {
    if (participants >= 10) return;
    setParticipants(prev => prev + 1);
  }

  const handleRemove = () => {
    if (participants <= 2) return;
    setParticipants(prev => prev - 1);
  }

  return (  
    <AppModal style={{paddingTop: '60px'}} isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className='create-pont__main'>
        <h2 data-testid="create-point" className='heading'>Create a new event <br/> with friends</h2>
        <div className='create-point__info'>
          <AppInput value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder='Event name'/>
          <AppInput value={eventLocation} onChange={(e) => setEventLocation(e.target.value)}  placeholder='Event location'/>
          <DatePicker 
            className='app-input'
            showTimeSelect
            minDate={new Date()}
            selected={startDate as Date}
            closeOnScroll={true}
            placeholderText="Event date"
            fixedHeight
            onChange={(date: Date) => setStartDate(date)} 
          />
        </div>
        <div className='create-point__participants'>
          <h2 className='second-heading'>Participants</h2>
          <p>Number of participants</p>
          <div className='create-point__point__participants-input'>
            <button onClick={handleRemove}>-</button>
            <div>{participants}</div>
            <button onClick={handleAdd}>+</button>
          </div>
        </div>
        <div className='create-point__money'>
          <h2 className='second-heading'>Сontribution</h2>
          <p>Initial payment</p>
          <div className='create-point__money-input'>
            <input 
              className='create-point__range'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              step="10"
              min="0" max="100"
              type="range"
            />
            <p>${price}</p>
          </div>
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