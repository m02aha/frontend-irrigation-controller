import React from "react";



export function formatUpdatedAgo(jsontime){
  const currentTime=new Date();
  const pastTime=new Date(jsontime+"Z"); //add Z to indicate it's in UTC time

  const diffDate=currentTime - pastTime //this is in millseconds
  const diffDays=Math.floor(diffDate/(1000*60*60*24));
  const diffHour=Math.floor(diffDate/(1000*60*60));
  const diffMins=Math.floor(diffDate/(1000*60));
   const diffSec=Math.floor(diffDate/(1000));

console.log('diff days',diffDays);
console.log('diff h',diffHour);
console.log('diff m',diffMins);
console.log('current time',currentTime);

 if (diffDays>0){
  return diffDays+' days ago';
 }
  if (diffHour>0){
  return diffHour+' hours ago';
 }
  if (diffMins>0){
  return diffMins+' mins ago';
 }
   if (diffSec>0 && diffSec<60){
  return diffSec+' sec ago';
 }
  return 'just now';

}

