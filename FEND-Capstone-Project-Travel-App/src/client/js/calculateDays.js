// reference: https://dev.to/dailydevtips1/vanilla-javascript-days-between-two-dates-3d1i

function calculateDays(startDate, endDate){
console.log("::: Running calculateDays :::");

var date1 = new Date(startDate);
var date2   = new Date(endDate);

var difference = date1.getTime() - date2.getTime();
var days = Math.ceil(difference / (1000 * 3600 * 24));

return days;
}
export { calculateDays }