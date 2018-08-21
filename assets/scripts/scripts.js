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



showSlides();

// function plusSlides(n) {
//   showSlides(slideIndex += n);
// }

// function currentSlide(n) {
//   showSlides(slideIndex = n);
// }

// function showSlides(n) {
    
//   let i;
//   const slides = document.getElementsByClassName("mySlides");
//   const  dots = document.getElementsByClassName("dot");

//   if (n > slides.length) {
//       slideIndex = 1
//   }    
//   if (n < 1) {
//       slideIndex = slides.length
//   }

//   for (i = 0; i < slides.length; i++) {
//       slides[i].style.display = "none";     
//   }
//   for (i = 0; i < dots.length; i++) {
//       dots[i].className = dots[i].className.replace(" active", "");
//   }
//   slides[slideIndex-1].style.display = "block";
//   dots[slideIndex-1].className += " active";
// }

function addSlideStyle(slideIndex, slides){
    slides[slideIndex].style.display = "block";
    slides[slideIndex].style.animationName = "fadeIn";
    slides[slideIndex].style.animationDuration = "5s";
    
   
    window.setInterval(() => {
        slides[slideIndex].style.animationName = "fadeOut";
        slides[slideIndex].style.animationDuration = "5s";
       
   }, 10000)
   
}

function showSlides() {
    let slideIndex = 0;

    const slides = document.getElementsByClassName("mySlides");
    const slidesArray = Array.from(slides);
    console.log(slidesArray.length)
    
    // slides[slideIndex].style.display = "block";
    addSlideStyle(slideIndex, slides)


    window.setInterval(() => {
       slidesArray.forEach((slide) => slide.style.display = "none");

       if (slideIndex < slides.length-1){
           slideIndex++;
       } else if (slideIndex === slides.length -1){
           slideIndex = 0;
       } else {
            slideIndex --;
       }

       console.log(slideIndex)
       addSlideStyle(slideIndex, slides)
    }, 15000);
    console.log("works")




  
    // if (n > slides.length) {
    //     slideIndex = 1
    // }    
    // if (n < 1) {
    //     slideIndex = slides.length
    // }
  
    // for (i = 0; i < slides.length; i++) {
    //     slides[i].style.display = "none";     
    // }

    // slides[slideIndex-1].style.display = "block";
  }
