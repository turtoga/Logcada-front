import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import Input from '../../components/Input'

import './Redefinir.scss'

function Redefinir() {
  return (
    <main className='redefinir'>
      <h2>Redefinir Senha</h2>
      <form>
        <Input type="email" label='Email Institucional' />
        <div className='center-div'>
          <Button type='normal'>Redefinir</Button>
          <Link to='/redefinir'>Fazer login</Link>
        </div>
        
      </form>
    </main>
  )
}

export default Redefinir