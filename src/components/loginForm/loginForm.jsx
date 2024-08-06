import React, { useState } from "react";
import "./loginForm.css";
import { useNavigate } from "react-router-dom";

export default function CpLoginForm() {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = () => {
    if (user === "admin" && pass === "admin") {
      navigate("/posmodal");
    } else {
      alert("Usuário ou senha incorreto.");
    }
  };

  return (
    <>
      <div id="login-container">
        <label htmlFor="login-input-user">
          Username:
          <input
            type="text"
            name="login-input-user"
            id="login-input-user"
            className="login-input"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </label>
        <label htmlFor="login-input-pass">
          Senha
          <input
            type="password"
            name="login-input-pass"
            id="login-input-pass"
            className="login-input"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </label>
        <button id="login-btn" onClick={handleLogin}>
          LOGIN
        </button>
      </div>
      <div id="login-btns">
        <button className="login-btn" onClick={() => navigate("/rank")}>
          VER RANKING
        </button>
        <button className="login-btn" onClick={() => navigate("/game")}>
          INICIAR PARTIDA
        </button>
      </div>
    </>
  );
}
