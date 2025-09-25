import './Input.scss';

interface InputProps {
  type: string,
  placeholder: string,
}

function Input({type, placeholder}: InputProps) {
  return (
    <div className='input'>
      <label className='label'>{placeholder}</label>
      <input type={type} placeholder={placeholder} />
    </div>
  )
}

export default Input