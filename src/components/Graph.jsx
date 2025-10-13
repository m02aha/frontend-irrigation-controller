import "chartjs-adapter-date-fns";

import { Line } from "react-chartjs-2";
 import Chart from "chart.js/auto";

export function Graph({chartData}){ 

return(

    <div className=" card mt-4 md:mt-8 xl:mt-8 relative w-full h-[300px] sm:h-[400px] md:h-[500px] ">
      
      <div  className=" flex justify-between items-center mb-2 md:mb-4">
        <h2 className=" hidden md:block text-txt-primary  font-medium text-sm xl:text-sm 2xl:text-base"> Moisture Levels</h2>
          
      </div>
        <Line data={chartData} options={
         { 
          elements: {
           point: {
               radius: 0,
              hoverRadius: 5
            }
            ,
             line: {
              tension: 0.4, // smooth curve
              borderWidth: 1.5,
              borderColor: 'rgb(96,179,132)' // Tailwind blue-500
               }
             }
          ,
          scales:{
            x:{
                type:'time',
                time:{
                    unit:'hour',
                    displayFormats:{
                        hour:'HH:mm'
                    }
                }
               , grid: {
                color: "#ffffff", // light gray grid
                borderColor: "transparent", // hide border line
            
                  }
                ,
                 ticks: {
                   source: "auto",
                   autoSkip: true,
                  maxTicksLimit: 6  
                     // Control how many labels show
                     
                      , color: "#333333", // Tailwind gray-700
                 font: {
                  size: 12,
                  family: "Inter, sans-serif",
                   weight: "600"
                     }
                    },
            //   title: {
            //       display: true,
            //      text: "Time (hours)"
            //               }
            }
              
            ,
            y:{
            grid: {
               color: "rgba(209, 213, 219, 0.3)",
                        borderDash: [4, 4],// hide border line
                  drawBorder: false,
                  drawOnChartArea: true, // ensures the dashed lines are drawn on the chart area
                   clip: false,

                   },
            ticks:{
              color:'#000000',
              font:{
                size:12,
                family: "Inter, sans-serif",
                   weight: "600"
              }
            }
                
            }
          }
}
        }/>
    </div>
);


}