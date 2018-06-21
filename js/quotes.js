// ----------------------------------PART 1  ---------------------------------------//

//create array with quote segment objects for famous and motivational quotes
var quoteSegments = [
    
    {
        //famous quotes object
        beginning: ["Don't cry ", "Be yourself; ", "Two things are infinite: ", "Be who you are and say what you feel, ", "You only live once, ", "I've learned that people will forget what you said, ", "Insanity is doing the same thing, ", "A woman is like a tea bag; ", "Anyone who thinks ", "Women and cats will do as they please, "],
        middle: ["because it's over, ", "everyone else ", "the universe and human stupidity; ", "because those who mind don't matter, ", "but if you do it right, ", "people will forget what you did, ", "over and over again, ", "you never know how strong it is ", "sitting in church can make you a Christian ", "and men and dogs "],
        end: ["smile because it happened.", "is already taken.", "and I'm not sure about the universe.", "and those who matter don't mind.", "once is enough.","but people will never forget how you made them feel.", "but expecting different results.", "until it's in hot water.", "must also think that sitting in a garage can make you a car.", "should relax and get used to the idea."],
    },
    {
        //motivational quotes object
        beginning: ["If you want", "If you are not willing to risk", "Trust", "All our dreams can come true", "Good things come to people who wait,", "If you do what you always did,", "Success is", "Whenever you see a successful person", "Opportunities", "Try not to become"],
        middle: [" to achieve greatness ", " the usual ", " because you are willing to accept the risk, ", " if we have the courage ", " but better things come to ", " you will get ", " walking from failure to failure ", " you only see the public glories, ", " don’t happen, ", " a person of success, "],
        end: ["stop asking for permission.", "you will have to settle for the ordinary.", "not because it’s safe or certain.", "to pursue them.", "those who go out and get them.", "what you always got.", "with no loss of enthusiasm.", "never the private sacrifices to reach them.", "you create them.", "but rather try to become a person of value."]
    }
];

// define length of array
var arrayLength = quoteSegments[0].beginning.length;

// set quote1 variable to an empty string
var quote1 = "";

// show random quote on page load
window.onload = createRandomQuote();

// listen to randomButton, when clicked ...
document.getElementById("randomButton").addEventListener ("click", function () {
    
    // ... write random quote
    createRandomQuote();   
});

// listen to resetButton1, when clicked ...
document.getElementById("resetButton1").addEventListener("click", function () {

    // ... clear random quote with clear function
    clear(["randomQuoteParagraph"]);
});

function createRandomQuote() {

    /* access first object in array, for each property in object access random index, 
    append onto quote variable */
    for (var property in quoteSegments[0]) {
        quote1 = quote1 + quoteSegments[0][property][Math.floor(Math.random() * arrayLength)];
    }
    
    // print random quote
    var randomQuote = document.createElement("p"); // create <p> element
    randomQuote.textContent = '"' + quote1 + '"'; // define its text content
    document.getElementById("randomQuoteParagraph").appendChild(randomQuote); // insert the new element
    quote1 = ""; // set quote variable back to an empty string
}

// ------------------------ PART 2 ---------------------------------------//

// declare global variables
var quoteType = null; //set quote type to null
var number = null; //set number of quotes to null
var quote = ""; //set quote variable to an empty string
var message = []; // declare empty message array


// Listen to the selected quote type
document.getElementById("quoteType").addEventListener("change", function (e) {
    quoteType = Number(e.target.value); //store value in variable
    console.log("Quote type: " + e.target.value);
});    
    
// Listen to the selected amount of quotes
document.getElementById("number").addEventListener("change", function (e) {
    number = Number(e.target.value) //store value in variable
    console.log("Number of quotes: " + e.target.value);
});    
      
        
//when generate button is clicked ... 
document.getElementById("generateButton").onclick = function () { 

    clear(["customQuoteParagraph", "customMessageParagraph"]); // clear any present quotes before running the code

    /* check that user made choices on both dropdowns, if not, show helper text, 
    else, run create quote function */
   (quoteType === null) ? document.getElementById("typeHelp").textContent = "Please choose one option!" :
   (number === null) ? document.getElementById("numberHelp").textContent = "Please choose one option!" : 
   createQuote();      
}  

// listen to reset button, when clicked, run clearQuote, resetUserInput and resetForm functions
document.getElementById("resetButton").addEventListener("click", function (e) {
    clear(["customQuoteParagraph", "customMessageParagraph"]);
    resetUserInput();
    resetForm();
});


//create quote function
function createQuote() {

    //generate array with custom messages for single/multiple and famous/motivational quotes
    message = [  
    "Here's your custom famous quote:",
    "Here are your " + number + " custom famous quotes:",
    "Here's your custom motivational quote:",
    "Here are your " + number + " custom motivational quotes:"   
    ];

    // write custom message for single/multiple and famous/motivational quotes
    writeMessage();

    //...loop through number of quotes selected
    for (var i = 0; i < number; i++) {
        
        /*access chosen object in array (quote type), 
        for each property in object, access random index, append onto quote variable*/
        for (var property in quoteSegments[quoteType]) {
            quote = quote + quoteSegments[quoteType][property][Math.floor(Math.random() * arrayLength)];
        }

        var customQuote = document.createElement("p"); // Create a <p> element
        customQuote.textContent = '"' + quote + '"'; // Define its text content
        document.getElementById("customQuoteParagraph").appendChild(customQuote); // Insert the new element 
        quote = ""; // empty quote string on each loop so quotes don't append onto one another    
    }
    resetForm(); // reset the form 
    resetUserInput(); // reset user input (does not allow for pressing generate button multiple times)
};


//clear function
function clear (clearIDs) {
    //for each id entered
    for (var i = 0; i < clearIDs.length; i++) {
        //replace its content with an empty string
        document.getElementById(clearIDs[i]).innerHTML = "";
    }  
};

// reset user input function
function resetUserInput () {
    quoteType = null; // set quote type back to null 
    number = null; // set quote number back to null 
}

// reset form function
function resetForm () {
    document.getElementById("form").reset(); // reset form 
    clear(["typeHelp", "numberHelp"]); // empty quote type and number helper text 
};


// write custom message function
function writeMessage () {
    
    var customMessage = document.createElement("p"); // Create a <p> element
    
    //select the right message for each instance with ternary operator and define it as text content for new <p> element
    (quoteType === 0 && number != 1) ? customMessage.textContent = message[1] : (quoteType === 1 && number != 1) ? 
    customMessage.textContent = message[3] : (quoteType === 0 && number === 1) ? 
    customMessage.textContent = message[0] : customMessage.textContent = message[2]; 

    document.getElementById("customMessageParagraph").appendChild(customMessage); // Insert the new element 
};
