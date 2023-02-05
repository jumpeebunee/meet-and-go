import { FC, useMemo, useState } from 'react'
import { IEvent } from '../types/types'
import AppModal from './UI/AppModal/AppModal'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import format from 'date-fns/format';
import MainButton from './UI/MainButton/MainButton';
import SecondButton from './UI/SecondButton/SecondButton';

interface AboutEventProps {
  isOpen: boolean,
  currentEvent: IEvent,
  setIsOpen: (arg: boolean) => void,
}

const AboutEvent:FC<AboutEventProps> = ({isOpen, setIsOpen, currentEvent}) => {

  const [centerPosition, setCenterPosition] = useState([55.751574, 37.573856]);

  useMemo(() => {
    if (currentEvent.cords.length > 0) setCenterPosition(currentEvent.cords);
  }, [currentEvent])


  return (
    <AppModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div>
        <div className='about-event__date'>{format(new Date('Tue Jan 24 2023 00:00:00 GMT+0300 (Москва, стандартное время)'),'PPPp')}</div>
        {currentEvent.title
        ? <h2 className='heading'>{currentEvent.title}</h2>
        : <div className='about-event__heading_loading'></div>
        }
        <div className='about-event__location'>
          <h3 className='second-heading'>Location</h3>
          <p>{currentEvent.place}</p>
        </div>
          <YMaps
            query={{
              apikey: "bb874fcf-3722-4db8-8062-76756ffbcd45",
            }}
          >
          {currentEvent.cords.length === 2 &&
            <div className='about-event__map-wrapper'>
              <Map className='about-event__map' defaultState={{zoom: 10, center: centerPosition}}>
                <Placemark
                  options={{
                    iconLayout: 'default#image',
                    iconImageHref: '../point.svg',
                    iconImageSize: [32, 55],
                  }}
                  geometry={currentEvent.cords} 
              />
              </Map>
            </div>
          }
          </YMaps>
          <div className='about-event__base-info'>
            <h2 className='second-heading'>Participants</h2>
            <div className='about-event__base-content'>
              <div className='about-event__avatars'>
                {currentEvent.activeUsers.map(user =>
                  <img key={user.uid} alt={user.username} src={user.image} className='about-event__avatar'/>
                )}
              </div>
              <p>{currentEvent.activeUsers.length}/{currentEvent.participants}</p>
            </div>
          </div>
          <div className='about-event__base-info'>
            <h2 className='second-heading'>Сontribution</h2>
            <p>${currentEvent.contribution}</p>
          </div>
      </div>
      <div className='create-point__buttons'>
        <MainButton handle={() => setIsOpen(false)} text='Continue'/>
        <SecondButton handle={() => setIsOpen(false)} text='Cancel'/>
      </div>
    </AppModal>
  )
}

export default AboutEvent