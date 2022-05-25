import React from 'react';

import Sidebar from '../../Components/Sidebar';
import Card from '../../Components/Card';

import './styles.css';

function Home() {
  return (
      <div className='container-home'>
          <Sidebar />
          <div className='content-cards'>
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
          </div>
      </div>
  );
}

export default Home;