import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/Button';
import Input from '../../components/Input';
import api from '../../services/api';

import './NovaSenha.scss'

function NovaSenha() {
    const[senha,setSenha] = useState("");
    const[senhaNovamente,setSenhaNovamente] = useState("");
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');



    const handleRedefinir = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (senha !== senhaNovamente) {
            alert("As senhas não coincidem.");
            return;
        }

        try{
            await api.post(`/api/redefinir-senha/${token}`, {
                senha
            })

            alert("Senha redefinida com sucesso!")
            navigate('/')
            
        } catch (error) {
            if(axios.isAxiosError(error)) {
                if(error.response?.status === 401){
                alert("Token inválido ou expirado")
                } else {
                alert("Dados incorretos")
                }
            }
        }
    }

    useEffect(() =>{
        if (!token) {
            navigate('/');
        }
    }, [])

  return (
    <main className='redefinir-senha'>
      
        <h2>Redefinir Senha</h2>

        <form onSubmit={handleRedefinir}>
            <div className='input-separator'>
                <Input value={senha} onChange={(e) => setSenha(e.target.value)} type="password" label="Nova Senha"/>
                <Input value={senhaNovamente} onChange={(e) => setSenhaNovamente(e.target.value)} type="password" label="Confirmar Senha" />
            </div>
            
            <div className='center-div'>
                <Button type='submit' tipo='normal'>Redefinir</Button>
                <Link to='/'>Fazer Login</Link>
            </div>
            
        </form>
    </main>
    
  )
}

export default NovaSenha