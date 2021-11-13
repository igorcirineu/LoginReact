import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Style from "../styles/pages/Login.module.css";

const Login = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userName, setUserName] = useState(localStorage.getItem("username"));

  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    let url = "https://api.b7web.com.br/carros/api/auth/login";

    let result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailField,
        password: passwordField,
      }),
    });
    let json = await result.json();

    if (json.error != "") {
      alert(json.error);
    } else {
      localStorage.setItem("token", json.token);
      localStorage.setItem("username", json.user.name);
      setToken(json.token);
      setUserName(json.user.name);
    }
  };

  const handleLogout = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("username", "");
    setToken("");
    setUserName("");
  };

  return (
    <div>
      {!token && (
        <main className={Style.login}>
          <div className={Style.conteudo}>
            <h1>Login</h1>
            <form className={Style.form} onSubmit={handleLoginSubmit}>
              <input
                type="text"
                placeholder="Email"
                value={emailField}
                onChange={(e) => setEmailField(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Senha"
                value={passwordField}
                onChange={(e) => setPasswordField(e.target.value)}
                required
              />
              <button value="submit" type="submit" className="btn">
                Enviar
              </button>
            </form>
            <p>Você ainda não tem conta?</p>
            <Link to="/register">
              <p>Cadastre-se</p>
            </Link>
          </div>
        </main>
      )}
      {token && (
        <div>
          <h3>Olá , {userName} você está logado</h3>
          <button className="btn" onClick={handleLogout}>
            Sair
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
