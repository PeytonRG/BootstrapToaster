# bootstrap-toast.js

## Description
Plug &amp; play generator for Bootstrap toasts, with plenty of configuration options.

### Heads Up, Lights Out
Built-in support for both light and dark themes. By default, the user's operating system preference will determine the theme, but this can be overridden. In an unsupported browser/OS combo, Bootstrap's default 'light' theme will take over.

### Positionable, Coast-to-Coast
On desktop, toasts will position themselves in the top right corner of the viewport, though this placement can be configured. Options include the four corners of the viewport. On mobile, the two top corners will result in a top-middle placement, and the bottom corners will result in a bottom-middle placement.

### Too Much Time on My Hands
Toasts support options for how long they exist on the page before expiring automatically, or if they will must be dismissed manually. Additionally, each toast displays the elapsed time since it was rendered, updated once per minute since it rendered. The elapsed timers are enabled by default but can be disabled too. Time to auto-hide a toast is per-toast and is set upon generation.

### A Wealth of Information Creates a Poverty of Attention
Too many toasts can overwhelm and annoy the user, so by default no more than 4 will be allowed to render on the page. For new ones to be generated, old ones must go. This maximum count is also configurable. In the event that the number of toasts overflows the height of the viewport, the toast container becomes scrollable too.

### Accessible, Out-of-the-Box
The container that houses all of the toasts is setup as an aria-live region, so changes to its descendant elements will alert screen readers. Success and Info toasts will read out when the user is not busy, leaving their flow uninterrupted, while Error and Warning toasts will read out immediately.

## Getting Started
Setup is extremely straightforward. Simply include the CSS in your document's `<head>` and the JavaScript at the bottom of the `<body>` tag.

You can download the source locally from the Releases tab, or include it via CDN. Currently jsDelivr is supported.

```HTML
<head>
  <link rel="stylesheet" type="text/css"
           href="https://cdn.jsdelivr.net/gh/peytonrg/bootstrap-toast.js@v1.2.3-beta/css/bootstrap-toast.min.css" />
</head>
<body>
  ...
  <script type="text/javascript" 
          src="https://cdn.jsdelivr.net/gh/peytonrg/bootstrap-toast.js@v1.2.3-beta/js/bootstrap-toast.min.js"></script>
</body>
```

### Dependencies
1. JQuery (1.9.1 - 3), but only where it uses Bootstrap's own functions to create a toast
1. Bootstrap (>= 4.2.1)
1. Font Awesome (>= 5.0.0)

## Usage
Usage instructions forthcoming
