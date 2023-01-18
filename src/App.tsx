import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { addUser } from "./app/feautures/userSlice";
import AppNavigation from './components/AppNavigation'
import LoadingScreen from "./components/LoadingScreen";

const App = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.email && user.uid && user.displayName) {
          dispatch(addUser({email: user.email, uid: user.uid, username: user.displayName}));
        }
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