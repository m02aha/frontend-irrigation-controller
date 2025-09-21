import React from 'react';
import { useState } from 'react';
import AsideNav from './AsideNav.jsx';
import MainContent from './MainContent.jsx';

// to do : 
// 1. grid layout of main content in all screens , with width check
// notification center 

function App() {

  const [isNavOpen, setIsNavOpen] = useState(false);


  return (

    <div className="w-full flex relative"> 

      <AsideNav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen}/>
      <MainContent isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen}/>

  </div>
  );
}

export default App; 











