import './Input.scss';

interface InputProps {
  type?: string,
  placeholder?: string,
  name?: string,
  value?: string,
  onChange?:(e:React.ChangeEvent<HTMLInputElement>) => void,
  label?: string;
  disabled?:boolean
}

function Input({disabled ,type, name, value, label, onChange, placeholder }: InputProps) {
  return (
    <div className='input'>
      <label className='label'>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  )
}

export default Input