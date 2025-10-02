
export function formatUpdatedAgo(jsontime){
  const currentTime=new Date();
  const pastTime=new Date(jsontime);

  const diffDate=currentTime - pastTime //this is in millseconds
  const diffDays=Math.floor(diffDate/(1000*60*60*24));
  const diffHour=Math.floor(diffDate/(1000*60*60));
  const diffMins=Math.floor(diffDate/(1000*60));

console.log('diff days',diffDays);
console.log('diff h',diffHour);
console.log('diff m',diffMins);

 if (diffDays>0){
  return diffDays+' days ago';
 }
  if (diffHour>0){
  return diffHour+' hours ago';
 }
  if (diffMins>0){
  return diffMins+' mins ago';
 }
  return 'just now';

}