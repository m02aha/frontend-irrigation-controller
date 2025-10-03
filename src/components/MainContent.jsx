import MobileTbar from "./MobileTbar";
import TopBar from "./TopBar";
import Overview from "./Overview";
import SensorReadings from "./SensorReadings";
import ValveControl from "./ValveControl"; 
import thermo from "../assets/thermo.svg";
import rain from "../assets/rain.svg";
 import { useEffect, useState } from "react";
 import { formatUpdatedAgo } from "./formatUpdated";

 import { convertDate } from "./convertDate";

// the api 
export const apiurl='https://sfg-irrigation-web-app.onrender.com/api/v0/device/status'; 



export default function MainContent({isNavOpen,setIsNavOpen}){


const [moisture,setMoisture]=useState(10);
const [temp,setTemp]=useState(0);
const [vstatus,setVstatus]=useState('loading');
const [updated_on,setupdated]=useState('');
const [convertedDate,setConvertedDate]=useState('');






//format the sensorts updated time to how long ago it was updated
let updatedAgo ;
// console.log('updated ago',updatedAgo);


//fetch current valve status from backend then store it in dstatus
useEffect(()=>{
async function fetchData(){
try{
      const res=await fetch(apiurl);
    const data=await res.json();
    console.log('from api func',data);

     setVstatus(data.status);
    setTemp(data.temperature);
    setupdated(data.updated_on);
    setConvertedDate(convertDate(data.updated_on));
    // updatedAgo=formatUpdatedAgo(data.updated_on);
    console.log('converted date',convertDate(data.updated_on));
  }catch(error){
    console.log(error);
  }

}
  fetchData();
} ,[]);





// updateValReq('CLOSED').then(data=>{ console.log(data)});
return(     
     <main className="flex-1 bcg-primary
     min-h-screen  bg-bcg-primary">


     <MobileTbar isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} convertedDate={convertedDate}/>
  
       {/* main content area */}
      <TopBar convertedDate={convertedDate}/>


       {/* the readings and valve control */}
      <div className="  container mt-4 md:mt-8 xl:mt-8 grid grid-cols-1 xl:grid-cols-[1.75fr_1fr] gap-y-3 md:gap-y-4  gap-x-4 md:gap-x-5">
         <div >
          
        <  Overview moisture={moisture}/>
  

         <h2 className="  mt-2 md:mt-4  text-lg md:text-[16px]   text-gray">Sensor status</h2>
        
         <div className=" mt-3 xl:mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4 md:gap-y-6 ">
          
          <SensorReadings iconSvg={rain} iconBg="bg-icon-moisture-bg" title="Soil moisture" SensorData={moisture}  updated_on={updated_on}/>
          
          <SensorReadings iconSvg={thermo} iconBg="bg-icon-temp-bg" title="Temperature" SensorData={temp}  updated_on={updated_on}/>


          </div>
          </div>

       <div >
         <h2 className="  mt-2 md:mt-4  text-lg  xl:hidden text-gray">Valve control</h2>
        <div className="card w-full mt-3.5 md:mt-4  xl:mt-0">
      <ValveControl vstatus={vstatus} setVstatus={setVstatus}setupdated={setupdated} setConvertedDate={setConvertedDate}/>
  
      </div>
       </div>
     

      </div>


      {/* the graph */}
  </main>);



}

