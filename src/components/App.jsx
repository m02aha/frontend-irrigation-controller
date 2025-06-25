import { useState,useEffect } from 'react'
import { createSessionStorage } from 'react-router-dom';

import './index.css'

// api link:
// https://sfg-irrigation-web-app.onrender.com/api/v0/device/status

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

function convertTime(jsontime){
// console.log(jsontime);
const jdate=new Date(jsontime);
const hours=jdate.getHours();
const minutes=jdate.getMinutes();
return `${jdate.toDateString()} ${hours}:${minutes}`;
}
function Dashboard(){
const [valveisOpened, setvalve]=useState(false);
const [moisture,setMoisture]=useState(0);
const [temp,setTemp]=useState(0);
const [dstatus,setdstatus]=useState('nan');
const [jsontime,settime]=useState('x hours');

//fetch current valve status from backend
useEffect(()=>{
async function fetchStatus(){
  try{
    const res=await fetch('https://sfg-irrigation-web-app.onrender.com/api/v0/device/status')
    const data=await res.json();
 console.log(data);
    setdstatus(data.status);
    setTemp(data.temperature);
    settime(()=>{
      return convertTime(data.updated_on);
    });
   
    //convert time stamp to date 

  }catch(error){
    console.log(error);
  }

}

 fetchStatus();
} ,[]);

//send opening/closing request 
useEffect(()=>{
  const valvereq=valveisOpened?'OPEN':'CLOSED';
  
  async function updateValve(){
    if (!navigator.onLine) {
    console.warn("You're offline. Cannot send PATCH request.");
    return;
  }
    try{
const res=await fetch('https://sfg-irrigation-web-app.onrender.com/api/v0/device/status',{
  method:'PATCH',
headers:{
  "Content-Type": "application/json",     
    "Accept": "application/json"   
},
  body:JSON.stringify({
 status:valvereq
  })
});
const data= await res.json();
// console.log(data.status);
 setdstatus(data.status);
  }catch(error){

    console.log(error);
  }
    }


  updateValve();
}

  ,[valveisOpened]);

  return (<div className="dashboard">
<header>
  <h1>Dashboard</h1>

  <div className="device-status"><span>valve is {dstatus}</span></div>
</header>
<div className="status-cards">
<TempReadings temp={temp} jsontime={jsontime}/>
<Moisture moisture={moisture} jsontime={jsontime} />
</div>
<div className='controlers'>
  <AutoValveControl valveisOpened={valveisOpened} setvalve={setvalve} jsontime={jsontime}/>
<ManualValveControl  valveisOpened={valveisOpened} setvalve={setvalve} jsontime={jsontime}/>
</div>

  </div>);
}

function TempReadings({temp,jsontime}){
  return (
    <div className="card">
      <div>
      <h3>Tempreture</h3>
      <div className='reading'><span>{temp} C</span></div>
      <small>{jsontime}</small>
      </div>
    </div>
    );
}
function Moisture({moisture,jsontime}){
  return (
    <div className="card">
      <div>
           <h3>Moisture</h3>
      <div className='reading'><span>{moisture}%</span></div>
      <small>{jsontime}</small>
      </div>
    </div>
    );
}

function AutoValveControl({valveisOpened, setvalve}){
const [valvetimer,setValveTimer]=  useState(10);
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
      // console.log(prevcount);

      return prevcount-1;

    }else{
      clearInterval(intervalID);
      return 0;
    }
  })

// console.log("valveisOpened:", valveisOpened);
// console.log("valvetimer:", valvetimer);
// console.log("Setting countdown to", valvetimer);

}, 60000);



}

  return()=>clearInterval(intervalID);

  }
,[valveisOpened,valvetimer]);
    


// a use effect that will close thevalve automatically when the 
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
  Vavle Timer
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
      if (!navigator.onLine) {
    alert("You're offline.");
    return;
  }
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
  { valveisOpened?`Close the valve (${countDown} min remained)`: 'Open valve'}
  </button>

  </div> );
}

//manual valve controll
function ManualValveControl({setvalve}){
  return(<div className=" valve-control card">
<h3>Valve control</h3>
<button onClick={()=>
  setvalve(true)}>Open</button>
<button onClick={()=>setvalve(false)}>Close</button>
  </div>);
}
//disable a mode if the other is running , 
//as user cannot click on the timer while using manual closing mode
