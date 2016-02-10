window.onload = function() { init() };

var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1eIhUlNg5-Vl3xGmH23CabHPjibCVIKG47kzHyUeEeCc/pubhtml?gid=0&single=true';
var userData = [];

function init() {
    Tabletop.init( { key: public_spreadsheet_url,
        callback: showInfo,
        simpleSheet: true } )
}

function showInfo(data, tabletop) {
    for(i = 0; i < data.length; i++){
        userData.push(data[i]);
    }
}

function displayInfo() {
    var firstName =           userData[0].last_name;
    var lastName =            userData[0].first_name;
    var houseAddress =        userData[0].home_address;
    var userId =              userData[0].user_id;
    var homeWalkthroughDate = userData[0].home_walkthrough_date;
    var homeImg =             userData[0].home_img;
    var homeSqFt =            userData[0].home_sq_feet;
    var homeAge =             userData[0].home_age;
    var utilitySuppliers =    userData[0].utility_suppliers;

    document.getElementById('js-userFirstName').innerHTML       = firstName;
    document.getElementById('js-userLastName').innerHTML        = lastName;
    document.getElementById('js-userAddress').innerHTML         = houseAddress;
    document.getElementById('js-homeWalkthroughDate').innerHTML = homeWalkthroughDate;
    document.getElementById('js-homeImg').src                   = "img/" + homeImg;
    document.getElementById('js-homeSqFt').innerHTML            = homeSqFt;
    document.getElementById('js-homeAge').innerHTML             = homeAge;
    document.getElementById('js-utilitySuppliers').innerHTML    = utilitySuppliers;
}
