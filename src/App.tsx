import React from 'react'
import { YMaps, Map, Placemark, GeolocationControl } from '@pbe/react-yandex-maps';

const App = () => {

  const defaultState = {
    center: [55.751574, 37.573856],
    zoom: 10,
  };

  return (
    <div className='app'>
      <div className='app__content'>
        <YMaps
           query={{
            apikey: "bb874fcf-3722-4db8-8062-76756ffbcd45",
          }}
        >
          <Map className='app__map' defaultState={defaultState}>
            <Placemark onClick={() => console.log('q')} geometry={[55.684758, 37.738521]} />
            <GeolocationControl options={{
              float: 'left'
            }} />
          </Map>
        </YMaps>
      </div>
    </div>
  )
}

export default App