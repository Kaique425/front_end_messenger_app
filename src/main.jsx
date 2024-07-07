import React from 'react'
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client'
import Chat from './pages/chat/Chat'
import Sectors from './pages/sectors/Sectors'
import Channels from "./pages/channels/channels.jsx"
import './index.css'
import { SidePainel } from "./components/SidePainel"
import { BrowserRouter, Routes, Route } from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <BrowserRouter>
      <SidePainel/>
      <Routes>
        <Route path="/Chat" element={<Chat />}/>
        <Route path="/Sector" element={<Sectors />}/>
        <Route path="/Channels" element={<Channels />}/>
      </Routes>
    </BrowserRouter>
  // </StrictMode>
)
