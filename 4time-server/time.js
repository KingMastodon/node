var Sntp = require('sntp');

 
var options = {
   
    port: 123,                      // Defaults to 123 (NTP) 
    resolveReference: true,         // Default to false (not resolving) 
    timeout: 1000                   // Defaults to zero (no timeout) 
};

Sntp.time(options, function (err, time) {
 
    if (err) {
        console.log('Failed: ' + err.message);
        process.exit(1);
    }
 
    console.log('Local clock is off by: ' + time.t + ' milliseconds');
    process.exit(0);
});