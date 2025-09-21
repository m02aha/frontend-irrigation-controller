import MobileTbar from "./MobileTbar";
import TopBar from "./TopBar";

export default function MainContent({isNavOpen,setIsNavOpen}){
return(     
     <main className="flex-1 bcg-primary
     min-h-screen  bg-bcg-primary">


     <MobileTbar isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen}/>
  
       {/* main content area */}
      <TopBar/>


       {/* the readings and valve control */}
      <div className="  container mt-4 md:mt-8 xl:mt-10 grid grid-cols-1 xl:grid-cols-[1.75fr_1fr] gap-y-10  gap-x-4 md:gap-x-5">
         <div >
        <section className="card w-full">
          notification center
        </section>

        <div className=" md:mt-5 xl:mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-y-6 xl:gap-y-8">
          <div className="card w-full">
            1
         </div>
         <div className="card w-full">
            2
         </div>
          </div>
          </div>


      <div className="card w-full">
      valve control

      </div>

      </div>


      {/* the graph */}
  </main>);



}

