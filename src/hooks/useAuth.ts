import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

export const useAuth = (uid: string, callback: Function, setData: Function) => {

  const navigate = useNavigate();

  useEffect(() => {
    if (!uid) {
      navigate('/login');
    } 
    callback(setData);
  },[])

}