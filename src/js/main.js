var m;
var s;
var testing;
let paused = false;
let pom = true;
let started = false;
let count = 0;

function openLink() {
    window.open("https://francescocirillo.com/pages/pomodoro-technique", "_blank");
}

function initializeTime() {
    m = 25;
    s = "0" + 0;

    document.getElementById('demo').innerHTML = m + ":" + s;
    document.getElementById('buttonText').innerHTML = "Work";
}

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
            if (paused == false)
                window.alert("Break time!");
            else
                paused = false;
        }
        started = true;
        testing = setInterval(decrementTime, 1000);
    }
}

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
}

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
}

function addTime() {
    if (pom == true)
        m = m + 25;
    else
        m = m + 5;
    printTime();
}

function removeTime() {
    if (pom == true)
        m = m - 25;
    else
        m = m - 5;
    printTime();
}

function buttonToggle() {
    if (pom == true) {
        if (count >= 4) {
            m = 15;
            s = 0;
            count = 0;
        } else {
            m = 5;
            s = 0;
        }
        document.getElementById('buttonText').innerHTML = "Break";
        pom = false;
        clearInterval(testing);
        printTime();
        started = false;
        startTimer();
    } else {
        m = 25;
        s = 0;
        count += 1;
        document.getElementById('buttonText').innerHTML = "Work";
        pom = true;
        clearInterval(testing);
        printTime();
        started = false;
        startTimer();
    }
}

function pause() {
    if (paused == false && started == true) {
        clearInterval(testing);
        paused = true;
        started = false;
    }
}

function reset() {
    pom = true;
    started = false;
    paused = false;
    clearInterval(testing);
    initializeTime();
}