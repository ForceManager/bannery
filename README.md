# Bannery

> A really easy-to-use component for generating fully customized banners. You can take advantage of it in order to show, for example, a cookie consent banner or even to announce an upcoming event.

## ⭐️ Features

- Options from external source
- Markdown support
- Start/End date
- One-time display
- Callbacks
- CSS customization
- Custom CSS animation

## ⚙️ Usage

### Install
```
npm -i bannery
// or
yarn add bannery
```

### ES Module
```
import Bannery from 'bannery';

import 'bannery/dist/style.css';
import 'bannery/dist/theme.css'; // or use "css" option

Bannery({ url: 'https://cdn.jsdelivr.net/gh/embedmode/bannery/dist/example.json' });
```

### CDN

Alternatively, you can include it via jsDelivr CDN:

#### UMD:
```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/embedmode/bannery/dist/style.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/embedmode/bannery/dist/theme.css">

<script src="https://cdn.jsdelivr.net/gh/embedmode/bannery/dist/bannery.umd.js"></script>
<script>
  Bannery({ url: 'https://cdn.jsdelivr.net/gh/embedmode/bannery/dist/example.json' });
</script>
```

#### ES module:
```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/embedmode/bannery/dist/style.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/embedmode/bannery/dist/theme.css">

<script type="module">
  import Bannery from "https://cdn.jsdelivr.net/gh/embedmode/bannery/dist/bannery.es.js";

  Bannery({
    url: "https://cdn.jsdelivr.net/gh/embedmode/bannery/dist/example.json"
  });
</script>
```

### Parameters

- External source options will be deep-merged with passed by parameter.

| Attribute         | Type     | Default   | Description                                                                                                            |
| ----------------- | -------- | --------- | ---------------------------------------------------------------------------------------------------------------------- |
| key               | string   |           | Banner identity. It will be used as DOM element id, part of cookie name and passed as a query string for data requests |
| url               | string   |           | Provide an external options source. Must return a valid JSON body.                                                     |
| options           | object   | see below | Local options                                                                                                          |
| hooks.onOptions   | function |           | After getting and merging options, you can use this hook to modify them                                                |
| hooks.onOpen      | function |           | Sets banner to show or hide                                                                                            |
| hooks.onPrimary   | function |           | Triggers when primary button is clicked. Native event passed                                                           |
| hooks.onSecondary | function |           | Triggers when secondary button is clicked. Native event passed                                                         |

### Options

> [example.json](https://github.com/embedmode/bannery/blob/main/dist/example.json)

| Key                   | Type    | Default               | Description                                                                                     |
| --------------------- | ------- | --------------------- | ----------------------------------------------------------------------------------------------- |
| enabled               | boolean | true                  | First thing checked in order to display our banner                                              |
| title                 | string  |                       | Support markdown without html, only rendered if exists                                          |
| description           | string  |                       | Support markdown without html, only rendered if exists                                          |
| position              | string  | bottom                | [top\|bottom] Banner display position                                                           |
| display.startDate     | date    |                       | Banner will be shown if current date is later than startDate, regardless of endDate             |
| display.endDate       | date    |                       | Banner will be shown if current date is before endDate, regardless of startDate                 |
| display.mode          | string  |                       | [cookie\|session] Enables one-time banner display, storing a value in cookies or sessionStorage |
| buttons.primaryLink   | string  |                       | Primary button link, usually used as a confirm button                                           |
| buttons.primaryText   | string  |                       | Primary button text, usually used as a confirm button as well                                   |
| buttons.secondaryText | string  |                       | Secondary button text, normally used as a close button                                          |
| themeClass            | string  | bannery-default-theme | Root element class name used as a theme class name                                              |
| css                   | string  |                       | css string injected as a style tag                                                              |
| animation             | string  |                       | css animation class name                                                                        |

## 🌐 Browser support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE11, Edge                                                                                                                                                                                                      | >= 52                                                                                                                                                                                                             | >= 49                                                                                                                                                                                                         | >= 10                                                                                                                                                                                                         |

## 🙌 Contributing

To learn how to setup a development environment and for contribution guidelines, see [CONTRIBUTING.md](/CONTRIBUTING.md).

### 🚧 Development

```
yarn install

// Compiles and hot-reloads for development
yarn serve

// Lints and fixes files
yarn lint

// Compiles and minifies for production
yarn build
```

## 📜 Changelog

We use [GitHub releases](https://github.com/embedmode/bannery/releases).

## 🔐 Security

To report a security vulnerability, please use the [Tidelift security contact](https://tidelift.com/security).

## 📄 License

This project is licensed under the terms of the
[MIT license](/LICENSE).
