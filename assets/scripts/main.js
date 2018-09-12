'use strict';

//On scroll adds class sticky background to element with ID #header
//const navbar = document.querySelector('#header');
//const sticky = navbar.offsetHeight;
function addSticky() {
    try {
        const navbar = document.querySelector('#header');
        const sticky = navbar.offsetHeight;
    
        window.addEventListener('scroll', () => {
            if (window.pageYOffset >= sticky) { 
                navbar.classList.add("sticky-background");
            } else {
                navbar.classList.remove("sticky-background");       
            }; 
        }); 
    } catch (error) {
        
    };
};


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
        progressText.innerHTML = `${progressAmount}%`;   
    });
};


// =============================================================================
// RETURN current page y position
// =============================================================================
function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop){
        return document.documentElement.scrollTop;
    };
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
};

// =============================================================================
// RETURN elements with eID y position
// =============================================================================
function elmYPosition(eID) {
    const elm = document.querySelector(eID);  
    let y = elm.offsetTop;
    let node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;   
    }; 
    return y; 
};

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
    const startY = currentYPosition();
    let stopY = elmYPosition(eID);
    if(eID !== '#contact') {
        stopY = stopY - 120;
    };
    const distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY);
        return;
    }; 
    let speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    const step = Math.round(distance / 25);
    let leapY = stopY > startY ? startY + step : startY - step;
    let timer = 0;

    // PERFORMS downward scroll
    if (stopY > startY) {
        for (let i = startY; i < stopY; i += step) {
            setTimeout(`window.scrollTo(0, ${leapY})`, timer * speed);
            leapY += step;
            if (leapY > stopY) leapY = stopY;
            timer++;
        }; 
        return;
    };
    // PERFORMS upward scroll
    for (let i = startY; i > stopY; i -= step) {
        setTimeout(`window.scrollTo(0, ${leapY})`, timer * speed);
        leapY -= step; 
        if (leapY < stopY) leapY = stopY;
        timer++;
    };
};

// ADD window scroll event listener
// DETERMINE section top 'coordinate' - 120 (section top Y)
// DETERMINE section heigth
// DETERMINE currentY
// IF currentY is below sectionTop Y AND currentY above sectionBottom Y (sectionTop + sectionHeight)
// TRUE add class active to navElement
// ELSE remove
function activeClass(sectionId, navElement){
    const sectionEle = document.querySelector(sectionId);
    const sectionTop = sectionEle.offsetTop - 150;
    const sectionHeight = sectionEle.offsetHeight;
    const currentY = currentYPosition();

    if(currentY >= sectionTop && currentY < (sectionTop + sectionHeight)){
        navElement.classList.add('active'); 
    } else {
        navElement.classList.remove('active');
    };
};

// =============================================================================
// ADD all anchor elements in nav tag to elements ARRAY
// ADD eventListener "click" forEach element in elements ARRAY
// ONCLICK determine element ID ---> eID by getting element attribute href
// ADD smoothScroll
// ADD activeClass
// =============================================================================
function addActionOnScroll(){
    const elements = document.querySelectorAll("nav a, .hero a");
    elements.forEach((element) => {
        let eID = element.getAttribute('href');
        if(eID[0] == '#') {
            element.addEventListener("click", (event) =>{
                event.preventDefault();
                smoothScroll(eID); 
            });
            window.addEventListener('scroll', () => {
                activeClass(eID, element); 
            });
        };
    });
};


//BURGER
function responsiveMenu(){
    const nav = document.querySelector("nav");
    try {
        const burgerIcon = document.querySelector(".hamburger");
        nav.classList.add('responsive');

        burgerIcon.addEventListener('click', (event) => {
            event.preventDefault();
            nav.classList.toggle('responsive__active');
            burgerIcon.classList.toggle('is-active');
        });
        window.addEventListener('scroll', () => {
            nav.classList.remove('responsive__active');
            burgerIcon.classList.remove('is-active');
        });
        window.addEventListener('resize', () => {
            nav.classList.remove('responsive__active');
            burgerIcon.classList.remove('is-active');
        });
    } catch (error) {
        
    };
};


// FIND .card__text p innerHTML text
// CHECK if it's longer than 80 characters
// TRUE cut to 80 characters add ... on the end
// CHANGE .card__text p innerHTML to updated value
function cardTextAdjust(selector, charAmount) {
    const textElArr = document.querySelectorAll(selector);
    textElArr.forEach((textEl) => {
        let text = textEl.innerHTML;
        if(text.length > charAmount){
            textEl.innerHTML = `${text.substring(0, charAmount)}...`    
        };   
    });
};

// FIND upButton by class name
// GET id of topElement to scroll to
// GET topElement block height
// CHECK if currentY position ir greater than topElement Height
// TRUE display icon
// ELSE not display
// ADD smooth scrolling on upButton
function addUpButton(){
    try {
        const upButton = document.querySelector(".button-top");
        const topElement = document.querySelector(upButton.getAttribute('href'));
        const topElemeHeight =  topElement.offsetHeight;
        window.addEventListener('scroll', () => {
            let currentY = currentYPosition();
            if(currentY > topElemeHeight){
                upButton.style.display = "block";
            } else {
                upButton.style.display = "none";
            };
        });
        upButton.addEventListener("click", () =>{
            smoothScroll(upButton.getAttribute('href')); 
        });
    } catch (error) {
        
    };
};

// =============================================================================
// SWIPER INITIALIZATION
// =============================================================================
function initializeSwiper(){
    const swiper = new Swiper('.swiper-container', {
        spaceBetween: 40,
        centeredSlides: true,
        autoplay: {
            delay: 15000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
};


function particleLoad() {
    /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
   particlesJS.load('particles-js', './assets/scripts/particle/particles.json');
};

// =============================================================================
// FUNCTION CALLS
// =============================================================================
    particleLoad();
    addActionOnScroll();
    responsiveMenu();
    addSticky();
    progressBarLoader();
    cardTextAdjust('.card__text p', 80);
    cardTextAdjust('.card__text a h2', 25);
    initializeSwiper();
    addUpButton();

