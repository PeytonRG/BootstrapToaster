// Getting Started
var successBtn = document.getElementById("successBtn");
successBtn.onclick = function () {
    Toast.create("Voila!", "How easy was that?", TOAST_STATUS.SUCCESS, 5000);
};

var dangerBtn = document.getElementById("dangerBtn");
dangerBtn.onclick = function () {
    Toast.create("Oops", "That's no good.", TOAST_STATUS.DANGER, 5000);
};

var warningBtn = document.getElementById("warningBtn");
warningBtn.onclick = function () {
    Toast.create("Heads Up", "You might want to look into that.", TOAST_STATUS.WARNING, 5000);
};

var infoBtn = document.getElementById("infoBtn");
infoBtn.onclick = function () {
    Toast.create("Greetings!", "I am 2401 Penitent Tangent. I am the Monitor of Installation 05. A Reclaimer? Here? At last! We have much to do. This facility must be activated if we are to control this outbreak.", TOAST_STATUS.INFO, 5000);
};

// Placement
var placementBtns = document.querySelectorAll(".placement-grid-btn");
placementBtns.forEach(function (btn) {
    btn.onclick = function () {
        var placement = btn.getAttribute("data-placement");
        Toast.setPlacement(parseInt(placement));
        Toast.create("Placement Updated", `Current placement: ${btn.innerText}`, TOAST_STATUS.SUCCESS, 5000);
    };
});

// Theming
var themeBtns = document.querySelectorAll(".theme-btn");
themeBtns.forEach(function (btn) {
    btn.onclick = function () {
        var theme = btn.getAttribute("data-theme");
        Toast.setTheme(parseInt(theme));
        Toast.create("Theme Updated", `Current theme: ${btn.innerText}`, TOAST_STATUS.SUCCESS, 5000);
    };
});

// Timers
var timerBtns = document.querySelectorAll(".timer-btn");
timerBtns.forEach(function (btn) {
    btn.onclick = function () {
        var useTimers = btn.getAttribute("data-timer");
        Toast.enableTimers(parseInt(useTimers));
        Toast.create(`Timers ${btn.innerText}`, `Timers have been ${btn.innerText.toLowerCase()}.`, TOAST_STATUS.SUCCESS, 5000);
    };
});