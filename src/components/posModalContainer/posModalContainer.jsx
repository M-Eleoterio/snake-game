import React from "react";
import "./posModalContainer.css";
import { useNavigate } from "react-router-dom";

export default function CpPosModalContainer() {
  const navigate = useNavigate();
  let nickname;

  if (localStorage.getItem(`userData${localStorage.length}`)) {
    nickname = JSON.parse(`userData${localStorage.length}`.nickname);
  } else {
    nickname = "Admin";
  }

  return (
    <div id="posmodal-container">
      <p>
        <code>{nickname}</code>
      </p>
      <div id="posmodal-content">
        <img src="/img/snake_posmodal.png" alt="Snake Img" />
        <p style={{color: "black"}}>
          <center>Bem Vindo(a) ao Snake Nutrition! </center><br />
          Um jogo destinado ao ensino de habitos nutricionais saudáveis. Preparado para embarcar nessa jornada?
        </p>
        <button onClick={() => navigate("/menu")}>VAMOS LÁ!</button>
      </div>
    </div>
  );
}
