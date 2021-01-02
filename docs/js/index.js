// Getting Started
var gettingStartedBtn = document.getElementById("gettingStartedBtn");
gettingStartedBtn.onclick = function () {
    Toast.create("Voila!", "How easy was that?", TOAST_STATUS.SUCCESS, 5000);
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