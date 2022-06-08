/**
 * Copyright (c) 2022 Peyton Gasink
 * Distributed under MIT License.
 *
 * This file contains all the necessary scripting to programmatically
 * generate Bootstrap toasts. It first inserts a container at the bottom
 * of the DOM, then fills a toast template and inserts it into the container.
 *
 * Configuration options are also provided for toast placement, light & dark themes,
 * and the maximum number of toasts allowed on the page at a given time.
 */

/** Container that generated toasts will be inserted into. */
const TOAST_CONTAINER: HTMLDivElement = document.createElement("div");
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
            <small class="timer" aria-hidden="true"></small>
            <button type="button" class="btn-close ms-2" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body"></div>`;

declare global {
  interface Window {
    TOAST_STATUS: typeof TOAST_STATUS;
    TOAST_PLACEMENT: typeof TOAST_PLACEMENT;
    TOAST_THEME: typeof TOAST_THEME;
    TOAST_TIMERS: typeof TOAST_TIMERS;
    Toast: typeof Toast;
  }
}

/** Defines the valid status options for toasts. */
enum TOAST_STATUS {
  SUCCESS = 1,
  DANGER,
  WARNING,
  INFO,
}
(window as any).TOAST_STATUS = TOAST_STATUS;

/** Defines the valid placement options for the toast container. */
enum TOAST_PLACEMENT {
  TOP_LEFT = 1,
  TOP_CENTER,
  TOP_RIGHT,
  MIDDLE_LEFT,
  MIDDLE_CENTER,
  MIDDLE_RIGHT,
  BOTTOM_LEFT,
  BOTTOM_CENTER,
  BOTTOM_RIGHT,
}
(window as any).TOAST_PLACEMENT = TOAST_PLACEMENT;

/** Defines the valid options for toast themes. */
enum TOAST_THEME {
  LIGHT = 1,
  DARK,
}
(window as any).TOAST_THEME = TOAST_THEME;

/** Defines the valid options for toast header timers. */
enum TOAST_TIMERS {
  DISABLED,
  ELAPSED,
  COUNTDOWN,
}
(window as any).TOAST_TIMERS = TOAST_TIMERS;

export interface ToastData {
  toast: HTMLElement;
  timeout: number;
}

export interface ToastOptions {
  title: string;
  message: string;
  status?: TOAST_STATUS;
  timeout?: number;
}

export interface ToastConfigOptions {
  maxToasts?: number;
  placement?: TOAST_PLACEMENT;
  theme?: TOAST_THEME;
  enableTimers?: TOAST_TIMERS;
  enableQueue?: boolean;
}

class Toast {
  /** Maximum amount of toasts to be allowed on the page at once. */
  private static maxToastCount = 4;
  /** Number of toasts currently rendered on the page. */
  private static currentToastCount = 0;
  /** Controls whether toasts will have elapsed or countdown timers. */
  private static timersEnabled: TOAST_TIMERS = TOAST_TIMERS.ELAPSED;
  /** Controls whether to queue toasts that exceed the maximum toast count. */
  private static queueEnabled = true;

  private static queue: ToastData[] = [];

  /**
   * Shorthand function for quickly setting multiple global toast configurations.
   * @param {ToastConfigOptions} options Object containing all the desired toast options.
   */
  public static configure(options: ToastConfigOptions): void {
    this.setMaxCount(options?.maxToasts);
    this.setPlacement(options?.placement);
    this.setTheme(options?.theme);
    this.enableTimers(options?.enableTimers);
    this.enableQueue(options?.enableQueue);
  }

  /**
   * Sets the maximum number of toasts allowed on the page at once.
   * @param {number} maxToasts Maximum number of toasts allowed on the page at once.
   */
  public static setMaxCount(maxToasts: number): void {
    if (maxToasts !== null) {
      if (maxToasts > 0) {
        this.maxToastCount = maxToasts;
      } else {
        console.error(
          "The maximum number of toasts must be greater than 0. Reverting to default."
        );
      }
    }
  }

  /**
   * Sets the toast container's placement.
   * @param {TOAST_PLACEMENT} placement Placement of the toast container.
   */
  public static setPlacement(placement: TOAST_PLACEMENT): void {
    TOAST_CONTAINER.className = "toast-container position-fixed";
    switch (placement) {
      case TOAST_PLACEMENT.TOP_LEFT:
        TOAST_CONTAINER.classList.add("top-0", "start-0");
        break;
      case TOAST_PLACEMENT.TOP_CENTER:
        TOAST_CONTAINER.classList.add(
          "top-0",
          "start-50",
          "translate-middle-x"
        );
        break;
      case TOAST_PLACEMENT.TOP_RIGHT:
        TOAST_CONTAINER.classList.add("top-0", "end-0");
        break;
      case TOAST_PLACEMENT.MIDDLE_LEFT:
        TOAST_CONTAINER.classList.add(
          "top-50",
          "start-0",
          "translate-middle-y"
        );
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
        TOAST_CONTAINER.classList.add(
          "bottom-0",
          "start-50",
          "translate-middle-x"
        );
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
   * @param {TOAST_THEME} theme The toast theme.
   */
  public static setTheme(theme: TOAST_THEME = null): void {
    const header: HTMLElement = TOAST_TEMPLATE.querySelector(".toast-header");
    const close: HTMLElement = header.querySelector(".btn-close");
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
   * Sets whether timers in the toast header will display elapsed time or a countdown.
   * Timers display elapsed time by default.
   * @param type The timer type.
   */
  public static enableTimers(type: TOAST_TIMERS): void {
    this.timersEnabled = type;
  }

  /**
   * Enables or disables toasts queueing after the maximum toast count is reached.
   * Queuing is enabled by default.
   * @param {boolean} enabled Controls whether queue is enabled.
   */
  public static enableQueue(enabled = true): void {
    this.queueEnabled = enabled;
    // Empty the queue once it's disabled.
    if (!enabled) this.queue = [];
  }

  /**
   * Endpoint to generate Bootstrap toasts from a template and insert their HTML onto the page,
   * run timers for each's elapsed time since appearing, and remove them from the
   * DOM after they are hidden. Caps toast count at maxToastCount.
   * @param {ToastOptions} toastOptions Object containing all the desired toast options.
   */
  public static create(toastOptions: ToastOptions): void {
    const toastEl: HTMLElement = <HTMLElement>TOAST_TEMPLATE.cloneNode(true);

    const toastTitle: HTMLElement = toastEl.querySelector(".toast-title");
    toastTitle.innerText = toastOptions.title;

    const toastBody: HTMLElement = toastEl.querySelector(".toast-body");
    toastBody.innerHTML = toastOptions.message;

    this.setStatus(toastEl, toastOptions.status);

    // Add toast to the queue if it would exceed maxToastCount
    if (this.currentToastCount >= this.maxToastCount) {
      if (!this.queueEnabled) return;

      const toastToQueue: ToastData = {
        toast: toastEl,
        timeout: toastOptions.timeout,
      };
      this.queue.push(toastToQueue);
      return;
    }

    const toastInfo: ToastData = {
      toast: toastEl,
      timeout: toastOptions.timeout,
    };

    this.render(toastInfo);
  }

  /**
   * Sets the status icon and modifies ARIA properties if the context necessitates it
   * @param {HTMLElement} toastEl The HTML of the toast being modified.
   * @param {TOAST_STATUS} status The integer value representing the toast's status.
   */
  private static setStatus(toastEl: HTMLElement, status: TOAST_STATUS): void {
    const statusIcon: HTMLElement = toastEl.querySelector(".status-icon");

    switch (status) {
      case TOAST_STATUS.SUCCESS:
        statusIcon.classList.add("text-success", "bi-check-circle-fill");
        break;
      case TOAST_STATUS.DANGER:
        statusIcon.classList.add("text-danger", "bi-x-circle-fill");
        toastEl.setAttribute("role", "alert");
        toastEl.setAttribute("aria-live", "assertive");
        break;
      case TOAST_STATUS.WARNING:
        statusIcon.classList.add("text-warning", "bi-exclamation-circle-fill");
        toastEl.setAttribute("role", "alert");
        toastEl.setAttribute("aria-live", "assertive");
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
   * @param {ToastData} toastInfo The toast object to be rendered.
   */
  private static render(toastInfo: ToastData): void {
    // If the timeout is 0, the toast must be dismissed manually
    if (toastInfo.timeout > 0) {
      toastInfo.toast.setAttribute(
        "data-bs-delay",
        toastInfo.timeout.toString()
      );
      toastInfo.toast.setAttribute("data-bs-autohide", "true");
    }

    this.renderTimer(toastInfo);

    TOAST_CONTAINER.appendChild(toastInfo.toast);
    // Initialize Bootstrap 5's toast plugin
    const bsToast = new bootstrap.Toast(toastInfo.toast);
    bsToast.show();
    this.currentToastCount++;

    // When the toast hides, remove it from the DOM
    toastInfo.toast.addEventListener("hidden.bs.toast", () => {
      TOAST_CONTAINER.removeChild(toastInfo.toast);
      this.currentToastCount--;
      if (
        this.queueEnabled &&
        this.queue.length > 0 &&
        this.currentToastCount < this.maxToastCount
      ) {
        const queuedToast = this.queue.shift();
        this.render(queuedToast);
      }
    });
  }

  /**
   * Handles the rendering of the timer in the toast header.
   * @param toastInfo The toast object to be rendered.
   */
  private static renderTimer(toastInfo: ToastData) {
    const timer: HTMLElement = toastInfo.toast.querySelector(".timer");

    switch (this.timersEnabled) {
      case TOAST_TIMERS.ELAPSED: {
        timer.innerText = "just now";
        // Start a timer that updates the text of the time indicator every minute
        // Initially set to 1 because for the first minute the indicator reads "just now"
        let minutes = 1;
        const elapsedTimer = setInterval(() => {
          timer.innerText = `${minutes}m ago`;
          minutes++;
        }, 60 * 1000);

        // When the toast hides, delete its timer instance
        toastInfo.toast.addEventListener("hidden.bs.toast", () => {
          clearInterval(elapsedTimer);
        });
        break;
      }
      case TOAST_TIMERS.COUNTDOWN: {
        if (toastInfo.timeout > 0) {
          // Start a timer that updates the text of the time indicator every minute
          // Initially set to 1 because for the first minute the indicator reads "just now"
          let seconds = toastInfo.timeout / 1000;
          timer.innerText = `${seconds}s`;
          const countdownTimer = setInterval(() => {
            timer.innerText = `${seconds - 1}s`;
            seconds--;
          }, 1000);

          // When the toast hides, delete its timer instance
          toastInfo.toast.addEventListener("hidden.bs.toast", () => {
            clearInterval(countdownTimer);
          });
        }
        break;
      }
      default: {
        const toastHeader: HTMLElement =
          toastInfo.toast.querySelector(".toast-header");
        toastHeader.removeChild(timer);
        break;
      }
    }
  }
}
(window as any).Toast = Toast;

export { Toast, TOAST_STATUS, TOAST_PLACEMENT, TOAST_THEME, TOAST_TIMERS };
