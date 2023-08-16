import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Connect } from './routes/connect/connect.route';
import { CreatePsbt } from './routes/psbt/create-psbt.route';
import { Home } from './routes/home/home.route';
import { Transaction } from './routes/transaction/transaction.route';

function App() {
  return (
    <Routes>
      <Route path='/connect' element={<Connect />} />
      <Route path='/' element={<Home />}>
        <Route path='/psbt' element={<CreatePsbt />} />
        <Route index element={<Transaction />} />
      </Route>
    </Routes>
  );
}

export default App;
