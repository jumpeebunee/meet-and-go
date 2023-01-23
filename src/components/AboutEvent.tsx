import { FC, useMemo, useState } from 'react'
import { IEvent } from '../types/types'
import AppModal from './UI/AppModal/AppModal'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import MainButton from './UI/MainButton/MainButton';
import SecondButton from './UI/SecondButton/SecondButton';

interface AboutEventProps {
  isOpen: boolean,
  setIsOpen: Function,
  currentEvent: IEvent,
}

const AboutEvent:FC<AboutEventProps> = ({isOpen, setIsOpen, currentEvent}) => {

  const [centerPosition, setCenterPosition] = useState([55.751574, 37.573856]);

  useMemo(() => {
    if (currentEvent.cords.length > 0) setCenterPosition(currentEvent.cords);
  }, [currentEvent])


  return (
    <AppModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div>
        {currentEvent.title
        ? <h2 className='heading'>{currentEvent.title}</h2>
        : <div className='about-event__heading_loading'></div>
        }
        <div className='about-event__interests'>
          <h3 className='second-heading'>Interest</h3>
          <ul className='about-event__interests-list'>
            {currentEvent.interest.map(interes => 
              <li key={interes}>{interes}</li>
            )}
          </ul>
        </div>
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
      </div>
      <div className='create-point__buttons'>
        <MainButton handle={() => setIsOpen(false)} text='Continue'/>
        <SecondButton handle={() => setIsOpen(false)} text='Cancel'/>
      </div>
    </AppModal>
  )
}

export default AboutEvent