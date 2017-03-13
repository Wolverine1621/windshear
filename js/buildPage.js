window.onload = updateWeather("KGRR");

// METAR/TAF information
function updateWeather(weatherICAO) {
    // Build API URLS
    var metarURL = "https://avwx.rest/api/metar/" + weatherICAO
    var tafURL = "https://avwx.rest/api/taf/" + weatherICAO + "?options=info";
    
    // Metar call
    $.getJSON(metarURL, function(metar) {
        if(!(typeof(metar.Error) === "undefined")) {
            document.getElementById("metar").innerHTML = "METAR not available";
        } else {
            document.getElementById('metar').innerHTML = metar["Raw-Report"] + " " + metar.Remarks;
        }
    });

    // TAF call
    $.getJSON(tafURL, function(taf) {
        var tafString = taf["Raw-Report"];
        
        // If the taf json is === undefined, an error will be thrown - catch unavailable tafs
        try {
            var blockArray = tafString.split("FM"); // KNOWN ISSUE: TEMPO blocks are not accounted for;
        } catch(err) {
            document.getElementById('taf').innerHTML = "TAF not available";
        }
        
        var displayString = "";
        var indentString = "<br>&nbsp;&nbsp;&nbsp;&nbsp;"
        
        displayString += blockArray[0];
        for (var i = 1; i < blockArray.length; i++) {
            displayString = displayString + indentString + "FM" + blockArray[i];
            console.log(i);
        }
        
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
    var tempoIndex = str.indexOf("TEMPO");
    
    var formattedString = str.slice(0, tempoIndex) + "<br>&nbsp;&nbsp;&nbsp;&nbsp;" + str.slice(tempoIndex);
    
    return formattedString;
}



