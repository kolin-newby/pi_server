// script.js

const QUIET_CUTOFF = 100;
const BUSY_CUTOFF = 200;

function getStatus (volume) {
    
    var status_class = 'color: black;';
    var status_message = 'No Data';

    // if closed()

    if (volume) {
        if (volume < QUIET_CUTOFF) {
            status_class = 'color: green;';
            status_message = 'Quiet';
        }
        else if (volume > BUSY_CUTOFF) {
            status_class = 'color: red;';
            status_message = 'Busy';
        }
        else {
            status_class = 'color: yellow;';
            status_message = 'Normal';
        }
    }

    console.log("Class: "+status_class)
    console.log("Message: "+status_message)

    return [status_class, status_message];
}