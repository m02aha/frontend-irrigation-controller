import { apiurl } from "./MainContent.jsx";

 import { convertDate } from "./convertDate";




 // //functoin to update the valve status 

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



export  default function Popup({status,action='',soilmoisture,optimum,isopen=true,setisOpen,setVstatus,setupdated, setConvertedDate}){


// click handler to change the status 


     async function handleclick(action){
const res=await updateValReq(action);
console.log(res);
setVstatus(res.status);
setupdated(res.updated_on);
    setConvertedDate(convertDate(res.updated_on));
    // setTemp(data.temperature);
    setisOpen(false);


  }


if (!isopen){
    return null; 
}


const primary=status=== 'opened' ? 'yes , close valve' : 'yes , open valve'; 
const secondry='cancel';
const textColor=status === 'opened' ? '#ffffff' : '#ffffff';


let message;
//  customize the content 
 //of popup based on the status or action to 
// render different message
if (status ==='OPEN'){
  if (soilmoisture < optimum){
    message = 'Soil moisture is below optimum. Are you sure you want to close the valve?';
  }  
  else if (soilmoisture >=optimum){
    message = 'Are you sure you want to close the valve?';
  } 
 
}else if (status ==='CLOSED'){

    if (soilmoisture >= optimum){
       message= 'Soil moisture is already Wthin optimum level. Are you sure you want to open the valve?'; 
}else if (soilmoisture<optimum) {
    message = 'Are you sure you want to open the valve?';
}


}else{
     message='are you sure to proceed?'
    

}




return (

    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">

        <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">

        <h3>{message}</h3>
       
       <div className="mt-4 flex gap-5 space-x-2">
            
            

            <PopupButton text={status=== 'OPEN' ? 'yes , close valve' : 'yes , open valve' } textColor={textColor} bgColor={status === 'OPEN' ? '#BF3A3A' : '#5ACCC1'} onClick={ ()=>handleclick(status === "OPEN" ? "CLOSED" : "OPEN")}/>
           <PopupButton text={secondry} textColor={'#222222'} bgColor={'#fffff'} onClick={ ()=>setisOpen(false)}/>
       </div>
       </div>
        </div>
);
    
}



 
function PopupButton({ text,textColor, bgColor, onClick }) {
  return (
    <button className={`h-11 w-full md:h-11 md:w-[136px] rounded  flex justify-around items-center btn-border`}
    style={{backgroundColor: bgColor, color: textColor, borderColor: textColor}} 
    onClick={onClick}
    >
    
      {text}
    </button>
  );
}