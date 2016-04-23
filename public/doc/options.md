## Options
### baseUrl
default `''`

The root path to use for all resources lookups.

### container
default `''`

A selector that contains navigator and content.

### content
default `''`

A selector that contains content.

### debug
default `false`

Do you want to see log message in Magicbook? This can be set to either `true` or `false`.

### flip
default `true`

Do you want to add previous/next flip to your Magicbook? This can be set to either `true` or `false`.

### homeUrl
default `README.md`

A path of home. 

### keys
default `true`

Do you want to add keyboard shortcut support to your Magicbook? This can be set to either `true` or `false`.

### navigator
default `''`

A selector that contains navigator.

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

### navigatorUrl
default `''`

A path of navigator.

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

### urlArgs
default `''`

Extra query string arguments appended to URLs that Magicbook uses to fetch resources. Most useful to cache bust when the browser or server is not configured correctly. Example below:

```js
urlArgs: 'ver=0.4.0'
```
