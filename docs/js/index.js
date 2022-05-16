// import * as BootstrapToaster from "../../bootstrap-toaster/dist/packages/bootstrap-toaster/bootstrap-toaster.esm.js";

// Getting Started
var timeoutInput = document.getElementById("timeoutInput");
var timeout = 5000;
timeoutInput.onchange = () => {
    // convert seconds to milliseconds
    timeout = timeoutInput.value * 1000;
    let toast = {
        title: "Timeout Updated",
        status: BootstrapToaster.TOAST_STATUS.SUCCESS,
        timeout: timeout
    }
    if (timeout !== 0)
        toast.message = `Toasts will disappear after ${timeoutInput.value} seconds.`;
    else
        toast.message = "New toasts must be manually dismissed.";

    BootstrapToaster.create(toast);
};

var successBtn = document.getElementById("successBtn");
successBtn.onclick = () => {
    let toast = {
        title: "Voila!",
        message: "How easy was that?",
        status: BootstrapToaster.TOAST_STATUS.SUCCESS,
        timeout: timeout
    }
    BootstrapToaster.create(toast);
};

var dangerBtn = document.getElementById("dangerBtn");
dangerBtn.onclick = () => {
    let toast = {
        title: "Oops",
        message: "That's no good.",
        status: BootstrapToaster.TOAST_STATUS.DANGER,
        timeout: timeout
    }
    BootstrapToaster.create(toast);
};

var warningBtn = document.getElementById("warningBtn");
warningBtn.onclick = () => {
    let toast = {
        title: "Heads Up",
        message: "You might want to look into that.",
        status: BootstrapToaster.TOAST_STATUS.WARNING,
        timeout: timeout
    }
    BootstrapToaster.create(toast);
};

var infoBtn = document.getElementById("infoBtn");
infoBtn.onclick = () => {
    let toast = {
        title: "Greetings!",
        message: "I am <a href=\"https://www.halopedia.org/2401_Penitent_Tangent\" class=\"link-danger\" target=\"_blank\"" +
            " rel=\"noopener\">2401 Penitent Tangent</a>. I am the Monitor of Installation 05. A Reclaimer? Here? At last! We have much to do." +
            " This facility must be activated if we are to control this outbreak.",
        status: BootstrapToaster.TOAST_STATUS.INFO,
        timeout: timeout
    }
    BootstrapToaster.create(toast);
};

// Placement
var placementBtns = document.querySelectorAll(".placement-grid-btn");
placementBtns.forEach(btn => {
    btn.onclick = () => {
        var placement = parseInt(btn.getAttribute("data-placement"));
        BootstrapToaster.setPlacement(placement);
        let toast = {
            title: "Placement Updated",
            message: `Current placement: ${btn.innerText}`,
            status: BootstrapToaster.TOAST_STATUS.SUCCESS,
            timeout: timeout
        }
        BootstrapToaster.create(toast);
    };
});

// Max Count
var maxCountInput = document.getElementById("maxCountInput");
var maxCount = 4;
maxCountInput.onchange = () => {
    maxCount = maxCountInput.value;
    BootstrapToaster.setMaxCount(maxCount);
    let toast = {
        title: "Max Count Updated",
        message: `Only ${maxCount} toasts can appear at once.`,
        status: BootstrapToaster.TOAST_STATUS.SUCCESS,
        timeout: timeout
    }
    BootstrapToaster.create(toast);
};

// Theming
var themeBtns = document.querySelectorAll(".theme-btn");
themeBtns.forEach(btn => {
    btn.onclick = () => {
        var theme = parseInt(btn.getAttribute("data-theme"));
        BootstrapToaster.setTheme(theme);
        let toast = {
            title: "Theme Updated",
            message: `Current theme: ${btn.innerText}`,
            status: BootstrapToaster.TOAST_STATUS.SUCCESS,
            timeout: timeout
        }
        BootstrapToaster.create(toast);
    };
});

// Queue
var queueBtns = document.querySelectorAll(".queue-btn");
queueBtns.forEach(btn => {
    btn.onclick = () => {
        var enableQueue = parseInt(btn.getAttribute("data-queue"));
        BootstrapToaster.enableQueue(enableQueue);
        let toast = {
            title: "Queue Setting Updated",
            message: `The toast queue has been ${enableQueue ? "enabled" : "disabled"}.`,
            status: BootstrapToaster.TOAST_STATUS.SUCCESS,
            timeout: timeout
        }
        BootstrapToaster.create(toast);
    };
});

// Timers
var timerBtns = document.querySelectorAll(".timer-btn");
timerBtns.forEach(btn => {
    btn.onclick = () => {
        var useTimers = parseInt(btn.getAttribute("data-timer"));
        BootstrapToaster.enableTimers(useTimers);
        let toast = {
            title: "Timer Setting Updated",
            message: `New toasts will have ${btn.innerText.toLowerCase()} timers.`,
            status: BootstrapToaster.TOAST_STATUS.SUCCESS,
            timeout: timeout
        }
        BootstrapToaster.create(toast);
    };
});