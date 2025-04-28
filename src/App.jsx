import { useState } from 'react'


import './App.css'

function App() {
  return (
    <div>
      <Navigation/>
      <Main/>
      <Footer/>
    </div>
  );
}

export default App;
//navigation menu
function Navigation(){
  return <nav>
    <small> logo</small>
  </nav>
}
function Main(){
  return <div>
    <Status/>
      <Control/>
  </div>
}

//status of temperature and soil moisture 
function Status(){
  return <div>
    <h1>test</h1>
  </div>
}

//buttons controllers : on , off buttons
function Control(){
return <div>

</div>
}


function Footer(){
  return <div></div>
}
