window.onload = updateWeather("KGRR");

// METAR/TAF information
function updateWeather(weatherICAO) {
    // Build API URLS
    weatherICAO = weatherICAO.toUpperCase();
    var metarURL = "https://windshear-api.herokuapp.com/api/v1/metar?icao=" + weatherICAO;
    var tafURL = "https://windshear-api.herokuapp.com/api/v1/taf?icao=" + weatherICAO + "&options=info";
    
    // Metar call
    $.getJSON(metarURL, function(metar) {
        if(!(typeof(metar.Error) === "undefined")) {
            document.getElementById("metar").innerHTML = "METAR not available";
        } else {
            document.getElementById('metar').innerHTML = metar["sanitized"];
        }
    });

    // TAF call
    $.getJSON(tafURL, function(taf) {
        var tafString = taf["sanitized"];
        
        // If the taf json is === undefined, an error will be thrown - catch unavailable tafs
        try {
            var blockArray = tafString.split("FM"); // KNOWN ISSUE: TEMPO blocks are not accounted for;
        } catch(err) {
            document.getElementById('taf').innerHTML = "TAF not available";
        }
        
        // Move to helper method 
        var displayString = "";
        var indentString = "<br>&nbsp;&nbsp;&nbsp;&nbsp;"
        
        displayString += blockArray[0];
        for (var i = 1; i < blockArray.length; i++) {
            displayString = displayString + indentString + "FM" + blockArray[i];
        }
        // Move to helper method
        
        // TEMPO formatting
        displayString = formatTempos(displayString);
        
        document.getElementById('taf').innerHTML = displayString;   
    });
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




