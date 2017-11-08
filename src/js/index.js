/*
    Javascript for websites, optimized for IE versions < Edge

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
    
    
    
    var initializeAnimations = function() {
    
        var scrollAnimation = function(element) {
            if(isInViewport(element)){
    
                element.classList.remove('hidden');
                element.classList.add('animated', element.dataset.animation);
            }
        }
        var scrollMulti = function(element) {
            
            
            var children = [].slice.call(element.querySelectorAll(element.dataset.children));
            children.forEach(function(child, index){
                if(isInViewport(child)){
                    if(!element.dataset.children) { throw('You do not have a child element set, please set a child element using data-children', element);}
                    if(!element.dataset.delay) { throw('You have not set a delay, please set a delay using data-delay',element);}
                    setTimeout(function(){
                        child.classList.add('animated', element.dataset.animation);
                        child.classList.remove('hide');
                    }, element.dataset.delay * index);
                }
            });
            
        }
    
        var header = function(element) {
            var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            
            if(scrollTop === 0){
                element.classList.remove('active');
            }
            if(scrollTop > 300){
                element.classList.add('active');
            }
        }
    
        var animations = [].slice.call(document.querySelectorAll('[data-animate="true"]'));
        console.log(animations);
        document.addEventListener('scroll', function(){
            animations.map(function(element){            
                switch(element.dataset.animationType) {
                    case 'scroll':
                        scrollAnimation(element); 
                        break;
                    case 'scroll-multi':
                        scrollMulti(element);
                        break;
                    case 'header': 
                         header(element);
                         break;
                    default: break;
                }
            });
        });
        
    }
    
    initializeForms();
    initializeMenu();
    initializeFixedBanner();
    initializeAnimations();