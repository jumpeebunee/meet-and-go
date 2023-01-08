import React, { useState } from 'react'
import { YMaps, Map, Placemark, GeolocationControl } from '@pbe/react-yandex-maps';
import CreatePoint from './components/CreatePoint';

const App = () => {

  const defaultState = {
    center: [55.751574, 37.573856],
    zoom: 10,
  };

  function test(e:any) {
    setIsOpen(true);
    console.log(e.get('coords'))
  }

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='app'>
      <div className='app__content'>
        <YMaps
          query={{
            apikey: "bb874fcf-3722-4db8-8062-76756ffbcd45",
          }}
        >
          <Map onClick={(e:any) => test(e)} className='app__map' defaultState={defaultState}>
            {/* <Placemark 
              options={{
                iconLayout: 'default#image',
                iconImageHref: '../point.svg',
                iconImageSize: [62, 85],
              }}
              onClick={() => console.log('q')}
              geometry={[55.684758, 37.738521]} 
            /> */}
            <GeolocationControl options={{
              float: 'left'
            }} />
          </Map>
        </YMaps>
        {isOpen && <CreatePoint setIsOpen={setIsOpen}/>}
      </div>
    </div>
  )
}

export default App