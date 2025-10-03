import React from "react";
import { apiurl } from "./MainContent.jsx";
import { formatUpdatedAgo } from "./formatUpdated";
 import { convertDate } from "./convertDate";
function ValveButton({ label, onClick, isOpen ,primary,textColor}) {
  return (
    <button className={`h-11 w-full md:h-11 md:w-[136px] rounded  flex justify-around items-center btn-border`}
    style={{backgroundColor: primary, color: textColor, borderColor: textColor}} 
    onClick={onClick}
    >
    
      {label}
    </button>
  );
}
//functoin to update the valve status 

async function updateValReq(action) {
  
  try{
    const res=await fetch(apiurl,{
      method:'PATCH',
      headers:{
     "Content-Type": "application/json",     
     "Accept": "application/json"     
        
      },
      body:JSON.stringify({status:action})
    });

    const data=await res.json();
        return data;
  }
  catch(error){
    console.log(error);
  }
}

export default function ValveControl({ vstatus,setVstatus,setupdated, setConvertedDate}) {

     async function handleclick(action){
const res=await updateValReq(action);
console.log(res);
setVstatus(res.status);
setupdated(res.updated_on);
    setConvertedDate(convertDate(res.updated_on));
    // setTemp(data.temperature);



  }

  return (
    <div>
     
        <h2 className=" hidden md:block text-txt-primary  font-medium text-sm xl:text-sm 2xl:text-base">Water valve status</h2>
        
         <div className="  flex flex-col justify-center  items-center mt-14 md:mt-16 gap-14">
        <span className="text-txt-status font-medium text-3xl md:text-4xl xl:text-4xl">
          {vstatus}
        </span>
    
      <div className="w-full  md:w-auto xl:mb-14 flex flex-col md:flex-row xl:flex-col gap-6 xl:gap-4 xl:mt-4 justify-center">
        <ValveButton
          label={vstatus === "OPEN" ? "CLOSE VALVE" : "OPEN VALVE"}
        onClick={()=>handleclick(vstatus === "OPEN" ? "CLOSED" : "OPEN")}
          primary={vstatus === "OPEN" ? "#BF3A3A" : "#5ACCC1"}
          textColor="#ffffff"
        />

         {/* <ValveButton
          label={'SET TIMER'}
         
   
             primary='#ffffff'
          textColor='#000000'
        /> */}
      </div>
     </div>


      </div>

  );
}