# Bootstrap Toaster
Robust, plug &amp; play generator for Bootstrap toasts.

[![jsDelivr Download Stats](https://data.jsdelivr.com/v1/package/npm/bootstrap-toast.js/badge?style=rounded)](https://www.jsdelivr.com/package/npm/bootstrap-toast.js)
[![CodeFactor](https://www.codefactor.io/repository/github/peytonrg/bootstraptoaster/badge)](https://www.codefactor.io/repository/github/peytonrg/bootstraptoaster)
![deployment](https://github.com/PeytonRG/BootstrapToaster/workflows/deployment/badge.svg)

## Bootstrap 5 Support
Version 5.0.0-rc4 includes full support for Bootstrap 5 Beta 1. Once Bootstrap 5 is officially released, 5.0.0 will be released as well!

## Contents
* [Theming](#theming-heads-up-lights-out)
* [Placement](#placement-serving-up-toast-coast-to-coast)
* [Timers](#timers-too-much-time-on-my-hands)
* [Maximum Toast Count](#maximum-toast-count-complexity-reducers-vs-information-producers)
* [Accessibility](#accessibility-built-in-out-of-the-box)
* [Getting Started](#getting-started)
  * [Dependencies](#dependencies)
* [Usage](#usage)
  * [Minimal Required Setup](#minimal-required-setup)
  * [Toast Status Options](#toast-status-options)
  * [Global Toast Options](#global-toast-options)
    * [Light/Dark Theme Overrides](#lightdark-theme-overrides)
    * [Toast Container Placement](#toast-container-placement)
    * [Maximum Toast Count](#maximum-toast-count)
    * [Toast Timers](#toast-timers)
    * [Configuration Shorthand](#configuration-shorthand)
* [Release Notes](#release-notes)
* [Breaking Changes](#breaking-changes)
* [Credits](#credits)
* [License](#license)

## Theming: Heads Up, Lights Out
Built-in support for both light and dark themes. By default, the user's operating system preference will determine the theme, but this can be overridden. In an unsupported browser/OS combo, Bootstrap's default 'light' theme will take over.

<img src="https://github.com/PeytonRG/BootstrapToaster/blob/master/images/lightdark.gif?raw=true" alt="Toasts transitioning from light to dark theme" width="300" />

## Placement: Serving Up Toast, Coast-to-Coast
On desktop, the toast container defaults to the top right corner of the viewport, though this placement can be configured to any of 9 different areas. On mobile, the toast container will automatically lock to top center.

<img src="https://github.com/PeytonRG/BootstrapToaster/blob/master/images/toasttopright.png?raw=true" alt="A toast in the top right corner of the viewport" width="600" />
<img src="https://github.com/PeytonRG/BootstrapToaster/blob/master/images/toastmobile.png?raw=true" alt="A toast in the top middle of the viewport on a mobile device" width="300" />

## Timers: Too Much Time on My Hands
Toasts support options for how long they exist on the page before expiring automatically, or if they must be dismissed manually. Additionally, each toast displays the elapsed time since it was rendered, updated once per minute since it rendered. The elapsed timers are enabled by default but can be disabled too. Time to auto-hide a toast is per-toast and is set upon generation.

<img src="https://github.com/PeytonRG/BootstrapToaster/blob/master/images/timerjustnow.png?raw=true" alt="" width="300" />
<img src="https://github.com/PeytonRG/BootstrapToaster/blob/master/images/timer2mago.png?raw=true" alt="" width="300" />

## Maximum Toast Count: Complexity *Reducers* vs. Information *Producers*
Too many toasts can overwhelm and annoy the user, so by default no more than 4 will be allowed to render on the page. For new ones to be generated, old ones must go. This maximum count is also configurable. In the event that the number of toasts overflows the height of the viewport, the toast container becomes scrollable too.

## Accessibility: Built-in, Out-of-the-Box
The container that houses all of the toasts is setup as an aria-live region, so changes to its descendant elements will alert screen readers. Success and Info toasts will read out when the user is not busy, leaving their flow uninterrupted, while Error and Warning toasts will read out immediately. In addition, all toast status icons and elapsed timers are hidden to screen readers, as they are purely visual indicators.

## Getting Started
Setup is extremely straightforward. Simply include the CSS in your document's `<head>` and the JavaScript at the bottom of the `<body>` tag.

Install from npm, or via CDN. Currently jsDelivr is supported.
```npm
npm i bootstrap-toaster
```

```HTML
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-toaster@4.0.0/css/bootstrap-toaster.min.css" />
</head>
<body>
  ...
  <script src="https://cdn.jsdelivr.net/npm/bootstrap-toaster@4.0.0/js/bootstrap-toaster.min.js"></script>
</body>
```

### Dependencies
1. jQuery (1.9.1 - 3.x), for Bootstrap's own functions to create a toast
1. Bootstrap (>= 4.2.1), for the toasts themselves
1. Bootstrap Icons (>= 1.3.0), for the toast status icons

## Usage
### Minimal Required Setup
Bootstrap Toaster will take care of its own setup work, unless you choose to customize it, covered later on. When the script loads, it will insert a fixed-position container into the DOM that will house all of your toasts when they appear, so you can get to generating toasts in a snap!

All it takes to generate one is a call to `Toast.create()`, like so:
```JavaScript
Toast.create("Wow, that was easy!", "Just like that, this toast will appear on the page",
  TOAST_STATUS.SUCCESS, 5000);
```
The `Toast.create()` function supports the following 4 parameters:
1. `title`: The text of the toast's header.
1. `message`: The text of the toast's body.
1. `status`: The status/urgency of the toast. Affects status icon and ARIA accessibility features. Defaults to 0, which renders no icon. Default -> no status icon, same ARIA attributes as success and info toasts
1. `timeout`: Time in ms until toast disappears automatically. Default -> 0, in which case the toast must be manually dismissed.

Since the invocation is so simple, you can generate a toast from anywhere or for anything! For example, here's how you might use it after using jQuery AJAX to post data to an API:
```JavaScript
$.ajax({
    type: "POST",
    url: "https://some-web-api/endpoint",
    data: {
        ...
    },
    success: function (response) {
        response = JSON.parse(response);
        Toast.create("Success", response.message, TOAST_STATUS.SUCCESS, 10000);
    }
    error: function (response) {
        console.error(response);
        Toast.create("Error", "Something went wrong.", TOAST_STATUS.DANGER);
    }
});
```

### Toast Status Options
There are 4 built-in options for toast status in the call to `Toast.create()`, named after Bootstrap's color convention. They are as follows:
* `TOAST_STATUS.SUCCESS`
* `TOAST_STATUS.DANGER`
* `TOAST_STATUS.WARNING`
* `TOAST_STATUS.INFO`

As mentioned in the [accessibility](#accessibility) section, the status is important for correctly setting up ARIA attributes for the toast, but it also determines the toast's status icon.

### Global Toast Options
While the status icons and timeouts are configurable per-toast, the other configuration options are applied globally, and have their own helper functions to accomplish this. You simply need to call them prior to calling `Toast.create()` for them to take effect on newly-generated toasts.

#### Light/Dark Theme Overrides
As mentioned in the prior section on [theming](#theming), in supported browsers and operating systems the default behavior for toasts is to automatically choose a theme based on the user's preference at the OS level. However, there may be times where you want to force one theme or the other. In that case, the `Toast.setTheme()` function is for you! Here's how it works:
```JavaScript
Toast.setTheme(TOAST_THEME.LIGHT);
// or
Toast.setTheme(TOAST_THEME.DARK);
```
As the above script implies, there are two options for the lone `theme` parameter:
1. `TOAST_THEME.LIGHT`
1. `TOAST_THEME.DARK`

In the unlikely event of forcing a theme, then wanting to leave it up to the user's preference again, calling `Toast.setTheme()` without any parameters will remove the forced theme settings from new toasts.

#### Toast Container Placement
By default, the toast container will be fixed to the top right corner of the screen on larger screen sizes. The `Toast.setPlacement()` function allows that placement to be altered. The following example will move the toast container to the top left corner of the screen.
```JavaScript
Toast.setPlacement(TOAST_PLACEMENT.TOP_LEFT);
```
This function's lone `placement` parameter supports the following options:
1. `TOAST_PLACEMENT.TOP_LEFT`
1. `TOAST_PLACEMENT.TOP_CENTER`
1. `TOAST_PLACEMENT.TOP_RIGHT`
1. `TOAST_PLACEMENT.MIDDLE_LEFT`
1. `TOAST_PLACEMENT.MIDDLE_CENTER`
1. `TOAST_PLACEMENT.MIDDLE_RIGHT`
1. `TOAST_PLACEMENT.BOTTOM_LEFT`
1. `TOAST_PLACEMENT.BOTTOM_CENTER`
1. `TOAST_PLACEMENT.BOTTOM_RIGHT`

Similar to the previous function, calling `Toast.setPlacement()` with a null or missing parameter will restore the default top right configuration.

#### Maximum Toast Count
To avoid becoming a nuisance to users, especially if the creation of toasts is automated, a limit is in place to prevent too many toasts from being visible at once. By default, this limit is 4 toasts, but this can also be changed. The tool of choice is the `Toast.setMaxCount()` function. Below is an example of raising toast limit to 6 toasts.
```JavaScript
Toast.setMaxCount(6);
```
The lone `maxToasts` parameter supports any integer value greater than 0.

#### Toast Timers
Perhaps you aren't a fan of the elapsed timers on each toast, or would like to save every resource you can by not running the timers in the background. Luckily, there's a function for that, too. Introducing `Toast.enableTimers()`:
```JavaScript
Toast.enableTimers(false);
```
The lone `enabled` parameter simply accepts a boolean value, and defaults to `true`.

#### Configuration Shorthand
##### Come on all of you, all together now!
Suppose you would like to configure multiple global toast options at once. We have just the function for you! The `Toast.configure()` function exists as a quick shorthand to call each of the above config functions with a single call.
For example,
```JavaScript
Toast.configure(5, TOAST_PLACEMENT.BOTTOM_RIGHT, TOAST_THEME.DARK, false);
```
In the above snippet, we have set the max toast count to 5, moved the toast container to the bottom right corner of the viewport, locked toasts to dark theme, and disabled elapsed timers on the toasts.

`Toast.configure()` supports the following parameters:
1. `maxToasts`: The maximum number of toasts allowed on the page at once.
1. `placement`: The toast container's placement, defaults to top right. This will not affect small screens in portrait.
1. `theme`: The toasts' theme, either light or dark. If unset, they will follow OS light/dark preference.
1. `enableTimers`: Controls whether elapsed time will be displayed in the toast header.

`placement` and `theme` accept the same predefined options as mentioned in their respective sections, while `maxToasts` is an integer value and `enableTimers` is a boolean. Each parameter's default value is the same as in their respective helper functions.

## Release Notes
Full release notes can be found on the [Releases](https://github.com/PeytonRG/BootstrapToaster/releases) page of the repo, but a summary of breaking changes in each version is below.

## Breaking Changes

### Breaking Changes in 5.0.0-rc1
1. As of 5.0.0 this package targets Bootstrap 5 rather than 4.
    - If updating from 4.x, assuming your website is using Bootstrap 5, there are no breaking changes.
    - If updating from 3.x, all breaking changes of 4.x will apply here as well.

### Breaking Changes in 4.0.0
#### This version is designed to back-port improvements made from version 5.0.0 to Bootstrap 4. As such, its features code improvements from that version while maintaining full compatibility with Bootstrap 4. Unlike previous versions, 4 and 5 will both be maintained as current releases.
1. To better align with Bootstrap's documentation, all references to "position" have been renamed to placement, so a find and replace will be necessary for the following:
   - `TOAST_POSITION` -> `TOAST_PLACEMENT`
   - `Toast.setPosition` -> `Toast.setPlacement`
1. When adding many new placement options for toasts, I changed the internal number values of the artificial TOAST_PLACEMENT enum. If you were using those rather than their named equivalents, you will likely need to update your code. If you used the named values, the above find and replace is all you need to update.
1. Replaced Font Awesome 5 dependency with Bootstrap Icons for toast status icons.
    - For the icons to display, including a link tag for the Bootstrap Icons icon font stylesheet is required. View instructions on the [Bootstrap Icons Docs](https://icons.getbootstrap.com/#cdn).

### Breaking Changes in 3.0.0
1. This package is now officially named Bootstrap Toaster, and new versions will be published as `bootstrap-toaster` on npm rather than the previous `bootstrap-toast.js`. All old versions of the old package will be deprecated on npm.
1. The CSS and JS files have been renamed to go along with the new package name. You will need to adjust your code as follows:
    - `bootstrap-toast.css` -> `bootstrap-toaster.css`
    - `bootstrap-toast.js` -> `bootstrap-toaster.js`
1. Removed the v1 API that was deprecated in v2.

## Credits
Developed by Peyton Gasink
Bachelor of Software Engineering, Auburn University

## License
Licensed under MIT License. For more information, refer to the `LICENSE` file within the GitHub repository.
