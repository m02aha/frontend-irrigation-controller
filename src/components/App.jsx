import { useState,useEffect } from 'react'

import './index.css'



function App() {


  return (
    <div class="layout">
    <Sidebar/>
    <Dashboard/>
        
    </div>
  );
}
export default App;

function Sidebar(){

  return (<aside class="side-bar">
        
      <h2>SFG group</h2>

        <nav>
           <a href='#'>📊 Dashboard</a>
          <a href='#'>⚙ Settings</a>
        </nav>
  </aside>);
}
function Dashboard(){

  return (<div class="dashboard">
<header>
  <h1>Dashboard</h1>

  <div className="user"><span>hello, jack</span></div>
</header>
<div className="status-cards">
<TempReadings/>
<Moisture/>
</div>
<ValveControl/>

  </div>);
}

function TempReadings(){
  return (
    <div className="card">
      <div>
      <h3>Tempreture</h3>
      <div className='reading'><span>41 C</span></div>
      <small>last reading : 4 hours</small>
      </div>
    </div>
    );
}
function Moisture(){
  return (
    <div className="card">
      <div>
           <h3>Moisture</h3>
      <div className='reading'><span>20%</span></div>
      <small>last reading : 4 hours</small>
      </div>
    </div>
    );
}

function ValveControl(){
const [valvetimer,setValveTimer]=  useState(10);
const [valveisOpened, setvalve]=useState(false);
const [countDown,setcountDown]=useState(0);


//count downtimer 
useEffect(
 ()=>{
let intervalID;

//run countdownif valve is opened
if (valveisOpened && valvetimer>0){

// // initial countdown
// setcountDown(valvetimer);

intervalID=setInterval(() => {
  setcountDown((prevcount)=>{
    if(prevcount>0){
      console.log(prevcount);
      return prevcount-1;

    }else{
      clearInterval(intervalID);
      return 0;
    }
  })

console.log("valveisOpened:", valveisOpened);
console.log("valvetimer:", valvetimer);
console.log("Setting countdown to", valvetimer);

}, 1000);



}

  return()=>clearInterval(intervalID);

  }
,[valveisOpened,valvetimer]);
    


// a second use effect that will close thevalve automatically when the 
//countdown reaches 0

useEffect(
  ()=>{
if (countDown==0 && valveisOpened){
  setvalve(false);
}
  }
  ,[countDown, valveisOpened]);

  //the component UI
 return( <div className=" valve-control card">

<h3>
  vavle control
</h3>
    <select value={valvetimer} 
    onChange={(e)=>(setValveTimer(Number(e.target.value)))}
    disabled={valveisOpened}>
      <option value={10}>{10} minutes</option>
      <option value={20}>{20} minutes</option>
      <option value={30}>{30} minutes</option>
      <option value={40}>{40} minutes</option>
      <option value={50}>{50} minutes</option>
      <option value={60}>{60} minutes</option>
    </select>
<button onClick={
  ()=>{
    if (!valveisOpened){
      if(valvetimer>0){
    setcountDown(valvetimer);
    setvalve(true);
      }
  }else{
  setvalve( false);

  }

  }
}>
  { valveisOpened?`Close the valve (${countDown})`: 'Open valve'}
  </button>

  </div> );
}