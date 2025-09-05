/**
 * Главное приложение новостного сайта
 */

import React from 'react';
import { Header, SideMenu, NewsList } from './components';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <SideMenu />
      <main className="app__main">
        <NewsList />
      </main>
    </div>
  );
}

export default App;
