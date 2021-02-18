# Bootstrap Toaster
Robust, plug &amp; play generator for Bootstrap toasts.

[![jsDelivr Download Stats](https://data.jsdelivr.com/v1/package/npm/bootstrap-toaster/badge?style=rounded)](https://www.jsdelivr.com/package/npm/bootstrap-toaster)
[![CodeFactor](https://www.codefactor.io/repository/github/peytonrg/bootstraptoaster/badge)](https://www.codefactor.io/repository/github/peytonrg/bootstraptoaster)
![deployment](https://github.com/PeytonRG/BootstrapToaster/workflows/deployment/badge.svg)

## Demo
A demo page is available at [bootstraptoaster.peytongasink.dev](https://bootstraptoaster.peytongasink.dev) for you to try out all the features listed below!

## Bootstrap 5 Support
Version 5.0.0-rc4 includes full support for Bootstrap 5 Beta 2. Once Bootstrap 5 is officially released, 5.0.0 will be released as well!

## Contents
* [Feature Overview](#feature-overview)
* [Getting Started](#getting-started)
  * [Dependencies](#dependencies)
* [Usage](#usage)
  * [Minimal Required Setup](#minimal-required-setup)
  * [Toast Status Options](#toast-status-options)
  * [Global Toast Options](#global-toast-options)
* [Release Notes](#release-notes)
* [Breaking Changes](#breaking-changes)
* [Credits](#credits)
* [License](#license)

## Feature Overview
An overview of available features is available in the [wiki](https://github.com/PeytonRG/BootstrapToaster/wiki/Feature-Overview).

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
1. Bootstrap (>= 5.0.0-beta2), for the toasts themselves
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

## Global Toast Options
Global customization options are available as well. To learn more, view their documentation in the [wiki](https://github.com/PeytonRG/BootstrapToaster/wiki/Global-Toast-Options).

## Release Notes
Full release notes can be found on the [Releases](https://github.com/PeytonRG/BootstrapToaster/releases) page of the repo, but a summary of breaking changes in each version is below.

## Breaking Changes

### Breaking Changes in 5.0.0
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
