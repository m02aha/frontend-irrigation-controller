import { useEffect, useState } from "react";
import {formatUpdatedAgo} from "./formatUpdated";

export default function SensorReadings({iconSvg, iconBg,moistureBg, title,SensorData,updated_on}) {

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
           
           <div className="card  relative overflow-hidden  w-full flex flex-col gap-[0px] md:gap-6">
      
           
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
                {title=== "Soil moisture"&&  
                
(<svg  
                
          className=" absolute z-10 w-fit  bottom-3.5 right-3.5 h-14"
                
                viewBox="0 0 227 53" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M63.2187 23.2347C46.6579 21.7494 15.0021 46.5934 0.336545 51.4942L21.1431 52.503L226.975 51.4943L226.632 0.000544233C213.737 3.51059 207.122 6.45716 193.611 8.98858C171.793 13.0764 155.255 5.73188 135.436 12.5835C118.178 18.5499 122.798 34.5123 103.126 36.2784C85.5344 37.8576 80.7887 24.8105 63.2187 23.2347Z" fill="url(#paint0_linear_142_1366)" fill-opacity="0.4"/>
<defs>
<linearGradient id="paint0_linear_142_1366" x1="124.221" y1="-14.1062" x2="124.532" y2="49.4398" gradientUnits="userSpaceOnUse">
<stop stop-color="#DA8184"/>
<stop offset="1" stop-color="#CA6B6E" stop-opacity="0"/>
</linearGradient>
</defs>
</svg>
    )

      
              }
               
              </div>
    );
}