import React from "react";
import "./rankingContainer.css";
import { useNavigate } from "react-router-dom";

export default function CpRankingContainer() {
  const navigate = useNavigate();

  const userData = [];
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.getItem(`userData${i}`)) {
      userData.push(JSON.parse(localStorage.getItem(`userData${i}`)));
    }
  }

  userData.sort((a, b) => {
    return b.points - a.points
  })

  return (
    <div id="rank-container">
      <div id="rank-content">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Nickname</th>
              <th>Pontos</th>
              <th>Frutas</th>
              <th>Medalhas</th>
              <th>Troféus</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((data, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.nick}</td>
                <td>{data.points}</td>
                <td>{data.food}</td>
                <td>{data.medals}</td>
                <td>{data.trophies}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div id="rank-btns">
        <button className="rank-btn" onClick={() => navigate("/game")}>
          JOGAR NOVAMENTE
        </button>
        <button className="rank-btn" onClick={() => navigate("/menu")}>
          MENU INICAL
        </button>
      </div>
    </div>
  );
}
