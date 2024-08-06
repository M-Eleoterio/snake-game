import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";

import PgLogin from "../pages/login";
import PgMenu from "../pages/menu";
import PgPosModal from "../pages/posmodal";
import PgRanking from "../pages/ranking";
import PgGame from "../pages/game";

export default function RouteManager() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>}/>
        <Route path="/login" element={<PgLogin />} />
        <Route path="/posmodal" element={<PgPosModal />} />
        <Route path="/menu" element={<PgMenu />} />
        <Route path="/rank" element={<PgRanking />} />
        <Route path="/game" element={<PgGame />} />
        <Route path="/*" element={<h1>404 - Não Encontrado</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
