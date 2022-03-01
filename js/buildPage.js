window.onload = updateWeather("KGRR");

// METAR/TAF information
function updateWeather(weatherICAO) {
    // Build API URLS
    weatherICAO = weatherICAO.toUpperCase();
    var api_stub = "https://windshear-api.herokuapp.com/api/v1/";
    var metarURL = api_stub + "metar?icao=" + weatherICAO;
    var tafURL = api_stub + "taf?icao=" + weatherICAO + "&options=info";

    var spinner = "<div class=\"spinner-border text-primary\" role=\"status\"><span class=\"visually-hidden\">Loading...</span></div>"

    document.getElementById("metar").innerHTML = spinner;
    document.getElementById("taf").innerHTML = spinner;
    
    fetch(metarURL)
        .then(response => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then(data => {
            document.getElementById("metar").innerHTML = data["sanitized"];
        })
        .catch(error => {
            document.getElementById("metar").innerHTML = "METAR not available";
        })

    // TAF call
    fetch(tafURL)
        .then(response => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then(data => {
            var tafString = data["sanitized"];
            var blockArray = tafString.split("FM");
            var displayString = formatTaf(blockArray)

            document.getElementById("taf").innerHTML = displayString;
        })
        .catch(error => {
            document.getElementById("taf").innerHTML = "TAF not available";
        })
}

// Airport info search
function airportInfoSearch(infoICAO) {
    var aopaURL = "https://www.aopa.org/airports/" + infoICAO;
    
    var win = window.open(aopaURL, "_blank");
    win.focus();
}

// Form Submission Handlers
function weatherButtonPressed() {
    updateWeather(document.getElementById("weatherinputfield").value);
}

function airportSearchButtonPressed() {
    airportInfoSearch(document.getElementById("airportinputfield").value);
}

function formatTaf(blockArray) {
    var indentString = "<br>&nbsp;&nbsp;&nbsp;&nbsp;"
    var displayString = "";
        
    displayString += blockArray[0];
    for (var i = 1; i < blockArray.length; i++) {
        displayString = displayString + indentString + "FM" + blockArray[i];
    }
    
    // TEMPO formatting
    displayString = formatTempos(displayString);
    return displayString;
}

// Helper Methods
function formatTempos(str) { // Iterates over the string, finds and indents TEMPO blocks
    var indentString = "<br>&nbsp;&nbsp;&nbsp;&nbsp;"
    
    var hasTempo = true;
    var startIndex = 0; // Index for indexOf to begin looking at the string
    
    while(hasTempo) {
        var tempoIndex = str.indexOf("TEMPO", startIndex); // Should skip over the previous TEMPO
        if (tempoIndex != -1) {
            str = str.slice(0, tempoIndex) + indentString + str.slice(tempoIndex);
            startIndex = tempoIndex + 5 + indentString.length; // Moves the indexOf starting index up the length of the indent string + "TEMPO"
        } else {
            hasTempo = false;
        }
    }
    return str;
}




