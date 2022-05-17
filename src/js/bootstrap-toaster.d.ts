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
/** Defines the valid status options for toasts. */
declare enum TOAST_STATUS {
    SUCCESS = 1,
    DANGER = 2,
    WARNING = 3,
    INFO = 4
}
/** Defines the valid placement options for the toast container. */
declare enum TOAST_PLACEMENT {
    TOP_LEFT = 1,
    TOP_CENTER = 2,
    TOP_RIGHT = 3,
    MIDDLE_LEFT = 4,
    MIDDLE_CENTER = 5,
    MIDDLE_RIGHT = 6,
    BOTTOM_LEFT = 7,
    BOTTOM_CENTER = 8,
    BOTTOM_RIGHT = 9
}
/** Defines the valid options for toast themes. */
declare enum TOAST_THEME {
    LIGHT = 1,
    DARK = 2
}
/** Defines the valid options for toast header timers. */
declare enum TOAST_TIMERS {
    DISABLED = 0,
    ELAPSED = 1,
    COUNTDOWN = 2
}
interface IToastOptions {
    title: string;
    message: string;
    status?: TOAST_STATUS;
    timeout?: number;
}
interface IConfiguration {
    maxToasts?: number;
    placement?: TOAST_PLACEMENT;
    theme?: TOAST_THEME;
    enableTimers?: TOAST_TIMERS;
    enableQueue?: boolean;
}
/**
 * Shorthand function for quickly setting multiple global toast configurations.
 * @param {IConfiguration} options Object containing all the desired toast options.
 */
declare function configure(options: IConfiguration): void;
/**
 * Sets the maximum number of toasts allowed on the page at once.
 * @param {number} maxToasts Maximum number of toasts allowed on the page at once.
 */
declare function setMaxCount(maxToasts: number): void;
/**
 * Sets the toast container's placement.
 * @param {TOAST_PLACEMENT} placement Placement of the toast container.
 */
declare function setPlacement(placement: TOAST_PLACEMENT): void;
/**
 * Sets the toasts' theme to light or dark. If unset, they will follow OS light/dark preference.
 * @param {TOAST_THEME} theme The toast theme.
 */
declare function setTheme(theme?: TOAST_THEME): void;
/**
 * Sets whether timers in the toast header will display elapsed time or a countdown.
 * Timers display elapsed time by default.
 * @param type The timer type.
 */
declare function enableTimers(type: TOAST_TIMERS): void;
/**
 * Enables or disables toasts queueing after the maximum toast count is reached.
 * Queuing is enabled by default.
 * @param {boolean} enabled Controls whether queue is enabled.
 */
declare function enableQueue(enabled?: boolean): void;
/**
 * Endpoint to generate Bootstrap toasts from a template and insert their HTML onto the page,
 * run timers for each's elapsed time since appearing, and remove them from the
 * DOM after they are hidden. Caps toast count at maxToastCount.
 * @param {IToastOptions} toastOptions Object containing all the desired toast options.
 */
declare function create(toastOptions: IToastOptions): void;
/**
 * Sets the status icon and modifies ARIA properties if the context necessitates it
 * @param {HTMLElement} toastEl The HTML of the toast being modified.
 * @param {TOAST_STATUS} status The integer value representing the toast's status.
 */
declare function setStatus(toastEl: HTMLElement, status: TOAST_STATUS): void;
export { TOAST_STATUS, TOAST_PLACEMENT, TOAST_THEME, TOAST_TIMERS, configure, setMaxCount, setPlacement, setStatus, setTheme, enableQueue, enableTimers, create };
//# sourceMappingURL=bootstrap-toaster.d.ts.map