import React from "react";
import "./menuContainer.css";
import { useNavigate } from "react-router-dom";

export default function CpMenuContainer() {
  const navigate = useNavigate();

  return (
    <div id="menu-container">
      <button
        className="menu-btn"
        id="menu-btn-game"
        onClick={() => navigate("/game")}
      >
        INICIAR PARTIDA
      </button>
      <button className="menu-btn" id="menu-btn-rank" onClick={() => navigate("/rank")}>
        RANKING
      </button>
    </div>
  );
}
