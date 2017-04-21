var h, m, s;
var timeString;

window.onload = init;

function init() {
    startTime();
    buildLLProgs(); // From llprog.js
}

function startTime() {
    var today = new Date ();
    
    getUTCTime(today);
    
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s)
    
    timeString = "" + h + ":" + m + ":" + s + " UTC";
    
    document.getElementById("time").innerHTML = timeString;
    
    setTimeout(startTime, 500);
}

function getUTCTime(today) {
    h = today.getUTCHours();
    m = today.getUTCMinutes();
    s = today.getUTCSeconds();
}

function checkTime(i) {
  if (i < 10) {
      i = "0" + i;
  } // add zero in front of numbers < 10

  return i;
}
