import { FC, useMemo, useState } from 'react'
import { IEvent } from '../types/types'
import AppModal from './UI/AppModal/AppModal'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import format from 'date-fns/format';
import MainButton from './UI/MainButton/MainButton';
import SecondButton from './UI/SecondButton/SecondButton';
import UserAvatars from './UserAvatars';
import UsersList from './UsersList';

interface AboutEventProps {
  isOpen: boolean,
  activeEventUsers: boolean,
  currentEvent: IEvent,
  setIsOpen: (arg: boolean) => void,
  setIsMeet: (arg: boolean) => void,
  setActiveEventUsers: (arg: boolean) => void,
}

const AboutEvent:FC<AboutEventProps> = ({isOpen, setIsOpen, setIsMeet, currentEvent, activeEventUsers, setActiveEventUsers}) => {

  const [centerPosition, setCenterPosition] = useState([55.751574, 37.573856]);

  useMemo(() => {
    if (currentEvent.cords.length > 0) setCenterPosition(currentEvent.cords);
  }, [currentEvent])

  const handleGo = () => {
    setIsOpen(false);
    setIsMeet(true);
  }

  if (activeEventUsers) {
    return (
      <AppModal isOpen={activeEventUsers} setIsOpen={setActiveEventUsers}>
        <UsersList users={currentEvent.activeUsers}/>
        <SecondButton handle={() => setActiveEventUsers(false)} text='Close'/>
      </AppModal>
    )
  } else {
    return (
      <AppModal isOpen={isOpen} setIsOpen={setIsOpen}>  
        <div>
          <div className='about-event__date'>{format(new Date('Tue Jan 24 2023 00:00:00 GMT+0300 (Москва, стандартное время)'),'PPPp')}</div>
          {currentEvent.title
          ? <h2 className='about-event__heading heading'>{currentEvent.title}</h2>
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
                <UserAvatars
                  handleOpen={() => setActiveEventUsers(true)}
                  users={currentEvent.activeUsers}
                />
                <p>{currentEvent.activeUsers.length}/{currentEvent.participants}</p>
              </div>
            </div>
            <div className='about-event__base-info'>
              <h2 className='second-heading'>Сontribution</h2>
              <p>${currentEvent.contribution}</p>
            </div>
        </div>
        <div className='create-point__buttons'>
          <MainButton handle={handleGo} text='Meet and go'/>
          <SecondButton handle={() => setIsOpen(false)} text='Close'/>
        </div>
      </AppModal>
    )
  }
}

export default AboutEvent