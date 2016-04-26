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


### homeUrl
A path of home. 

##### default `README.md`


### navigator
A selector that contains navigator.

##### default `''`


### navigatorCallbackQueue
`navigatorCallbackQueue` to execute after navigator have been rendered that consist of a series of `Callback` object. `Callback` object has `success`, `fail` and `finally` function properties. Example below:

```js
// It will be transformed into Array if navigatorCallbackQueue is a Callback object
navigatorCallbackQueue: [{
  success: function (data) {
    // todo
  },
  fail: function (err) {
    // todo
  },
  finally: function () {
    // todo
  }
}]
```

##### default `[]`


### navigatorUrl
A path of navigator.

##### default `navigator.md`


### routeCallbackQueue
`routeCallbackQueue ` to execute after navigator have been rendered that consist of a series of `Callback` object. `Callback` object has `success`, `fail` and `finally` function properties. Example below:

```js
// It will be transformed into Array if navigatorCallbackQueue is a Callback object
routeCallbackQueue: [{
  success: function (data) {
    // todo
  },
  fail: function (err) {
    // todo
  },
  finally: function () {
    // todo
  }
}]
```

##### default `[]`


### urlArgs
Extra query string arguments appended to URLs that Magicbook uses to fetch resources. Most useful to cache bust when the browser or server is not configured correctly. Example below:

```js
urlArgs: 'ver=0.5.0'
```

##### default `''`

