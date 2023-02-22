import { FC, FormEvent, useMemo, useState } from "react"
import { nanoid } from '@reduxjs/toolkit';
import { setDoc, doc, updateDoc } from "firebase/firestore"; 
import { db } from "../firebase";
import { useAppSelector } from "../app/hooks";
import { currentUserContent } from "../app/feautures/userSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AppModal from './UI/AppModal/AppModal';
import MainButton from './UI/MainButton/MainButton';
import SecondButton from './UI/SecondButton/SecondButton';
import CreateEventError from "./AppModals/ErrorModal";
import { ratingConfig } from "../dataConfig/ratingConfig";
import { getRandomColor } from "../helpers/getRandomColor";
import { useForm } from "react-hook-form";
import inputConfig from "../helpers/InputConfig";
import ErrorMessage from "./UI/ErrorMessage/ErrorMessage";
import RangeInput from "./UI/RangeInput/RangeInput";
import ValueInput from "./UI/ValueInput/ValueInput";
import axios from "axios";
import EventTypeList from "./UI/EventTypeList/EventTypeList";

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
  const [startDate, setStartDate] = useState<Date>();
  const [adressValue, setAdressValue] = useState('');
  const [eventName, setEventName] = useState('');
  const [formError, setFormError] = useState('');

  const BASE_GEOCODE_URL = 'https://api.geocodify.com/v2/reverse';
  const BASE_GEOCODE_KEY = '9164b0a5c6f2637aa65ef1a4285ca68779bfc9e2&lat'

  useMemo(async() => {
    if (eventCords.length) {
      setAdressValue('СтройСервис, MS, Russia')
      // const res = await axios.get(`${BASE_GEOCODE_URL}?api_key=${BASE_GEOCODE_KEY}&lat=${eventCords[0]}&lng=${eventCords[1]}`);
      // setAdressValue(res.data.response.features[1].properties.label);
    }
  }, [eventCords])

  const handleCreate = async() => {
    const eventId = nanoid();
    const newEvent = {
      id: eventId,
      iconColor: getRandomColor(),
      leader: user.uid,
      title: eventName,
      cords: eventCords,
      place: adressValue, 
      date: startDate,
      contribution: price,
      participants: participants,
      activeUsers: [user.uid],
    }
    await setDoc(doc(db, "events", eventId), newEvent);
    await updateDoc(doc(db, "users", user.uid), {
      createdMeets: user.createdMeets + 1,
      currentCreated: user.currentCreated + 1,
      reputation: user.reputation + ratingConfig.create,
    })
    addEventToUser(newEvent.id);
    clearForm();
  }

  const handleAdd = () => {
    if (participants >= 10) return;
    setParticipants(prev => prev + 1);
  }

  const handleRemove = () => {
    if (participants <= 2) return;
    setParticipants(prev => prev - 1);
  }

  const onSubmit = (e: FormEvent) => {
    if (e) e.preventDefault()
    if (validateForm()) handleCreate();
  }

  const clearForm = () => {
    setPrice('0');
    setAdressValue('');
    setParticipants(2);
    setStartDate(undefined);
    setIsOpen(false);
  }

  const validateForm = () => {
    setFormError('');
    if (eventName.length < 5 || eventName.length > 15) {
      setFormError('Bad event name');
      return false;
    } else if (adressValue.length < 5) {
      setFormError('Bad address');
      return false;
    } else if (!startDate) {
      setFormError('Bad date event');
      return false;
    } else {
      return true;
    }
  }

  if (user.currentCreated >= 3) {
    return (
      <CreateEventError
        error="Can't create event"
        message="You cannot create a new event. The maximum number of events is 3"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    )
  } else {
    return (
      <AppModal style={{paddingTop: '60px'}} isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className='create-pont__main'>
          <h2 data-testid="create-point" className='heading'>Create a new event <br/> with friends</h2>
          <form id="create-form" className='create-point__info' onSubmit={(e) => onSubmit(e)}>
            <div className='app-input__wrapper'>
              <input
                className='appInput'
                style={{marginBottom: '10px'}}
                placeholder="Event name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
              <EventTypeList onChange={setEventName}/>
            </div>
            <div className='app-input__wrapper'>
              <input
                disabled
                value={adressValue}
                className='appInput'
                placeholder="Event Location"
              />
            </div>
            <div className='app-input__wrapper'>
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
          </form>
          <ValueInput
            title="Participants"
            body="Number of participants"
            value={participants}
            add={handleAdd}
            remove={handleRemove}
          />
          <RangeInput
            title="Сontribution"
            body="Initial payment"
            value={price}
            setValue={setPrice}
          />
        </div>
        <ErrorMessage message={formError}/>
        <div className='create-point__buttons'>
          <MainButton form="create-form" handle={(e) => onSubmit(e as FormEvent)} text='Continue'/>
          <SecondButton handle={() => setIsOpen(false)} text='Close'/>
        </div>
      </AppModal>
    )
  }
}

export default CreatePoint