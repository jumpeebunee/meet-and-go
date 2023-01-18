import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppNavigation from './components/AppNavigation'
import LoadingScreen from "./components/LoadingScreen";
import { auth } from "./firebase";

const App = () => {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/');
      } else {
        navigate('/login');
      }
      setIsLoading(false);
    });
  },[]);

  return (
    <div className='app'>
      {isLoading
      ? <LoadingScreen/>
      : <AppNavigation/>
      }
    </div>
  )
}

export default App