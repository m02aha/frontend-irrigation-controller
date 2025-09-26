

import React from "react";
import check from "../assets/check.svg";

const iconSvg=check;
// // const iconBg= 'icon-good-bg';
// const title='Everything is running smoothly';
// const description='Soil moisture levels are optimal. No action needed.';

export default function Overview({iconSvg,iconBg='icon-good-bg',title ='System Overview',description=' Here you will see updates  about your irrigation system.'}) {
  return (
    <section className="card w-full flex flex-col gap-4 md:gap-6">
      {/* Icon and Title */}
      <div className="flex gap-3 items-start">
        {/* Example icon (replace with your own SVG or icon) */}
        <span className={`inline-flex  items-center justify-center w-6 h-6 md:w-7 md:h-7  rounded-full bg-${iconBg}`} >
          <img src={check} alt="status icon" className="w-4 h-4 md:w-4 md:h-4"/>
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