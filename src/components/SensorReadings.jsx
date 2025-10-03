import { useEffect, useState } from "react";
import {formatUpdatedAgo} from "./formatUpdated";

export default function SensorReadings({iconSvg, iconBg, title,SensorData,updated_on}) {

   const [updated,setUpdated]=useState(()=>formatUpdatedAgo(updated_on));
   


  useEffect(

    ()=>{
   setUpdated(formatUpdatedAgo(updated_on))
      const interval=setInterval(()=>{
   setUpdated(formatUpdatedAgo(updated_on));
      },30000)

      return ()=>clearInterval(interval);
    }
    
    ,[updated_on])


    return(
            <div className="card w-full flex flex-col gap-4 md:gap-6">
                {/* Icon and Title */}
                <div className="flex gap-3 items-start">
                  {/* Example icon (replace with your own SVG or icon) */}
                  <span className={`inline-flex  items-center justify-center w-6 h-6 md:w-7 md:h-7  rounded-lg ${iconBg}`} >
                    <img src={iconSvg} alt="status icon" className="w-4 h-4 md:w-4 md:h-4"/>
                  </span>
                  <div className="flex md:flex-col flex-row gap-8 ">
                      <div>
                  <h2 className="  text-txt-primary  font-medium text-base  xl:text-base 2xl:text-lg">{title}</h2>
                  <p className="text-gray  text-sm  2xl:text-base  mt-0.5">
                    {updated} 
                   </p>
                   </div>

                
                      <p className="text-txt-primary font-light text-5xl md:text-[2.5rem]  mt-14 md:mt-0 mb-9   ">
                      {title=== 'Temperature' ? `${SensorData} °C` : `${SensorData} %`}
                      </p>
                  
                </div>
                
                </div>
                {/* Description */}
                
              </div>
    );
}