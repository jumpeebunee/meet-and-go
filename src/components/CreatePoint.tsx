import { FC } from "react"

interface CreatePointProps {
  setIsOpen: Function,
}

const CreatePoint:FC<CreatePointProps> = ({setIsOpen}) => {
  return (
    <div onClick={() => setIsOpen(false)} className='create-point'>
      <div onClick={(e) => e.stopPropagation()} className='create-point__content'>
        <div className='create-point__content-main'>
          <input type="text" placeholder="Название мероприятия"/>
          <button>Создать мероприятие</button>
        </div>
      </div>
    </div>
  )
}

export default CreatePoint