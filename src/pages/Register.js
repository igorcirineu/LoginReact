import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Style from "../styles/pages/Register.module.css";

const Register = () => {
  const navigate = useNavigate();

  const [nameRegister, setNameRegister] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    
    let url = 'https://api.b7web.com.br/carros/api/auth/register';

    let result = await fetch(url , {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameRegister,
        email: emailRegister,
        password: passwordRegister
      })
    });
    let json = await result.json();

    if(json.error != ''){
      alert(json.error);
    }else{
      navigate('/login');
      console.log("result", json);
    }
    
  }

  return (
    <main className={Style.register}>
      <div className={Style.conteudo}>
        <h1>Cadastro</h1>
        <form className={Style.formReg} onSubmit={handleRegisterSubmit}>
          <input
            type="text"
            placeholder="Nome"
            value={nameRegister}
            onChange={e => setNameRegister(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Email"
            value={emailRegister}
            onChange={e => setEmailRegister(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={passwordRegister}
            onChange={e => setPasswordRegister(e.target.value)}
            required
          />
          
            <button value="submit" type="submit" className="btn">
              Cadastrar
            </button>
        </form>
      </div>
    </main>
  );
};

export default Register;
