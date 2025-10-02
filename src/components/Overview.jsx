

import React from "react";
import check from "../assets/check.svg";
import yellowalert from "../assets/yellowalert.svg";
import redalert from "../assets/redalert.svg";


// do refresh button 
let iconBg,title,description;
export default function Overview({moisture}) {
 
  if (moisture < 30){
    iconBg='icon-warning-r-bg';
     title ='Soil moisture is too low';
     description=`current soil moisture is ${moisture}%. Consider openning the valve`;

  }else if (moisture >=30 && moisture <=60){
     iconBg='icon-good-bg';
     title ='Everything looks good';
     description=' Soil moisture levels are optimal. No action needed.';
  }
  else if (moisture >60){
   iconBg='icon-warning-y-bg';
     title ='Soil moisture is too high';
     description=' Current soil moisture is above optimal levels.';
  }
   else if (!moisture){
  iconBg='icon-warning-r-bg';
     title ='System Error';
     description=' Unable to retrieve soil moisture data. Please check the system.';
  }
  // iconSvg,
  // 
 
 
 
  return (
    <section className="card w-full flex flex-col gap-4 md:gap-6">
      {/* Icon and Title */}
      <div className="flex gap-3 items-start">
        


        <span className={`inline-flex  items-center justify-center w-6 h-6 md:w-7 md:h-7  rounded-full ${iconBg}`} >
         
         {iconBg==='icon-good-bg' ? <img src={check} alt="status icon" className="w-4 h-4 md:w-4 md:h-4"/> : 
         iconBg==='icon-warning-r-bg' ? <img src={redalert} alt="status icon" className="w-4 h-4 md:w-4 md:h-4"/> :
         iconBg ==='icon-warning-y-bg'? <img src={yellowalert} alt="status icon" className="w-4 h-4 md:w-4 md:h-4"/> 
          :null}
      
        </span>

        <div>
        <h2 className=" font-medium text-txt-primary  text-base  2xl:text-lg">{title}</h2>
         <p className="text-gray  text-sm  2xl:text-base mt-0.5">
     {description}
         </p>
      </div>
      
      </div>
      {/* Description */}
      
    </section>
  );
}