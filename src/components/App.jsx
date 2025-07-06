import { useState,useEffect } from 'react'

import { createSessionStorage } from 'react-router-dom';

import './index.css'

// api link:

const apiurl='https://sfg-irrigation-web-app.onrender.com/api/v0/device/status'
// 
// const apiurl='dummy';

function App() {
const [dstatus,setdstatus]=useState('loading');

  return (
    <div class="layout">
    <Sidebar/>
    <Dashboard dstatus={dstatus} setdstatus={setdstatus}/>
        
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

//convert json timestamp to a readble date
function convertTime(jsontime){
// console.log(jsontime);
const jdate=new Date(jsontime);
const hours=jdate.getHours();
const minutes=jdate.getMinutes();
return `${jdate.toDateString()} ${hours}:${minutes}`;
}



function Dashboard({dstatus,setdstatus}){
const [moisture,setMoisture]=useState(0);
const [temp,setTemp]=useState(0);

const [jsontime,settime]=useState('x hours');

//fetch current valve status from backend then store it in dstatus
useEffect(()=>{
async function fetchData(){
try{
      const res=await fetch(apiurl);
    const data=await res.json();
    console.log('from api func',data);

      setdstatus(data.status);
    setTemp(data.temperature);
    settime(()=>{
      //convert time stamp to date 
      return convertTime(data.updated_on);
    });

  }catch(error){
    console.log(error);
  }

}
  fetchData();
} ,[]);

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

<ManualValveControl dstatus={dstatus} setdstatus={setdstatus}/>
<TimerValveControl dstatus={dstatus} setdstatus={setdstatus}/>
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

// api fetching function 

async function updateVal(action){
  try{
    const res=await fetch(apiurl,
    {
       method:'PATCH',
       headers:{
          "Content-Type": "application/json",     
          "Accept": "application/json"   },
       body:JSON.stringify({
       status:action })
     });

    const data= await res.json();
   
    return data;

  }catch(error){
    console.log(error);
  }

}


//manual valve controll
function ManualValveControl({setdstatus,dstatus}){
//click triggers updateval function
async function handleclick(action){
const res=await updateVal(action);
console.log(res);
setdstatus(res.status);
}

  return(<div className=" valve-control card">
<h3>Valve control</h3>
<button onClick={()=>handleclick('OPEN')}>Open</button>
<button onClick={()=>handleclick('CLOSED')}>Close</button>
  </div>);
}

function TimerValveControl({setdstatus}){

const [isopen,setisOpen]=useState('notset');
const [valvetimer,setValveTimer]=  useState(10);
const [countDown,setcountDown]=useState(10);

async function sendValveReq(action){
const res=await updateVal(action);
console.log(res);
setdstatus(res.status);


}

// effect to run countdown
useEffect(()=>{
let intervalID;
//if valve timer opened 
if (isopen===true){

  //set countdown to valve timer : step
sendValveReq('OPEN');


intervalID=setInterval(()=>{
  setcountDown(
  (prev)=>{
    if(prev>1){
    console.log('from interval',prev);
    return prev-1;
    }
else{
//clear interval if timer reached 0
    // console.log('stop');
  //reset valvetimer after finishing

   clearInterval(intervalID);
   setisOpen(false);//trigger closing the valve


  return 0; //reset coundown to 0
    }
    
  }
)

},60000);
}


if (isopen === false) {
    sendValveReq('CLOSED');
    setcountDown(valvetimer); // reset countdown when manually closed
 
  }



return ()=>{
if (intervalID){

  clearInterval(intervalID);

}
}

},[isopen]);










  return(<div className=" valve-control card">

<h3>
  Vavle Timer
</h3>
    <select value={valvetimer} 
    onChange={(e)=>(setValveTimer(Number(e.target.value)))}
  >
      <option value={10}>{10} minutes</option>
      <option value={20}>{20} minutes</option>
      <option value={30}>{30} minutes</option>
      <option value={40}>{40} minutes</option>
      <option value={50}>{50} minutes</option>
      <option value={60}>{60} minutes</option>
    </select>
<button onClick={()=>{
    setcountDown(valvetimer);
 
setisOpen(()=>true);


}
}>
  {isopen===true?
  
 countDown>0?`close (${countDown} minutes remained) `
  :'open' :'open'}
  </button>
<button onClick={()=>setisOpen(false)}>Close</button>
  </div>);
}


//disable a mode if the other is running , 
//as user cannot click on the timer while using manual closing mode
