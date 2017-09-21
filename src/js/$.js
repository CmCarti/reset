const $ = (element) => {   
    // Function to throw errors when needed
    const throwError = (err) => { throw err; }
    // Get the element with querySelector
    this.e = document.querySelector(element);
    // Check to make sure the element exists
    let ERROR = this.e === null ? `Error: element ${element} does not exist` : undefined;
    // Return the element
    this.get = () => this.e;
    this.getAll = () => Array.from(document.querySelectorAll(element));
    // Add an event listener with a function
    this.on = (type, fn) => {
        // If the element does not exist, throw an error
        ERROR === undefined ? this.e.addEventListener(type, fn) : throwError(ERROR);        
        return this;
    }
   return this;
}

// Example of a chain of events
// $('.navigation-button')
//     .on('mouseover', function() {
//     this.style.background = "black";
// })
//     .on('mouseleave', function(){
//     this.style.background = "transparent";
// })