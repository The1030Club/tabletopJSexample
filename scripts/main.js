window.onload = function() { init() };

// spreadsheet for the tabletop js
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1nU7WVSIiNGD7OSQpZQMFqTpGiaxlB46kfNrVSM26fuA/pubhtml';

// placeholders for the login btn and error message
var loginBtn = document.getElementById('js-userInputBtn');
var loginErrorMessage = document.getElementById('js-errorLogin');
var logoutBtn = document.getElementById('js-LogoutBtn');
var profileContentWrapper = document.getElementById('js-showHideContent');

// stores all of our spreadsheet data in an array of objects
var userData = [];

// this array is used to collect all the elements we want to eliminate the content from
// in the clearHTML() function
var clearAllContent = [];


// initializing tabletop js
function init() {
    Tabletop.init( { key: public_spreadsheet_url,
        callback: showInfo,
        simpleSheet: true } )
}


// grabs the information from the tabletop spreadsheet and populates the userData array
function showInfo(data, tabletop) {
    for(i = 0; i < data.length; i++){
        userData.push(data[i]);
    }
}


// function that clears all of the HTML on the elements tagged with the js-clearHTML class
function clearHTML(){
    clearAllContent = document.getElementsByClassName('js-clearHTML');
    for ( var i = 0; i < clearAllContent.length; i++){
        clearAllContent[i].innerHTML = ''; // deletes all HTML
        clearAllContent[i].src = '';       // deletes all images
        clearAllContent[i].value = '';        // clears all input fields
    }
}

// fade out function to toggle opacity. This was adapted from Chris Buttery's example
// which you can find here : http://www.chrisbuttery.com/articles/fade-in-fade-out-with-javascript/

function fadeOut(el){
    el.style.opacity = 1;

    (function fade() {
        if ((el.style.opacity -= .01) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
}

// fade in

function fadeIn(el, display){
    el.style.opacity = 0;
    el.style.display = display || "block";

    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .01) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
}


// ghetto login script that checks if the email and house number match their user object
// this is not secure at all it is just for v1
function loginCheck(){
    var USERNAME = document.getElementById( 'js-userInputE' ).value;
    var PASSWORD = document.getElementById( 'js-userInputHN' ).value;

    var loginWrapper = document.getElementById('js-loginWrapper');
    var logoutWrapper = document.getElementById('js-logoutWrapper');


    for (var i = 0; i < userData.length; i++){
        // loop through the user objects in our userData array and check if any of the
        // emails and house numbers match. Sudo password lol
        if((userData[i].email === USERNAME) && (userData[i].house_number === PASSWORD)){
            loginErrorMessage.innerHTML = ''; // clear error message in case of 2 attempt
            displayInfo(userData[i]);         // pass the object into the displayinfo func
            loginWrapper.className = 'user-login-wrapper hidden';
            logoutWrapper.className = 'show';
            fadeIn(profileContentWrapper);
            return;                           // bounce out
        } else {
            clearHTML(); // clears all the content and throws error
            loginErrorMessage.innerHTML = 'that login is wrong bruh';
        }
    }
}


// logout function which essentially just shows and hides content
function logout() {
    var loginWrapper = document.getElementById('js-loginWrapper');
    var logoutWrapper = document.getElementById('js-logoutWrapper');

    fadeOut(profileContentWrapper);
    clearHTML();
    loginWrapper.className = 'user-login-wrapper show';
    logoutWrapper.className = 'user-logout-wrapper hidden';
}

// displays the user's information after a successful authentication
function displayInfo(activeUser) {
    var firstName           = activeUser.first_name;
    var lastName            = activeUser.last_name;
    var streetAddress       = activeUser.street_address;
    var homeWalkthroughDate = activeUser.home_walkthrough_date;
    var homeImg             = activeUser.home_img;
    var recOne              = activeUser.rec_one;
    var recTwo              = activeUser.rec_two;
    var recThree            = activeUser.rec_three;
    var prodOne             = activeUser.prod_one;
    var prodTwo             = activeUser.prod_two;
    var prodThree           = activeUser.prod_three;


    // Users Basic Info Panel
    document.getElementById('js-userName').innerHTML = firstName + ' ' + lastName;
    document.getElementById('js-userSA').innerHTML   = streetAddress;
    document.getElementById('js-userWT').innerHTML   = homeWalkthroughDate;
    document.getElementById('js-homeImg').src        = "img/" + homeImg;

    // Users Recommendation Panel
    document.getElementById('js-userRecOne').innerHTML   = recOne;
    document.getElementById('js-userRecTwo').innerHTML   = recTwo;
    document.getElementById('js-userRecThree').innerHTML = recThree;

    // Users Product Panel
    document.getElementById('js-userProdOne').innerHTML   = prodOne;
    document.getElementById('js-userProdTwo').innerHTML   = prodTwo;
    document.getElementById('js-userProdThree').innerHTML = prodThree;
}

loginBtn.onclick = loginCheck;
logoutBtn.onclick = logout;
