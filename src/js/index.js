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



initializeForms();
initializeMenu();
