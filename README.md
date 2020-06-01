# bootstrap-toast.js
Robust, plug &amp; play generator for Bootstrap toasts.

[![jsDelivr Download Stats](https://data.jsdelivr.com/v1/package/npm/bootstrap-toast.js/badge?style=rounded)](https://www.jsdelivr.com/package/npm/bootstrap-toast.js)
[![CodeFactor](https://www.codefactor.io/repository/github/peytonrg/bootstrap-toast.js/badge)](https://www.codefactor.io/repository/github/peytonrg/bootstrap-toast.js)
![npm publish](https://github.com/PeytonRG/bootstrap-toast.js/workflows/npm%20Publish/badge.svg)

## Contents
* [Theming](#theming-heads-up-lights-out)
* [Positioning](#positioning-serving-up-toast-coast-to-coast)
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
    * [Toast Container Positioning](#toast-container-positioning)
    * [Maximum Toast Count](#maximum-toast-count)
    * [Toast Timers](#toast-timers)
    * [Configuration Shorthand](#configuration-shorthand)
 * [Credits](#credits)
 * [License](#license)

## Theming: Heads Up, Lights Out
Built-in support for both light and dark themes. By default, the user's operating system preference will determine the theme, but this can be overridden. In an unsupported browser/OS combo, Bootstrap's default 'light' theme will take over.

<img src="https://github.com/PeytonRG/bootstrap-toast.js/blob/master/images/lightdark.gif?raw=true" alt="Toasts transitioning from light to dark theme" width="300" />

## Positioning: Serving Up Toast, Coast-to-Coast
On desktop, toasts will position themselves in the top right corner of the viewport, though this placement can be configured. Options include the four corners of the viewport. On mobile, the two top corners will result in a top-middle placement, and the bottom corners will result in a bottom-middle placement.

<img src="https://github.com/PeytonRG/bootstrap-toast.js/blob/master/images/toasttopright.png?raw=true" alt="A toast in the top right corner of the viewport" width="600" />
<img src="https://github.com/PeytonRG/bootstrap-toast.js/blob/master/images/toastmobile.png?raw=true" alt="A toast in the top middle of the viewport on a mobile device" width="300" />

## Timers: Too Much Time on My Hands
Toasts support options for how long they exist on the page before expiring automatically, or if they must be dismissed manually. Additionally, each toast displays the elapsed time since it was rendered, updated once per minute since it rendered. The elapsed timers are enabled by default but can be disabled too. Time to auto-hide a toast is per-toast and is set upon generation.

<img src="https://github.com/PeytonRG/bootstrap-toast.js/blob/master/images/timerjustnow.png?raw=true" alt="" width="300" />
<img src="https://github.com/PeytonRG/bootstrap-toast.js/blob/master/images/timer2mago.png?raw=true" alt="" width="300" />

## Maximum Toast Count: Complexity *Reducers* vs. Information *Producers*
Too many toasts can overwhelm and annoy the user, so by default no more than 4 will be allowed to render on the page. For new ones to be generated, old ones must go. This maximum count is also configurable. In the event that the number of toasts overflows the height of the viewport, the toast container becomes scrollable too.

## Accessibility: Built-in, Out-of-the-Box
The container that houses all of the toasts is setup as an aria-live region, so changes to its descendant elements will alert screen readers. Success and Info toasts will read out when the user is not busy, leaving their flow uninterrupted, while Error and Warning toasts will read out immediately. In addition, all toast status icons and elapsed timers are hidden to screen readers, as they are purely visual indicators.

## Getting Started
Setup is extremely straightforward. Simply include the CSS in your document's `<head>` and the JavaScript at the bottom of the `<body>` tag.

Install from npm, or via CDN. Currently jsDelivr is supported.
```npm
npm i bootstrap-toast.js
```

```HTML
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-toast.js@1.0.8/css/bootstrap-toast.min.css"
        integrity="sha256-brHFMMl0+rWPVzFXXH2wQfh+ce9bAtzOFkZ848v6iUs=" crossorigin="anonymous">
</head>
<body>
  ...
  <script src="https://cdn.jsdelivr.net/npm/bootstrap-toast.js@1.0.8/js/bootstrap-toast.min.js"
    integrity="sha256-xAVWHb2y3Yii6cfnGu69a9iMSxYdGduWX2hu3gHJK1g=" crossorigin="anonymous"></script>
</body>
```

### Dependencies
1. jQuery (1.9.1 - 3.x), but only where it uses Bootstrap's own functions to create a toast
1. Bootstrap (>= 4.2.1), for the toasts themselves
1. Font Awesome (>= 5.0.0), for the toast status icons

## Usage
### Minimal Required Setup
Bootstrap-toast.js will take care of its own setup work, unless you choose to customize it, covered later on. When the script loads, it will insert a fixed position container into the DOM that will house all of your toasts when they appear, so you can get to generating toasts in a snap!

All it takes to generate one is a call to `toastGenerator()`, like so:
```JavaScript
toastGenerator("Wow, that was easy!", "Just like that, this toast will appear on the page",
  TOAST_STATUS.SUCCESS, 5000);
```
The `toastGenerator()` function supports the following 4 parameters:
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
        toastGenerator("Success", response.message, TOAST_STATUS.SUCCESS, 10000);
    }
    error: function (response) {
        console.error(response);
        toastGenerator("Error", "Something went wrong.", TOAST_STATUS.DANGER);
    }
});
```

### Toast Status Options
There are 4 built-in options for toast status in the call to `toastGenerator()`, named after Bootstrap's color convention. They are as follows:
* `TOAST_STATUS.SUCCESS`
* `TOAST_STATUS.DANGER`
* `TOAST_STATUS.WARNING`
* `TOAST_STATUS.INFO`

As mentioned in the [accessibility](#accessibility) section, the status is important for correctly setting up ARIA attributes for the toast, but it also determines the toast's status icon.

### Global Toast Options
While the status icons and timeouts are configurable per-toast, the other configuration options are applied globally, and have their own helper functions to accomplish this. You simply need to call them prior to calling `toastGenerator()` for them to take effect on newly-generated toasts.

#### Light/Dark Theme Overrides
As mentioned in the prior section on [theming](#theming), in supported browsers and operating systems the default behavior for toasts is to automatically choose a theme based on the user's preference at the OS level. However, there may be times where you want to force one theme or the other. In that case, the `setToastTheme()` function is for you! Here's how it works:
```JavaScript
setToastTheme(TOAST_THEME.LIGHT);
// or
setToastTheme(TOAST_THEME.DARK);
```
As the above script implies, there are two options for the lone `theme` parameter:
1. `TOAST_THEME.LIGHT`
1. `TOAST_THEME.DARK`

In the unlikely event of forcing a theme, then wanting to leave it up to the user's preference again, calling `setToastTheme()` without any parameters will remove the forced theme settings from new toasts.

#### Toast Container Positioning
By default, the toast container will be fixed to the top right corner of the screen on larger screen sizes. The `setToastPosition()` function allows that positioning to be altered. The following example will move the toast container to the top left corner of the screen.
```JavaScript
setToastPosition(TOAST_POSITION.TOP_LEFT);
```
This function's lone `position` parameter supports the following options:
1. `TOAST_POSITION.BOTTOM_LEFT`
1. `TOAST_POSITION.BOTTOM_RIGHT`
1. `TOAST_POSITION.TOP_LEFT`
1. `TOAST_POSITION.TOP_RIGHT`

Similar to the previous function, calling `setToastPosition()` with a null or missing parameter will restore the default top right configuration.

#### Maximum Toast Count
To avoid becoming a nuisance to users, especially if the creation of toasts is automated, a limit is in place to prevent too many toasts from being visible at once. By default, this limit is 4 toasts, but this can also be changed. The tool of choice is the `setMaxToastCount()` function. Below is an example of raising toast limit to 6 toasts.
```JavaScript
setMaxToastCount(6);
```
The lone `maxToasts` parameter supports any integer value greater than 0.

#### Toast Timers
Perhaps you aren't a fan of the elapsed timers on each toast, or would like to save every resource you can by not running the timers in the background. Luckily, there's a function for that, too. Introducing `enableToastTimers()`:
```JavaScript
enableToastTimers(false);
```
The lone `enabled` parameter simply accepts a boolean value, and defaults to `true`.

#### Configuration Shorthand
##### Come on all of you, all together now!
Suppose you would like to configure multiple global toast options at once. We have just the function for you! The `configureToasts()` function exists as a quick shorthand to call each of the above config functions with a single call.
For example,
```JavaScript
configureToasts(5, TOAST_POSITION.BOTTOM_RIGHT, TOAST_THEME.DARK, false);
```
In the above snippet, we have set the max toast count to 5, moved the toast container to the bottom right corner of the viewport, locked toasts to dark theme, and disabled elapsed timers on the toasts.

`configureToasts()` supports the following parameters:
`maxToasts`: The maximum number of toasts allowed on the page at once.
`position`: The toast container's position, defaults to top right. This will not affect small screens in portrait.
`theme`: The toasts' theme, either light or dark. If unset, they will follow OS light/dark preference.
`enableTimers`: Controls whether elapsed time will be displayed in the toast header.

`position` and `theme` accept the same predefined options as mentioned in their respective sections, while `maxToasts` is an integer value and `enableTimers` is a boolean. Each parameter's default value is the same as in their respective helper functions.

## Credits
Developed by Peyton Gasink, a senior in software engineering in Auburn University's class of 2020 as a COVID-19 quarantine project ❤️

## License
Licensed under MIT License. For more information, refer to the `LICENSE` file within the GitHub repository.
