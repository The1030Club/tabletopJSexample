console.log('banana');

window.onload = function() { init() };

var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1eIhUlNg5-Vl3xGmH23CabHPjibCVIKG47kzHyUeEeCc/pubhtml';

function init() {
    Tabletop.init( { key: public_spreadsheet_url,
        callback: showInfo,
        simpleSheet: true } )
}

function showInfo(data, tabletop) {
    var userData = data;

    var firstName = userData[0].fName;
    var lastName = userData[0].lName;
    var houseAddress = userData[0].hAddress;

    document.getElementById(' js-userFirstName').innerHTML = firstName;
    document.getElementById(' js-userLastName').innerHTML = lastName;
    document.getElementById(' js-userAddress').innerHTML = houseAddress;
}
