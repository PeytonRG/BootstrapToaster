/**
 * Copyright (c) 2021 Peyton Gasink
 * Distributed under MIT License.
 * 
 * This file contains all the necessary scripting to programmatically
 * generate Bootstrap toasts. It first inserts a container at the bottom
 * of the DOM, then fills a toast template and inserts it into the container.
 * 
 * Configuration options are also provided for toast placement, light & dark themes,
 * and the maximum number of toasts allowed on the page at a given time.
 */

// import { Toast as BootstrapToast } from 'bootstrap';

/** Container that generated toasts will be inserted into. */
const TOAST_CONTAINER: Element = document.createElement("div");
TOAST_CONTAINER.id = "toastContainer";
TOAST_CONTAINER.className = "toast-container position-fixed top-0 end-0";
TOAST_CONTAINER.setAttribute("aria-live", "polite");
document.body.appendChild(TOAST_CONTAINER);

/** HTML markup for the toast template. */
const TOAST_TEMPLATE: HTMLDivElement = document.createElement("div");
TOAST_TEMPLATE.className = "toast";
TOAST_TEMPLATE.setAttribute("role", "status");
TOAST_TEMPLATE.setAttribute("aria-live", "polite");
TOAST_TEMPLATE.setAttribute("aria-atomic", "true");
TOAST_TEMPLATE.setAttribute("data-bs-autohide", "false");
TOAST_TEMPLATE.innerHTML = `
        <div class="toast-header">
            <span class="status-icon bi me-2" aria-hidden="true"></span>
            <strong class="me-auto toast-title"></strong>
            <small class="timer" aria-hidden="true">just now</small>
            <button type="button" class="btn-close ms-2" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body"></div>`;

/** Emulates enum functionality for setting toast statuses without needing to remember actual values. */
enum TOAST_STATUS {
    SUCCESS = 1,
    DANGER,
    WARNING,
    INFO
};
/** Emulates enum functionality for setting toast container placement. */
enum TOAST_PLACEMENT {
    TOP_LEFT = 1,
    TOP_CENTER,
    TOP_RIGHT,
    MIDDLE_LEFT,
    MIDDLE_CENTER,
    MIDDLE_RIGHT,
    BOTTOM_LEFT,
    BOTTOM_CENTER,
    BOTTOM_RIGHT
};
/** Emulates enum functionality for setting toast themes. */
enum TOAST_THEME {
    LIGHT = 1,
    DARK
};

/** Maximum amount of toasts to be allowed on the page at once. */
var maxToastCount: number = 4;
/** Number of toasts currently rendered on the page. */
var currentToastCount: number = 0;
/** Controls whether elapsed time will be displayed in the toast header. */
var enableTimers: boolean = true;

class Toast {

    /**
     * Shorthand function for quickly setting multiple global toast configurations.
     * @param {number} maxToasts The maximum number of toasts allowed on the page at once.
     * @param {number} placement The toast container's placement on-screen, defaults to top right. This will not affect small screens in portrait.
     * @param {number} theme The toasts' theme, either light or dark. If unset, they will follow OS light/dark preference.
     * @param {boolean} enableTimers Controls whether elapsed time will be displayed in the toast header.
     */
    public static configure(maxToasts: number = null, placement: number = TOAST_PLACEMENT.TOP_RIGHT, theme: number = null, enableTimers: boolean = true): void {
        Toast.setMaxCount(maxToasts);

        Toast.setPlacement(placement);

        Toast.setTheme(theme);

        Toast.enableTimers(enableTimers);
    }

    /**
     * Sets the maximum number of toasts allowed on the page at once.
     * @param {number} maxToasts Maximum number of toasts allowed on the page at once.
     */
    public static setMaxCount(maxToasts: number): void {
        if (maxToasts !== null) {
            if (maxToasts > 0) {
                maxToastCount = maxToasts;
            }
            else {
                console.error("The maximum number of toasts must be greater than 0. Reverting to default.");
            }
        }
    }

    /**
     * Sets the toast container's placement.
     * @param {number} placement Placement of the toast container.
     */
    public static setPlacement(placement: number): void {
        TOAST_CONTAINER.className = "toast-container position-fixed";
        switch (placement) {
            case TOAST_PLACEMENT.TOP_LEFT:
                TOAST_CONTAINER.classList.add("top-0", "start-0");
                break;
            case TOAST_PLACEMENT.TOP_CENTER:
                TOAST_CONTAINER.classList.add("top-0", "start-50", "translate-middle-x");
                break;
            case TOAST_PLACEMENT.TOP_RIGHT:
                TOAST_CONTAINER.classList.add("top-0", "end-0");
                break;
            case TOAST_PLACEMENT.MIDDLE_LEFT:
                TOAST_CONTAINER.classList.add("top-50", "start-0", "translate-middle-y");
                break;
            case TOAST_PLACEMENT.MIDDLE_CENTER:
                TOAST_CONTAINER.classList.add("top-50", "start-50", "translate-middle");
                break;
            case TOAST_PLACEMENT.MIDDLE_RIGHT:
                TOAST_CONTAINER.classList.add("top-50", "end-0", "translate-middle-y");
                break;
            case TOAST_PLACEMENT.BOTTOM_LEFT:
                TOAST_CONTAINER.classList.add("bottom-0", "start-0");
                break;
            case TOAST_PLACEMENT.BOTTOM_CENTER:
                TOAST_CONTAINER.classList.add("bottom-0", "start-50", "translate-middle-x");
                break;
            case TOAST_PLACEMENT.BOTTOM_RIGHT:
                TOAST_CONTAINER.classList.add("bottom-0", "end-0");
                break;
            default:
                TOAST_CONTAINER.classList.add("top-0", "end-0");
                break;
        }
    }

    /**
     * Sets the toasts' theme to light or dark. If unset, they will follow OS light/dark preference.
     * @param {number} theme The toast theme. Options are TOAST_THEME.LIGHT and TOAST_THEME.DARK.
     */
    public static setTheme(theme: number = null): void {
        let header: any = TOAST_TEMPLATE.querySelector(".toast-header");
        let close: any = header.querySelector(".btn-close");
        switch (theme) {
            case TOAST_THEME.LIGHT:
                TOAST_TEMPLATE.style.backgroundColor = "var(--body-bg-color-light)";
                TOAST_TEMPLATE.style.color = "var(--text-color-light)";
                header.style.backgroundColor = "var(--header-bg-color-light)";
                header.style.color = "var(--header-color-light)";
                close.style.filter = "unset";
                break;
            case TOAST_THEME.DARK:
                TOAST_TEMPLATE.style.backgroundColor = "var(--body-bg-color-dark)";
                TOAST_TEMPLATE.style.color = "var(--text-color-dark)";
                header.style.backgroundColor = "var(--header-bg-color-dark)";
                header.style.color = "var(--header-color-dark)";
                close.style.filter = "invert(1) grayscale(100%) brightness(200%)";
                break;
            default:
                TOAST_TEMPLATE.removeAttribute("style");
                header.removeAttribute("style");
                close.removeAttribute("style");
                break;
        }
    }

    /**
     * Enables or disables toasts displaying elapsed time since appearing in the header.
     * Timers are enabled by default.
     * @param {boolean} enabled Controls whether elapsed time will be displayed in the toast header.
     */
    public static enableTimers(enabled: boolean = true): void {
        enableTimers = enabled;
    }

    /**
     * Endpoint to generate Bootstrap toasts from a template and insert their HTML onto the page,
     * run timers for each's elapsed time since appearing, and remove them from the
     * DOM after they are hidden. Caps toast count at maxToastCount.
     * @param {string} title The text of the toast's header.
     * @param {string} message The text of the toast's body.
     * @param {number} status The status/urgency of the toast. Affects status icon and ARIA accessibility features. Defaults to 0, which renders no icon.
     * @param {number} timeout Time in ms until toast disappears automatically. Defaults to 0, which is indefinite.
     */
    public static create(title: string, message: string, status: number = 0, timeout: number = 0): void {
        if (currentToastCount >= maxToastCount)
            return;

        let toast: any = TOAST_TEMPLATE.cloneNode(true);

        let toastTitle = toast.querySelector(".toast-title");
        toastTitle.innerText = title;

        let toastBody = toast.querySelector(".toast-body");
        toastBody.innerHTML = message;

        Toast.setStatus(toast, status);

        Toast.render(toast, timeout);
    }

    /**
     * Sets the status icon and modifies ARIA properties if the context necessitates it
     * @param {Node} toast The HTML of the toast being modified.
     * @param {number} status The integer value representing the toast's status.
     */
    private static setStatus(toast: any, status: number): void {
        let statusIcon = toast.querySelector(".status-icon");

        switch (status) {
            case TOAST_STATUS.SUCCESS:
                statusIcon.classList.add("text-success", "bi-check-circle-fill");
                break;
            case TOAST_STATUS.DANGER:
                statusIcon.classList.add("text-danger", "bi-x-circle-fill");
                toast.setAttribute("role", "alert");
                toast.setAttribute("aria-live", "assertive");
                break;
            case TOAST_STATUS.WARNING:
                statusIcon.classList.add("text-warning", "bi-exclamation-circle-fill");
                toast.setAttribute("role", "alert");
                toast.setAttribute("aria-live", "assertive");
                break;
            case TOAST_STATUS.INFO:
                statusIcon.classList.add("text-info", "bi-info-circle-fill");
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
    private static render(toast: any, timeout: number): void {
        if (timeout > 0) {
            toast.setAttribute("data-bs-delay", timeout);
            toast.setAttribute("data-bs-autohide", true);
        }

        let timer = toast.querySelector(".timer");

        if (enableTimers) {
            // Start a timer that updates the text of the time indicator every minute
            // Initially set to 1 because for the first minute the indicator reads "just now"
            let minutes = 1
            let elapsedTimer = setInterval(() => {
                timer.innerText = `${minutes}m ago`;
                minutes++;
            }, 60 * 1000);

            // When the toast hides, delete its timer instance
            toast.addEventListener('hidden.bs.toast', () => {
                clearInterval(elapsedTimer);
            });
        }
        else {
            let toastHeader = toast.querySelector(".toast-header");
            toastHeader.removeChild(timer);
        }

        TOAST_CONTAINER.appendChild(toast);
        // Initialize Bootstrap 5's toast plugin
        var bsToast = new bootstrap.Toast(toast);
        bsToast.show();
        currentToastCount++;

        // When the toast hides, remove it from the DOM
        toast.addEventListener('hidden.bs.toast', () => {
            TOAST_CONTAINER.removeChild(toast);
            currentToastCount--;
        });
    }
}
