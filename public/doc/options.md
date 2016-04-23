## Options
### baseUrl
The root path to use for all resources lookups.

##### default `''`

### container
A selector that contains navigator and content.

##### default `''`

### content
A selector that contains content.

##### default `''`

### debug
Do you want to see log message in Magicbook? This can be set to either `true` or `false`.

##### default `false`

### flip
Do you want to add previous/next flip to your Magicbook? This can be set to either `true` or `false`.

##### default `true`

### homeUrl
A path of home. 

##### default `README.md`

### keys
Do you want to add keyboard shortcut support to your Magicbook? This can be set to either `true` or `false`.

##### default `true`

### navigator
A selector that contains navigator.

##### default `''`

### navigatorCallback
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

##### default `{}`

### navigatorUrl
A path of navigator.

##### default `navigator.md`

### routeCallback
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

##### default `{}`

### urlArgs
Extra query string arguments appended to URLs that Magicbook uses to fetch resources. Most useful to cache bust when the browser or server is not configured correctly. Example below:

```js
urlArgs: 'ver=0.4.0'
```

##### default `''`
