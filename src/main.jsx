import React from 'react'
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client'
import Chat from './chat'
import './index.css'
import { SidePainel } from "./components/SidePainel"
import { BrowserRouter, Routes, Route } from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SidePainel/>
      <Routes>
        <Route path="/Chat" element={<Chat />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
