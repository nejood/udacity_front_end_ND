/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * To make sure the initial HTML document has been completely loaded 
 * then fires the js functions
 * 
*/
 document.addEventListener('DOMContentLoaded', () => {
/**
 * Define Global Variables
 * 
*/
let i;
const ul = document.getElementById("navbar__list");
const allSections = document.querySelectorAll("section");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// collapsible function
function collapse(){
 this.classList.toggle("active_collapse");
let content = this.nextElementSibling;
    if (content.style.maxHeight){
    return content.style.maxHeight = null;
    } else {
    return content.style.maxHeight = content.scrollHeight + "px";
    } 
}
// Go To Top Button Functions:
// This function will return the button to the top of the document in a smooth way
function GoTop(){
window.scrollTo({
  top: 0,
  left: 0,
  behavior: 'smooth'
});
}
// When the user scrolls down 150px from the top of the document, the button will appear
function scrollFunction() {
  if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
}

// This function will check if the section in the viewport of the screen
function sectionPosition(element){
 let position = element.getBoundingClientRect();
	 if(position.top>=0){
	 return true;
	 }
	 else{
	 return false;
	 }
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
// This function will create the navbar items
function createNavItems(){
 for(section of allSections){
	  li = document.createElement("li");
	  // Get sections attributes to assign it to the <a> element
	  sectionID = section.getAttribute("id");
	  sectionName = section.getAttribute("data-nav");
	  /* Assign the section name and id, and menu__link class to all items 
	     then append it to the menu*/
	 // Scroll to section on link click
	  li.innerHTML = `<a class='menu__link' href='#${sectionID}'>${sectionName}</a>`;
	  ul.appendChild(li);
 }
}


// Add class 'active' to section when near top of viewport
/* This function will control of the active section on the navbar,
   it works while the page scroll or by click the item
*/
function activeMenu(){
/* the number of pixels that the document is currently scrolled vertically 
   minus the approximate navbar size */	
let fromTop = window.scrollY - 60;
let menuNavLinks = document.querySelectorAll(".menu__link");
	menuNavLinks.forEach(item => {
	  let menuNavLink = document.querySelector(item.hash);
	  // sum the height of navbar and the distance of the outer border of the navbar
	  let total = menuNavLink.offsetTop + menuNavLink.offsetHeight;
		    if ( total > fromTop + 65 && menuNavLink.offsetTop <= fromTop + 65) {
		      item.classList.add("active");
		    } else {
		      item.classList.remove("active");
		    }
	  });
}
/* This function will control of the active section on the screen,
   it works while the page are scrolling 
*/
function activeSection(){
 for(section of allSections){ 
	// check if the section in the viewport of the screen
	  if(sectionPosition(section)){
	// check if the section has the active class or not
	   if(section.classList.contains("your-active-class")){
	   	section.classList.remove("your-active-class"); }
	   else{
	    section.classList.add("your-active-class");}
	  }
 }
}
// Scroll to anchor ID using scrollTO event
/**
 * End Main Functions
 * Begin Events
 * 
*/
// Build menu 
createNavItems();
// Set the active sectionin the navbar
window.addEventListener("scroll", activeMenu);
// Set sections as active
document.addEventListener("scroll", activeSection);
// Build Collapsible 
let collapsible = document.getElementsByClassName("collapsible");
for (i = 0; i < collapsible.length; i++) {
  collapsible[i].addEventListener("click", collapse);
}
// Build Go To Top Button
const topBtn = document.getElementById("btn"); 
topBtn.addEventListener("click" , GoTop);
// To control the appearance of the button
window.onscroll = function() {scrollFunction()};

});