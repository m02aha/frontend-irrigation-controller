import MobileTbar from "./MobileTbar";
import TopBar from "./TopBar";
import Overview from "./Overview";
import SensorReadings from "./SensorReadings";
import ValveControl from "./ValveControl"; 
import thermo from "../assets/thermo.svg";
import rain from "../assets/rain.svg";

export default function MainContent({isNavOpen,setIsNavOpen}){
return(     
     <main className="flex-1 bcg-primary
     min-h-screen  bg-bcg-primary">


     <MobileTbar isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen}/>
  
       {/* main content area */}
      <TopBar/>


       {/* the readings and valve control */}
      <div className="  container mt-4 md:mt-8 xl:mt-8 grid grid-cols-1 xl:grid-cols-[1.75fr_1fr] gap-y-3 md:gap-y-4  gap-x-4 md:gap-x-5">
         <div >
          
        <  Overview/>
  

         <h2 className="  mt-2 md:mt-4  text-lg md:text-[16px]   text-gray">Sensor status</h2>
        
         <div className=" mt-3 xl:mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4 md:gap-y-6 ">
          
          <SensorReadings iconSvg={rain} iconBg="bg-icon-moisture-bg" title="Soil moisture" SensorData="27" updated='5 mins'/>
          
          <SensorReadings iconSvg={thermo} iconBg="bg-icon-temp-bg" title="Temperature" SensorData="45" updated='5 mins'/>


          </div>
          </div>

       <div >
         <h2 className="  mt-2 md:mt-4  text-lg  xl:hidden text-gray">Valve control</h2>
        <div className="card w-full mt-3.5 md:mt-4  xl:mt-0">
      <ValveControl status="Closed" />
  
      </div>
       </div>
     

      </div>


      {/* the graph */}
  </main>);



}

