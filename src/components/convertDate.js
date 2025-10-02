
//convert json timestamp to a readble date

export  function convertDate(jsontime){

const converted=new Date(jsontime);
const day=converted.getDate();
const year=converted.getFullYear();
const monthName=converted.toLocaleString('default',{month:'long'});

return `${monthName} ${day}, ${year}`;
}

// console.log('converted date',convertDate('2025-08-18T15:52:28.222287'));
