//On scroll add class sticky background to element with ID #header
/* BUGS:
    --sticky-bakground uzlenda uz nuotraukos self-img
*/
const navbar = document.querySelector('#header');
const sticky = navbar.offsetHeight;

const addSticky = () => {
    // console.log(sticky)
    // console.log(window.pageYOffset)
    if (window.pageYOffset >= sticky) {
        
        navbar.classList.add("sticky-background")
    } else {
        navbar.classList.remove("sticky-background");
    } 
}

window.onscroll = addSticky;



