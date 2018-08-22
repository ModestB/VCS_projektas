//On scroll adds class sticky background to element with ID #header
const navbar = document.querySelector('#header');
const sticky = navbar.offsetHeight;

const addSticky = () => {
    if (window.pageYOffset >= sticky) { 
        navbar.classList.add("sticky-background")
    } else {
        navbar.classList.remove("sticky-background");
    } 
}

// ADDS @fadeIn style to single slide determined by slideIndex
// MAKES that slide visible display: block
// WAITS waitTime(ms)
// REPLACES @fadeIn style with @fadeOut
// RESOLVES after 5000ms = animationDurationTime
// MAKES all slides invisible display:none
const addSlideStyle = function(slideIndex, slides, waitTime){
    const slidesArray = Array.from(slides);
    let slide = slides[slideIndex];

    slide.style.display = "block";
    slide.style.animationName = "fadeIn";
    slide.style.animationDuration = "5s";
    
   return new Promise(resolve => {
        setTimeout(() => { 
            slide.style.animationName = "fadeOut";
            slide.style.animationDuration = "5s"; 
            setTimeout(() => {
                resolve(slidesArray.forEach((slide) => slide.style.display = "none"));
            }, 5000);            
        },waitTime)   
   });
}

// AT RUN calls addSlideStyle function for initialization
// CHECKS current slideIndex
// RESOLVES with reruning checkSlideIndex
// Infinity loop
 const  addSlide = async function (index = 0) {
    let slideIndex = index;
    const slides = document.getElementsByClassName("mySlides");

    return new Promise( async resolve => {
        await addSlideStyle(slideIndex, slides, 10000);

        if (slideIndex < slides.length-1){
            slideIndex++;
        } else if (slideIndex === slides.length -1){
            slideIndex = 0;
        } else {
            slideIndex --;
        }
        resolve(addSlide(slideIndex, slides));
    });
  }



window.onscroll = addSticky;
addSlide();

// ADD NEW METHOD FOR SLIDE BUTTONS
// -BUTTONS COLOR SHOULD CHANGE THEN SLIDE CHANGES
// -THINK ABOUT USER CLICK ON BUTTON
