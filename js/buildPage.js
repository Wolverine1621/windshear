window.onload = updatePage("KGRR");


function updatePage(aptString) {
    // Build API URLS
    var metarURL = "https://avwx.rest/api/metar/" + aptString
    var tafURL = "https://avwx.rest/api/taf/" + aptString + "?options=info";
    
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
            var blockArray = tafString.split("FM");    
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
        
        document.getElementById('taf').innerHTML = displayString;   
    });
}

// Form Submission Handlers
function buttonPressed() {
    updatePage(document.getElementById("inputfield").value);
}



