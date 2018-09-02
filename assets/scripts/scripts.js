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
//addSlide();


// ON PAGE LOAD gets .progress-bar p innerText value --> progressText
// PARSE progressText to integer --> progressAmount
// CHECKS if progressAmount is NaN
// UPDATES .progress-bar width with innerText value
// innerText must be ---> num ===> 75;85;2
// UPDATES .progress-bar p innerText value
function progressBarLoader(){
    const elementsArr = document.querySelectorAll(".progress-bar");
    elementsArr.forEach((element) => {
        const  progressText = element.firstElementChild;
        let progressAmount = parseInt(progressText.innerText);

        isNaN(progressAmount) ? progressAmount = 0 : progressAmount; 
        element.style.width = `${progressAmount}%`;
        progressText.innerHTML = progressAmount + '%';   
    });
    
};

progressBarLoader()

// =============================================================================
// RETURN current page y position
// =============================================================================
function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
}

// =============================================================================
// RETURN elements with eID y position
// =============================================================================
function elmYPosition(eID) {
    var elm = document.querySelector(eID);
    var y = elm.offsetTop;
    var node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;   
    } 
    return y; 
}

// =============================================================================
// ADD smooth scrolling to element with eID
// DECREMENT stopY position by navHeigh * 1.5 ---> fixes navbar overlaping section
//           except for element with id = #contact
// DETERMENT distance to scroll
//           then distance is < 100px jumps without smooth scrolling
// DETERMENT speed with limit = 20 
// DETERMENT step size --> distance to jump each time the visible top of page 
//           Y coordinate is changed
// DETERMENT leapY next coordinate to jump to
// =============================================================================
function smoothScroll(eID) {
    var startY = currentYPosition();
    var stopY = elmYPosition(eID);
    //var navHeigh = document.querySelector("nav").clientHeight;
    if(eID !== '#contact') {
        stopY = stopY - 120;
    }
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY);
        return;
    } 
    var speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;

    // PERFORMS downward scroll
    if (stopY > startY) {
        for (var i = startY; i < stopY; i += step) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY += step;
            if (leapY > stopY) leapY = stopY;
            timer++;
        } 
        return;
    }
    // PERFORMS upward scroll
    for (var i = startY; i > stopY; i -= step) {
        setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
        leapY -= step; 
        if (leapY < stopY) leapY = stopY;
        timer++;
    }
}

// =============================================================================
// ADD all anchor elements in nav tag to elements ARRAY
// ADD eventListener "click" forEach element in elements ARRAY
// ONCLICK determine element ID ---> eID by getting element attribute href
// ADD smoothScroll
// =============================================================================
function addSmoothScroll(){
    elements = document.querySelectorAll("nav a");
    elements.forEach((element) => {
        element.addEventListener("click", (event) =>{
            event.preventDefault();
            eID = element.getAttribute('href');
            smoothScroll(eID); 
        });
    });
};

addSmoothScroll();


//BURGER

function responsiveMenu(){
    nav = document.querySelector("nav");
    burgerIcon = document.querySelector(".burger")

    burgerIcon.addEventListener('click', (event) => {
        event.preventDefault();
        nav.classList.toggle('responsive');
    })
    window.addEventListener('scroll', () => {
        nav.classList.remove('responsive');
    })
};

responsiveMenu();


function cardTextAdjust() {
    textElArr = document.querySelectorAll(".card__text");
    textElArr.forEach((textEl) => {
        let text = textEl.innerHTML;
        if(text.length > 80){
            textEl.innerHTML = `${text.substring(0, 80)}...`    
        }   
    })
}
cardTextAdjust()