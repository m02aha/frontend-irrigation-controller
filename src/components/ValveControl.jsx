import React from "react";

function ValveButton({ label, onClick, isOpen ,primary,textColor}) {
  return (
    <button className={`h-11 w-full md:h-11 md:w-[136px] rounded  flex justify-around items-center btn-border`}
    style={{backgroundColor: primary, color: textColor, borderColor: textColor}} >
    
      {label}
    </button>
  );
}

export default function ValveControl({ status = "Closed" }) {
  return (
    <div>
     
        <h2 className=" hidden md:block text-txt-primary  font-medium text-sm xl:text-sm 2xl:text-base">Water valve status</h2>
        
         <div className="  flex flex-col justify-center  items-center mt-14 md:mt-16 gap-14">
        <span className="text-txt-status font-medium text-3xl md:text-4xl xl:text-4xl">
          {status}
        </span>
    
      <div className="w-full  md:w-auto flex flex-col md:flex-row xl:flex-col gap-6 xl:gap-4 xl:mt-4 justify-center">
        <ValveButton
          label={status === "Open" ? "CLOSE VALVE" : "OPEN VALVE"}
         
          isOpen={status === "Open"}
          primary="#5ACCC1"
          textColor="#ffffff"
        />

         <ValveButton
          label={'SET TIMER'}
         
          isOpen={status === "Open"}
             primary='#ffffff'
          textColor='#000000'
        />
      </div>
     </div>


      </div>

  );
}