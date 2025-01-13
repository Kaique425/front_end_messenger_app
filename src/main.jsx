import React from 'react';

import ReactDOM from 'react-dom/client';
import Chat from './pages/chat/Chat';
import Sectors from './pages/sectors/Sectors';
import Channels from './pages/channels/channels.jsx';
import Templates from './pages/Templates/Templates.jsx';
import Contacts from './pages/contacts/Contacts.jsx';
import './tailwind.css';

import { SidePainel } from './components/SidePainel';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <BrowserRouter>
    <SidePainel />
    <Routes>
      <Route path='/chat' element={<Chat />} />
      <Route path='/sector' element={<Sectors />} />
      <Route path='/channels' element={<Channels />} />
      <Route path='/templates' element={<Templates />} />
      <Route path='/contacts' element={<Contacts />} />
    </Routes>
  </BrowserRouter>,
  // </StrictMode>
);
