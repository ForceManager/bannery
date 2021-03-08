# Bannery

> Simple embeddable component for displaying a banner, you can use it as a Cookie advice or maybe to announce an event.

## ⭐️ Features

- Options from external source
- Markdown support
- Start/End date
- One-time display
- Callbacks
- CSS customization
- Custom CSS animation

## 📦 Setup

```
yarn install

// Compiles and hot-reloads for development
yarn serve

// Lints and fixes files
yarn lint

// Compiles and minifies for production
yarn build
```

## ⚙️ Usage

```
<script src="https://cdn.jsdelivr.net/gh/embedmode/bannery/dist/js/bannery.js"></script>
<script>
  Bannery({ url: 'https://cdn.jsdelivr.net/gh/embedmode/bannery/dist/example.json' });
</script>
```

### Parameters

- External source options will be deep-merged with local ones.

| Attribute         | Type     | Default   | Description                                                                                                |
| ----------------- | -------- | --------- | ---------------------------------------------------------------------------------------------------------- |
| key               | string   |           | Banner identity, it will be used as dom element id, cookie name suffix and it will be sent to url request. |
| url               | string   |           | External options as a valid JSON response.                                                                 |
| options           | object   | see below | Local options                                                                                              |
| hooks.onOptions   | function |           | After get and merge options, you can overwrite them here returning and object.                             |
| hooks.onOpen      | function |           | When banner is display it.                                                                                 |
| hooks.onPrimary   | function |           | When primary button is clicked. Native event passed.                                                       |
| hooks.onSecondary | function |           | When secondary button is clicked. Native event passed.                                                     |

### Options

> [example.json](https://github.com/embedmode/bannery/blob/main/dist/example.json)

| Key                   | Type    | Default               | Description                                                                             |
| --------------------- | ------- | --------------------- | --------------------------------------------------------------------------------------- |
| enabled               | boolean | true                  | First check for display it.                                                             |
| title                 | string  |                       | Support markdown without html, only rendered if exists.                                 |
| description           | string  |                       | Support markdown without html, only rendered if exists.                                 |
| position              | string  | bottom                | [top\|bottom] Banner display window position.                                           |
| display.startDate     | date    |                       | Display it if current date is after startDate, independent of endDate.                  |
| display.endDate       | date    |                       | Display it if current date is before endDate, independent of startDate.                 |
| display.mode          | string  |                       | [cookie\|session] Enable one-time display storing a value in cookies or sessionStorage. |
| buttons.primaryLink   | string  |                       | Primary button link, commonly used as a confirm button.                                 |
| buttons.primaryText   | string  |                       | Primary button text, commonly used as a confirm button.                                 |
| buttons.secondaryText | string  |                       | Secondary button text, commonly used as a close button.                                 |
| themeClass            | string  | bannery-default-theme | Root element class name used as a theme class name.                                     |
| css                   | string  |                       | css string injected as a style tag                                                      |
| animation             | string  |                       | css animation class name                                                                |

## 🌐 Browser support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE11, Edge                                                                                                                                                                                                      | >= 52                                                                                                                                                                                                             | >= 49                                                                                                                                                                                                         | >= 10                                                                                                                                                                                                         |

## 🙌 Contributing

To learn how to setup a development environment and for contribution guidelines, see [CONTRIBUTING.md](/CONTRIBUTING.md).

## 📜 Changelog

We use [GitHub releases](https://github.com/embedmode/bannery/releases).

## 🔐 Security

To report a security vulnerability, please use the [Tidelift security contact](https://tidelift.com/security).

## 📄 License

This project is licensed under the terms of the
[MIT license](/LICENSE).
