/*
    Javascript for websites, optimized for IE versions < Edge
    Call functions as needed. Include Animate.css for animation functions. 
*/

// Form Script
var initializeForms = function() {
// Grab the input containers
var inputContainers = [].slice.call(document.querySelectorAll('.input-container'));
// Map through and add event listeners
    inputContainers.map(function(inputContainer) {        
        var input = inputContainer.querySelector('.input');
        if(input.value !== '') inputContainer.classList.add('active');
        input.addEventListener('focus', function(){
            inputContainer.classList.add('active');
        });
        input.addEventListener('focusout', function(){
           if(input.value === '') {
                inputContainer.classList.remove('active');
           }
        });
    });
    // Form handling
    var forms = [].slice.call(document.querySelectorAll('.form'));
    forms.map(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();      
            var action = form.getAttribute('action');
            var method = form.getAttribute('method');
            var http = new XMLHttpRequest();
            var spinner = form.querySelector('.spinner');
            var btn = form.querySelector('.btn');
            spinner.classList.add('active');
            // var thisForm = document.getElementById(form.getAttribute('id'));
            // console.log(thisForm);
            var data = new FormData(form);
            var honeypot = form.querySelector('.fname');
            if(honeypot.value != '') {
                spinner.classList.remove('active', 'fa-spinner');
                spinner.classList.add('complete', 'fa-times');
                btn.value = 'Invalid';
            } else {
                 // console.log(dataTwo);
            http.open(method, action, true);
            http.onload = function() {
                if (http.status == 200) {     
                    spinner.classList.remove('active', 'fa-spinner');
                    spinner.classList.add('fa-check', 'complete');
                    btn.value = 'Thank You!'
                }
                
            
            };
            http.send(data); 
            form.reset();
            var inputs = [].slice.call(form.querySelectorAll('.input-container'));
            inputs.map(function(input){
                input.classList.remove('active');
            })
            }
           
        })
    });
}

var initializeMenu = function() {
    var doc = document.querySelector('body');   
    var menu = document.querySelector('.menu');
    var button = document.querySelector('.navigation-button');
    button.addEventListener('click', function(e){
        e.stopPropagation();
        menu.classList.contains('active') ? menu.classList.remove('active') : menu.classList.add('active');
    });
    doc.addEventListener('click', function (e) {
        menu.classList.remove('active');
    });
    doc.addEventListener('touchmove', function(e) {
        menu.classList.remove('active');
    });
}

var initializeFixedBanner = function(){
    var banner = document.querySelector('.banner');
    var h1 = document.querySelector('.banner h1');
    var h2 = document.querySelector('.banner h2');
    var banner_height = banner.clientHeight;
    var first_section = document.querySelector('.first-section');
    first_section.style.marginTop = banner_height + 'px';
    console.log(banner_height);

    setTimeout(function(){
        h1.classList.remove('hidden');
        h1.classList.add('animated', 'fadeInLeft');
        setTimeout(function(){
            h2.classList.remove('hidden');
            h2.classList.add('animated', 'fadeInRight');
        }, '300');
    }, '300');


}
// Determine if an element is in the visible viewport
function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    var html = document.documentElement;
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || html.clientHeight) &&
      rect.right <= (window.innerWidth || html.clientWidth)
    );
  }

var initializeScrollingElements = function(fixedHeader, elementArray) {

    /*
        Setting up animations:
        To hide elements initially give them the class 'hide'. This function will check if the element is in view, remove the 'hide' class and add the animation classes from Animate.css. This function relys on Animate.css to function. This function can also take a parent element with elements within that need to be animated on a delay. See below for details.

        Pass in values:
        fixedHeader = bool | true or false
        elementArray: 
            two dimensional array - [['.class', 'animationClass']] <- this will animate a single object with a single animation
                if you need to animate a group of objects with a delay between such as a 3 column row:
                [['.slide-in-cols', 'fadeInUp', '.card', 300]] 
                    0: parent element
                    1: animation
                    2: animated element
                    3: delay between animations
                Make sure you have a unique class or identifier for your child elements, this code uses querySelectorAll to grab everything within the parent with the animated element identifier. 
            
            Example of usage: 
            initializeScrollingElements(true, [['.section-one p', 'fadeInLeft'], ['.section-two', 'fadeInUp', '.col', 300]])
             You have a fixed header, a div called '.section-one' that has a single paragraph that needs to fade in from the left, and a row of 3 columns within '.section-two' that need to fade in upward animated with a 300ms delay

                
    */

    document.addEventListener('scroll', function(){
        if(fixedHeader){
            var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            var header = document.querySelector('header');
            if(scrollTop === 0){
                header.classList.remove('active');
            }
            if(scrollTop > 300){
                header.classList.add('active');
            }
        }
        elementArray.map(function(entry){            
            var element = document.querySelector(entry[0]);
            var animation = entry[1];             
            if(isInViewport(element)){
                if(entry[2] != undefined || entry[2] != null){
                    var inners = [].slice.call(element.querySelectorAll(entry[2]));
                    inners.forEach(function(inner, index){
                        setTimeout(function(){                              
                            inner.classList.remove('hidden');
                            inner.classList.add('animated', animation);
                        }, entry[3] * index);
                    });
                    
                    }
                 else {
                    element.classList.remove('hidden');
                    element.classList.add('animated', animation);                
                }
            }
        
        }); 
    });
}



