import { FC } from "react"
import AppModal from "../UI/AppModal/AppModal"
import SecondButton from "../UI/SecondButton/SecondButton";

interface CreateEventErrorProps {
  dataTest?: string;
  error: string;
  message: string;
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}

const CreateEventError:FC<CreateEventErrorProps> = ({dataTest, isOpen, setIsOpen, error, message}) => {
  return (
    <AppModal dataTest={dataTest} style={{paddingTop: '60px'}} isOpen={isOpen} setIsOpen={setIsOpen}>
      <div>
        <h2 className="heading">{error}</h2>
        <p style={{marginTop: '15px'}} className="description">{message}</p>
      </div>
      <SecondButton text="Close" handle={() => setIsOpen(false)}/>
    </AppModal>
  )
}

export default CreateEventError