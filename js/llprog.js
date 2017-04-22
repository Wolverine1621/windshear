// Run onload from clock.js

// Page Updater Functions
function buildLLProgs() {
        
    // Based on 24 hour valid time
    var vt00z = "https://aviationweather.gov/data/products/swl/ll_00_4_cl_new.gif";
    var vt06z = "https://aviationweather.gov/data/products/swl/ll_06_4_cl_new.gif";
    var vt12z = "https://aviationweather.gov/data/products/swl/ll_12_4_cl_new.gif";
    var vt18z = "https://aviationweather.gov/data/products/swl/ll_18_4_cl_new.gif";
    
    // UTC Time
    var today = new Date();
    var currentHour = today.getUTCHours(); // 0-23 Z
    
    // Accounts for delay in release times
    if (currentHour >= 5 && currentHour < 9) { // VT00Z
        updateImages(vt00z, vt18z);
    } else if (currentHour >= 9 && currentHour < 17) { // VT06Z
        updateImages(vt06z, vt00z);
    } else if (currentHour >= 17 && currentHour < 22) { // VT12Z
        updateImages(vt12z, vt06z);
    } else if (currentHour >= 22 || currentHour < 5) { // VT18Z - or logic necessary to account for reset to 0 hours
        updateImages(vt18z, vt12z);
    }
}

function updateImages(firstllprog, secondllprog) {
    document.getElementById("firstllprog").src = firstllprog;
    document.getElementById("secondllprog").src = secondllprog;
}

