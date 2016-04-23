## Options
### container
default `''`

A selector that contains navigator and content.

### navigator
default `''`

A selector that contains navigator.

### content
default `''`

A selector that contains content.

### navigatorUrl
default `''`

A path of navigator.

### homeUrl
default `README.md`

A path of home.

### baseUrl
default `''`

The root path to use for all resources lookups. 

### urlArgs
default `''`

Extra query string arguments appended to URLs that Magicbook uses to fetch resources. Most useful to cache bust when the browser or server is not configured correctly. Example below:

```js
urlArgs: 'ver=0.4.0'
```

### flip
default `true`

Do you want to add previous/next flip to your Magicbook? This can be set to either `true` or `false`.

### keys
default `true`

Do you want to add keyboard shortcut support to your Magicbook? This can be set to either `true` or `false`.

### debug
default `false`

Do you want to see log message in Magicbook? This can be set to either `true` or `false`.

### navigatorCallback
default `{}`

A options object that include `success`, `fail` and `finally` function to execute after navigator have been rendered. Example below:

```js
navigatorCallback: {
  success: function (data) {
  },
  fail: function (err) {
  },
  finally: function () {
  }
}
```

### routeCallback
default `{}`

A options object that include `success`, `fail` and `finally` function to execute after content have been rendered. Example below:

```js
navigatorCallback: {
  success: function (data) {
  },
  fail: function (err) {
  },
  finally: function () {
  }
}
```
