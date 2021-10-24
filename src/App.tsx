import React from 'react';
import { Router } from "@reach/router";
import HomePage  from './pages/HomePage';
import  MainChannel  from './pages/MainChannel';


export const App : React.FC = () => {

  return (
    <Router>
      <HomePage path="/" />
      <MainChannel path="emolino" />
    </Router>
  )

}

export default App;

