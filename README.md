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
* [Release Notes](#release-notes)
* [Breaking Changes](#breaking-changes)
* [Credits](#credits)
* [License](#license)

## Feature Overview
An overview of available features is available in the [wiki](https://github.com/PeytonRG/BootstrapToaster/wiki/Feature-Overview).

## Getting Started
Visit the [Getting Started](https://github.com/PeytonRG/BootstrapToaster/wiki/Getting-Started) page in the wiki to start making toasts!

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
