// reference: https://stackoverflow.com/questions/6135433/javascript-check-end-date-is-greater-than-or-equal-to-start-date

function checkDate(startDate, endDate){
console.log("::: Running checkDate :::");
var startD = new Date(startDate);
var endD   = new Date(endDate);

if(endD.getTime() > startD.getTime()){
  return true;
}
else{
  return false;
}
}


export { checkDate }