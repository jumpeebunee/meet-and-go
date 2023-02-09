import { FC, useState } from "react"
import { nanoid } from '@reduxjs/toolkit';
import { setDoc, doc } from "firebase/firestore"; 
import { db } from "../firebase";
import { useAppSelector } from "../app/hooks";
import { currentUserContent } from "../app/feautures/userSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AppInput from "./UI/AppInput/AppInput"
import AppModal from './UI/AppModal/AppModal';
import MainButton from './UI/MainButton/MainButton';
import SecondButton from './UI/SecondButton/SecondButton';

interface CreatePointProps {
  isOpen: boolean;
  eventCords: number[];
  setIsOpen: (arg: boolean) => void;
  addEventToUser: (id: string) => void;
}

const CreatePoint:FC<CreatePointProps> = ({isOpen, setIsOpen, eventCords, addEventToUser}) => {

  const user = useAppSelector(currentUserContent);

  const [price, setPrice] = useState('0');
  const [participants, setParticipants] = useState(2);
  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [startDate, setStartDate] = useState<Date>();

  const handleCreate = async() => {
    if (eventName.length > 2 && eventLocation.length > 2 && startDate) {
      const eventId = nanoid();
      const newEvent = {
        id: eventId,
        title: eventName,
        cords: eventCords,
        place: eventLocation, 
        date: startDate,
        contribution: price,
        participants: participants,
        activeUsers: [{...user}],
      }
      await setDoc(doc(db, "events", eventId), newEvent);
      addEventToUser(newEvent.id);
      setPrice('0');
      setParticipants(2);
      setEventName('');
      setEventLocation('');
      setStartDate(undefined);
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