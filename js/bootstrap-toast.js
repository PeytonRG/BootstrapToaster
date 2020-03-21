
/** Container that generated toasts will be inserted into. */
const toastContainer = document.createElement("div");
toastContainer.id = "toastContainer";
toastContainer.className = "position-fixed";
toastContainer.setAttribute("aria-live", "polite");
toastContainer.setAttribute("aria-atomic", "true");
document.body.appendChild(toastContainer);

/** HTML markup for the template toast that is hidden in the page. */
const template = document.createElement("div");
template.className = "toast";
template.setAttribute("role", "status");
template.setAttribute("aria-live", "polite");
template.setAttribute("aria-atomic", "true");
template.setAttribute("data-autohide", "false");
template.innerHTML = `
        <div class="toast-header">
            <span class="status-icon fas mr-2" aria-hidden="true"></span>
            <strong class="mr-auto toast-title"></strong>
            <small class="timer">just now</small>
            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="toast-body"></div>
    `;

/** Maximum amount of toasts to be allowed on the page at once. */
const maxToastCount = 4;
/** Number of toasts currently rendered on the page. */
var currentToastCount = 0;
/** Emulates enum functionality for setting toast statuses without needing to remember actual values. */
const TOAST_STATUS = {
    SUCCESS: 1,
    DANGER: 2,
    WARNING: 3,
    INFO: 4
}

// toastGenerator("Your thing worked!", "The only one people will see on my pages.", TOAST_STATUS.SUCCESS);

// toastGenerator("Warning", "You might want to look into that.", TOAST_STATUS.WARNING);

// toastGenerator("Something went wrong", "Definitely user error. Works on my machine.", TOAST_STATUS.DANGER);

// toastGenerator("Accessible as heck", "They use separate ARIA roles and statuses depending on the context, "
//     + "and are wrapped in a region that announces toasts as atomic units for screen readers.", TOAST_STATUS.INFO);

/**
 * Generates Bootstrap toasts from a template and inserts their HTML onto the page,
 * runs timers for each's elapsed time since rendering, and deletes them from the
 * DOM after they are hidden. Caps toast count at maxToastCount.
 * @param {string} title The text of the toast's header.
 * @param {string} message The text of the toast's body.
 * @param {number} status The status/urgency of the toast. Affects status icon and ARIA accessibility features. Defaults to 0, which renders no icon.
 * @param {number} timeout Time in ms until toast disappears automatically. Defaults to 0, which is indefinite.
 */
function toastGenerator(title, message, status = 0, timeout = 0) {
    if (currentToastCount >= maxToastCount)
        return;

    let toast = template.cloneNode(deep = true);

    let toastTitle = toast.querySelector(".toast-title");
    toastTitle.innerText = title;

    let toastBody = toast.querySelector(".toast-body");
    toastBody.innerText = message;

    _setStatus(toast, status);

    _renderToast(toast, timeout);
}

/**
 * Sets the status icon and modifies ARIA properties if the context necessitates it
 * @param {Node} toast The HTML of the toast being modified.
 * @param {number} status The integer value representing the toast's status.
 */
function _setStatus(toast, status) {
    let statusIcon = toast.querySelector(".status-icon");

    switch (status) {
        case TOAST_STATUS.SUCCESS:
            statusIcon.classList.add("text-success", "fa-check-circle");
            break;
        case TOAST_STATUS.DANGER:
            statusIcon.classList.add("text-danger", "fa-times-circle");
            toast.setAttribute("role", "alert");
            toast.setAttribute("aria-live", "assertive");
            break;
        case TOAST_STATUS.WARNING:
            statusIcon.classList.add("text-warning", "fa-exclamation-circle");
            toast.setAttribute("role", "alert");
            toast.setAttribute("aria-live", "assertive");
            break;
        case TOAST_STATUS.INFO:
            statusIcon.classList.add("text-info", "fa-info-circle");
            break;
        default:
            statusIcon.classList.add("d-none");
            break;
    }
}

/**
 * Inserts toast HTML onto page and sets up for toast deletion.
 * @param {Node} toast The HTML of the toast being modified.
 * @param {number} timeout Time in ms until toast disappears automatically. Indefinite if zero.
 */
function _renderToast(toast, timeout) {
    if (timeout > 0) {
        toast.setAttribute("data-delay", timeout);
        toast.setAttribute("data-autohide", true);
    }
    toastContainer.appendChild(toast);
    $(toast).toast('show');
    currentToastCount++;

    // Start a timer that updates the text of the time indicator every minute
    // Initially set to 1 because for the first minute the indicator reads "just now"
    let minutes = 1
    let timer = setInterval(function () {
        let timerText = toast.querySelector(".timer");
        timerText.innerText = `${minutes}m ago`;
        minutes++;
    }, 60 * 1000);

    // When the toast hides, delete its timer instance and remove it from the DOM
    $(toast).on('hidden.bs.toast', function () {
        clearInterval(timer);
        toastContainer.removeChild(toast);
        currentToastCount--;
    });
}