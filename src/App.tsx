import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebase";
import { addUser, addUserContent, currentUser } from "./app/feautures/userSlice";
import { db } from "./firebase";
import AppNavigation from './components/AppNavigation'
import LoadingScreen from "./components/LoadingScreen";
import { IUserFull } from "./types/types";

const App = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(currentUser);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (user.email && user.uid && user.displayName) {
          dispatch(addUser({email: user.email, uid: user.uid, username: user.displayName}));
          const querySnapshot = await getDocs(collection(db, "users"));
          querySnapshot.forEach((doc) => {
            if (doc.data().uid === user.uid) {
              const data = doc.data() as IUserFull;
              dispatch(addUserContent(data));
            }
          });
          subscribeUserUpdates(user.uid);
        }
        navigate('/');
      } else {
        navigate('/login');
      }
      setIsLoading(false);
    });
  },[]);

  const subscribeUserUpdates = (id: string) => {
    onSnapshot(doc(db, "users", id), (doc) => {
      dispatch(addUserContent(doc.data() as IUserFull));
    });
  }

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