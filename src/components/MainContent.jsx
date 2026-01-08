import MobileTbar from "./MobileTbar";
import TopBar from "./TopBar";
import Overview from "./Overview";
import Popup from "./Popup";
import SensorReadings from "./SensorReadings";
import ValveControl from "./ValveControl"; 
import thermo from "../assets/thermo.svg";
import rain from "../assets/rain.svg";
import wave from "../assets/wave.svg";
 import { useEffect, useState } from "react";

 import { convertDate } from "./convertDate";

 import {graphData} from "../utils/Data";
 import { Graph } from "./Graph";


// the api 
export const apiurl='https://sfg-irrigation-web-app.onrender.com/api/v0/device/status'; 
// 
// export const apiurl='127.0.0.1';

export default function MainContent({isNavOpen,setIsNavOpen}){


const [moisture,setMoisture]=useState(10);
const [temp,setTemp]=useState(0);
const [vstatus,setVstatus]=useState('loading');
const [updated_on,setupdated]=useState('');
const [convertedDate,setConvertedDate]=useState('');
const [popupOpen,setPopupOpen] = useState(false);

//setting a state for the graph component data 
const [chartData,setChartData]=useState({
    
  datasets:[
   { 
     label:'Soil moisture',
    data:graphData.data.map((item)=>({x:item.timestamp,y:item.value})),
    // backgroundColor:'rgba(59,130,246,0.5)',
    backgroundColor:(context)=>{
      const bgColor=[
         'rgba(106,162,130,0.41)',
    
         'rgba(115,115,111,0)'
        
      ];
      if(!context.chart.chartArea){
        return;
      }
      // console.log(context.chart.chartArea);
       const {ctx,data,chartArea:{top,bottom}} = context.chart;
       const gradientBg=ctx.createLinearGradient(0,top,0,bottom);
       gradientBg.addColorStop(0,bgColor[0]);
       gradientBg.addColorStop(1,bgColor[1]);
      //  gradientBg.addColorStop(1,bgColor[2]);

       return gradientBg;
    },
    fill :true,
    // borderColor:'rgba(59,130,246,1)'
  }
  ]


});



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



return(     
     <main className="flex-1 bcg-primary
     min-h-screen  bg-bcg-primary relative">


     <MobileTbar isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} convertedDate={convertedDate}/>
  
       {/* main content area */}
      <TopBar convertedDate={convertedDate}/>


       {/* the readings and valve control */}
      <div className="  container mt-4 md:mt-8 xl:mt-8 grid grid-cols-1 xl:grid-cols-[1.75fr_1fr] gap-y-3 md:gap-y-4  gap-x-4 md:gap-x-5">
         <div >
          
        <Overview moisture={moisture}/>
  

         <h2 className="  mt-2 md:mt-4  text-lg md:text-[16px]   text-gray">Sensor status</h2>
        
         <div className=" mt-3 xl:mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4 md:gap-y-6 ">
          
          <SensorReadings iconSvg={rain} iconBg="bg-icon-moisture-bg" moistureBg={wave} moisture title="Soil moisture" SensorData={moisture}  updated_on={updated_on}/>
          
          <SensorReadings iconSvg={thermo} iconBg="bg-icon-temp-bg"  moistureBg={null} title="Temperature" SensorData={temp}  updated_on={updated_on}/>


          </div>
          </div>

       <div >
         <h2 className="  mt-2 md:mt-4  text-lg  xl:hidden text-gray">Valve control</h2>
        <div className="card w-full mt-3.5 md:mt-4  xl:mt-0 xl:h-full">
      <ValveControl  popupOpen={popupOpen} setPopupOpen={setPopupOpen} vstatus={vstatus} setVstatus={setVstatus}setupdated={setupdated} setConvertedDate={setConvertedDate}/>
  
      </div>
       </div>
     

      </div>
     <section className="container  mt-4 md:mt-8 w-full max-w-5xl mx-auto ">
      
      <Graph  chartData={chartData}/>

      </section>
      

      {/* the graph */}

      <Popup  status={vstatus}  soilmoisture={10} optimum={50} isopen={popupOpen} setisOpen={setPopupOpen}
      setVstatus={setVstatus}setupdated={setupdated} setConvertedDate={setConvertedDate}/>

  </main>);



}

