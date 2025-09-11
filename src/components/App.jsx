import React from 'react';
import { useState } from 'react';

import sfg from "../assets/sfg.svg";

function App() {

  const [isNavOpen, setIsNavOpen] = useState(false);


  return (

    <div className="w-full flex relative"> 

      <AsideNavigation isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen}/>
      <MainContent />

  </div>
  );
}

export default App; 



function AsideNavigation({isNavOpen,setIsNavOpen}){


     {/* nav bar is a humburger menue , overlayered in the mobile , aside otherwise */}

  return(  <aside className=  {`xl:w-[248px]  md:w-20 w-11/12  min-h-screen  absolute md:static left-0 top-0 bg-sidenav-bg transform 
    ${isNavOpen?'translate-x-0':'-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out
    z-20`} >

      {/* logo and name */}
<div className='px-6 py-6 mx-auto flex gap-2 items-center
justify-center' >
  <div>
  <img src={sfg} alt="logo" />



  
  </div>
  <span className='text-white text-xl font-semibold md:hidden block' > SFG group</span>
  </div> 


 <div>

  <button className={isNavOpen?``:`hidden md:hidden`} onClick={()=>setIsNavOpen(false)}>X </button>

 </div>
  </aside>);
}



function MainContent(){
return(     
     <main className="flex-1 bg-amber-700 min-h-screen  ">



    {/* the top bar is hidden in tablets and larger screens */}
     <div className="w-full bg-amber-50 h-16 px-4 md:hidden  flex items-center ">
  
     {/* humberger icon */}
    <svg width={20} 
  height={10}
  onClick={()=>setIsNavOpen((prev)=>!prev)}
  viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.0498 9.36597C19.0498 9.54373 18.8942 9.68851 18.6807 9.78589C18.4627 9.88529 18.165 9.94603 17.8389 9.94604L2.16113 9.94604C1.83504 9.94603 1.53734 9.88529 1.31934 9.78589C1.10582 9.68851 0.950195 9.54373 0.950195 9.36597C0.950314 9.18826 1.10584 9.04339 1.31934 8.94604C1.53734 8.84665 1.83506 8.78688 2.16113 8.78687L17.8389 8.78687C18.1649 8.78688 18.4627 8.84665 18.6807 8.94604C18.8942 9.04339 19.0497 9.18826 19.0498 9.36597Z" fill="#6E8325" stroke="#6E8325" stroke-width="0.1" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.0498 5.44775C19.0498 5.62161 18.9177 5.76754 18.7305 5.8667C18.541 5.96702 18.2826 6.02783 18 6.02783L2 6.02783C1.71741 6.02783 1.45904 5.96702 1.26953 5.8667C1.08225 5.76754 0.950195 5.62161 0.950195 5.44775C0.950299 5.27403 1.08241 5.12891 1.26953 5.02979C1.45904 4.92944 1.71737 4.86865 2 4.86865L18 4.86865C18.2826 4.86865 18.541 4.92944 18.7305 5.02979C18.9176 5.12891 19.0497 5.27403 19.0498 5.44775Z" fill="#6E8325" stroke="#6E8325" stroke-width="0.1" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.0498 1.5293C19.0498 1.70706 18.8942 1.85184 18.6807 1.94922C18.4627 2.04862 18.165 2.10936 17.8389 2.10937L2.16113 2.10937C1.83504 2.10936 1.53734 2.04862 1.31934 1.94922C1.10582 1.85184 0.950195 1.70706 0.950195 1.5293C0.950315 1.35159 1.10584 1.20672 1.31934 1.10937C1.53734 1.00998 1.83506 0.950214 2.16113 0.950195L17.8389 0.950195C18.1649 0.950215 18.4627 1.00998 18.6807 1.10937C18.8942 1.20672 19.0497 1.35159 19.0498 1.5293Z" fill="#6E8325" stroke="#6E8325" stroke-width="0.1" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</div>



    {/* main content area */}

    <div className='container bg-white'>test</div>
  </main>);


// 4.retrun do the nav bar 
// 4.and top bar in mobile 
// 5.then main caontent top bar in all screen 
}