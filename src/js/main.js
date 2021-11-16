var m;
var s;
var testing;
let paused = false;
let pom = true;
let started = false;
let count = 0;
let checkboxes = ["leftBox", "midLeftBox", "midRightBox", "rightBox"];
let ding = document.getElementById("ding");

function openLink() {
    window.open("https://francescocirillo.com/pages/pomodoro-technique", "_blank");
}

function initializeTime() {
    m = 25;
    s = "0" + 0;

    document.getElementById('demo').innerHTML = m + ":" + s;
    document.getElementById('buttonText').innerHTML = "Work";
} //end initializeTime

function startTimer() {
    if (started == false) {
        if (pom) {
            document.getElementById('text').innerHTML = "Task time remaining:";
            if (paused == false)
                window.alert("Get to work!");
            else
                paused = false;
        } else {
            document.getElementById('text').innerHTML = "Break time remaining:";
            if (paused == false) {
                if (count < 4)
                    window.alert("Break time!");
                else
                    window.alert("You've earned yourself a nice, long break!");
            } else
                paused = false;
        }
        started = true;
        testing = setInterval(decrementTime, 1000);
    }
} //end startTimer

function printTime() {
    if (m < 0) {
        document.getElementById('demo').innerHTML = "00:00"
    } else if (m < 10) {
        if (s < 10)
            document.getElementById('demo').innerHTML = "0" + m + ":0" + s;
        else
            document.getElementById('demo').innerHTML = "0" + m + ":" + s;
    } else {
        if (s < 10)
            document.getElementById('demo').innerHTML = m + ":0" + s;
        else
            document.getElementById('demo').innerHTML = m + ":" + s;
    }
} //end printTime

function decrementTime() {
    if (m < 0) {
        m = 0;
        s = 0;
        buttonToggle();
    }
    if (s > 0)
        s -= 1;
    else {
        s = 59;
        m -= 1;
    }
    printTime();
} //end decrementTime

function addTime() {
    if (pom == true)
        m = m + 25;
    else
        m = m + 5;
    printTime();
} //end addTime

function removeTime() {
    if (pom == true)
        m = m - 25;
    else
        m = m - 5;
    printTime();
} //end removeTime

function buttonToggle() {
    ding.pause();
    ding.currentTime = 0;
    ding.play();
    if (pom == true) {
        checkBox(count);
        count += 1;
        if (count >= 4) {
            m = 20;
            s = 0;
        } else {
            m = 5;
            s = 0;
        }
        //start break time
        document.getElementById('buttonText').innerHTML = "Break";
        pom = false;
        clearInterval(testing);
        printTime();
        started = false;
        startTimer();
    } else { //start work time
        if (count >= 4) {
            count = 0;
            for (i = 0; i < checkboxes.length; i++)
                checkBox(i, false);
        }
        m = 25;
        s = 0;
        document.getElementById('buttonText').innerHTML = "Work";
        pom = true;
        clearInterval(testing);
        printTime();
        started = false;
        startTimer();
    }
} //end buttonToggle

function pause() {
    if (paused == false && started == true) {
        clearInterval(testing);
        paused = true;
        started = false;
    }
} //end pause

function reset() {
    pom = true;
    started = false;
    paused = false;
    count = 0;
    for (i = 0; i < checkboxes.length; i++)
        checkBox(i, false);
    clearInterval(testing);
    initializeTime();
} //end reset

function checkBox(index, checked = true) {
    if (checked)
        document.getElementById(checkboxes[index]).src = "src/resources/box checked.png";
    else
        document.getElementById(checkboxes[index]).src = "src/resources/box unchecked.png";
} //end checkBox