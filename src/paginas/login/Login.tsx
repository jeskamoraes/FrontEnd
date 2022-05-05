import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';

import UserLogin from '../../models/UserLogin';
import { login } from '../../service/Service';
import console from '../../assets/console.png';
import './Login.css'

function Login () {

// Redireciona o usuário para determinada pagina
let history = useNavigate()

// Hooks que vão manipular o nosso Local Storage para gravar o Token
const [token, setToken] = useLocalStorage('token')

// useState define como uma determinada variavel será inicializada quando o Comp. for renderizado
const [userLogin, setUserLogin] = useState<UserLogin>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    token: ""
})

// Hook de efeito colateral, sempre executa uma função quando o que estiver no seu Array é alterado
useEffect(() => {
    if(token !== ""){
        history('/home')
    }
}, [token])

// Função que junto com a setUserLogin irá atualizar o valor inicial da userLogin
function updatedModel(e: ChangeEvent<HTMLInputElement>) {
    setUserLogin({
        ...userLogin,
        [e.target.name]: e.target.value           
    })
}

async function logar(e: ChangeEvent<HTMLFormElement>){
    e.preventDefault()

    try {
        await login(`/usuarios/logar`, userLogin, setToken)
        alert("Usuário logado com sucesso")

    } catch (error) {
        alert("Dados do usuário inconsistentes")
    }
}

    return (
        <Grid className='container'>
            <Box className='container-login'>
                <Box className='wrap-login'>
                    <form onSubmit={ logar } className='login-form'>
                        <span className='login-form-title'>Bem Vindo!</span>

                        <span className='login-form-title'>
                            <img src={console} alt='NSG' />
                        </span>

                        <Box className='wrap-input'>
                            <input 
                            className={userLogin.usuario !== "" ? 'has-val input' : 'input'} 
                            type="email" 
                            value={ userLogin.usuario}
                            name='usuario'
                            onChange={ (e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            />
                            <span className='focus-input' data-placeholder='Email'></span>
                        </Box>

                        <Box className='wrap-input'>
                            <input 
                            className={userLogin.senha !== "" ? "has-val input" : "input"}
                            type="password" 
                            value={ userLogin.senha}
                            name='senha'
                            onChange={ (e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            />
                            <span className='focus-input' data-placeholder='Password'></span>
                        </Box>

                        <div className="container-login-form-btn">
                            <button className="login-form-btn" >Login</button>
                        </div>

                        <Box className="text-center">
                            <span className="txt1">Nao possui conta?</span>

                            <Link to='/cadastro'>
                                <Typography variant='subtitle1' gutterBottom align='center' className='txt2'>Cadastre-se</Typography>
                            </Link>
                        </Box>

                    </form>
                </Box>
            </Box>

        </Grid>
    );
}

export default Login;