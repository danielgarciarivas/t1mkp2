import React from 'react';
import Button from '../../components/common/Button';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <h1>Bienvenido al Marketplace T1</h1>
        <p>Encuentra los mejores productos al mejor precio</p>
        <Button variant="primary" size="large">
          Explorar Productos
        </Button>
      </div>
    </div>
  );
};

export default Home;