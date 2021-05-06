// Getting Started
var timeoutInput = document.getElementById("timeoutInput");
var timeout = 5000;
timeoutInput.onchange = () => {
    // convert seconds to milliseconds
    timeout = timeoutInput.value * 1000;
    if (timeout !== 0)
        Toast.create("Timeout Updated", `Toasts will disappear after ${timeoutInput.value} seconds.`, TOAST_STATUS.SUCCESS, timeout);
    else
        Toast.create("Timeout Updated", `New toasts must be manually dismissed.`, TOAST_STATUS.SUCCESS, timeout);
};

var successBtn = document.getElementById("successBtn");
successBtn.onclick = () => {
    Toast.create("Voila!", "How easy was that?", TOAST_STATUS.SUCCESS, timeout);
};

var dangerBtn = document.getElementById("dangerBtn");
dangerBtn.onclick = () => {
    Toast.create("Oops", "That's no good.", TOAST_STATUS.DANGER, timeout);
};

var warningBtn = document.getElementById("warningBtn");
warningBtn.onclick = () => {
    Toast.create("Heads Up", "You might want to look into that.", TOAST_STATUS.WARNING, timeout);
};

var infoBtn = document.getElementById("infoBtn");
infoBtn.onclick = () => {
    Toast.create("Greetings!", "I am <a href=\"https://www.halopedia.org/2401_Penitent_Tangent\" class=\"link-danger\" target=\"_blank\"" +
        " rel=\"noopener\">2401 Penitent Tangent</a>. I am the Monitor of Installation 05. A Reclaimer? Here? At last! We have much to do." +
        " This facility must be activated if we are to control this outbreak.", TOAST_STATUS.INFO, timeout);
};

// Placement
var placementBtns = document.querySelectorAll(".placement-grid-btn");
placementBtns.forEach(btn => {
    btn.onclick = () => {
        var placement = btn.getAttribute("data-placement");
        Toast.setPlacement(parseInt(placement));
        Toast.create("Placement Updated", `Current placement: ${btn.innerText}`, TOAST_STATUS.SUCCESS, timeout);
    };
});

// Max Count
var maxCountInput = document.getElementById("maxCountInput");
var maxCount = 4;
maxCountInput.onchange = () => {
    maxCount = maxCountInput.value;
    Toast.setMaxCount(maxCount);
    Toast.create("Max Count Updated", `Only ${maxCount} toasts can appear at once.`, TOAST_STATUS.SUCCESS, timeout);
};

// Theming
var themeBtns = document.querySelectorAll(".theme-btn");
themeBtns.forEach(btn => {
    btn.onclick = () => {
        var theme = btn.getAttribute("data-theme");
        Toast.setTheme(parseInt(theme));
        Toast.create("Theme Updated", `Current theme: ${btn.innerText}`, TOAST_STATUS.SUCCESS, timeout);
    };
});

// Timers
var timerBtns = document.querySelectorAll(".timer-btn");
timerBtns.forEach(btn => {
    btn.onclick = () => {
        var useTimers = btn.getAttribute("data-timer");
        Toast.enableTimers(parseInt(useTimers));
        Toast.create(`Timers ${btn.innerText}`, `Timers have been ${btn.innerText.toLowerCase()}.`, TOAST_STATUS.SUCCESS, timeout);
    };
});