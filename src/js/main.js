const initialize = () => {
    init('.navigation-button','.menu');
    $('.play-btn img').on('click', console.log('clicked!'));
}

//initialize the application
document.addEventListener("load", initialize());
