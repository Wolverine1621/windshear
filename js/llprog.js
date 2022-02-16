// Run onload from clock.js

// Page Updater Functions
function buildLLProgs() {
    var today = new Date();
    var currentHour = today.getUTCHours();
    var currentYear = today.getUTCFullYear();

    var currentMonth = today.getUTCMonth();
    currentMonth = currentMonth + 1 // 0 indexing
    if (currentMonth < 10) {
        currentMonth = "0" + currentMonth
    }

    var currentDay = today.getUTCDate();
        
    // Based on 24 hour valid time
    var url_stub = "https://aviationweather.gov/data/products/swl/" + currentYear + currentMonth + currentDay + "/" + currentYear + currentMonth + currentDay + "_"
    // var vt00z = "https://aviationweather.gov/data/products/swl/ll_00_4_cl_new.gif";
    // var vt06z = "https://aviationweather.gov/data/products/swl/ll_06_4_cl_new.gif";
    // var vt12z = "https://aviationweather.gov/data/products/swl/ll_12_4_cl_new.gif";
    // var vt18z = "https://aviationweather.gov/data/products/swl/ll_18_4_cl_new.gif";
    
    var vt00z = url_stub + "00_sigwx_lo_us.gif"
    var vt06z = url_stub + "06_sigwx_lo_us.gif"
    var vt12z = url_stub + "12_sigwx_lo_us.gif"
    var vt18z = url_stub + "18_sigwx_lo_us.gif"
    
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

