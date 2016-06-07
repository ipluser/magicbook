## Methods
There are some instance methods to operates magicbook.

### getCurrentDocUrl
Get current document's url.

##### parameters
none


### handler
Get and set handler that add extra initialization to Magicbook.

##### parameters
| name    | description    |
|---------|----------------|
| name    | handler's name. |
| action  | a function to execute in show operation. |
| options | a options object that includes `priority` property that determines the order of execution. Under normal, the 0 is primary  action, the 1 is Magicbooks own, the 2, 3, ... is others. |


### moveTo
Scroll to the assigned content block. Move to the top if not parameters.

##### parameters
| name      | description      |
|-----------|------------------|
| options   | consist of `selector`(the assigned content block), `duration`(how long the animation will run) and `gap`(gap between top and the assigned block) properties. `duration` and `gap` defaults `500` and `0` |


### normalizeUrl
Normalizing url that will handle baseUrl, urlArgs and other before fetch resource.

##### parameters
| name    | description     |
|---------|-----------------|
| url		  | url of file     |


### parser
Parsing content to some format after fetch resource.

##### parameters
| name    | description     |
|---------|-----------------|
| data		| content of file |


### relativeCurrentUrl
Solve assigned url to relative path from current url.

##### parameters
| name     | description      |
|----------|------------------|
| url		   | url of file      |


### render
Rendering content after handle resource.

##### parameters
| name     | description     |
|----------|-----------------|
| url		   | url of file     |
| callback | `Callback` object or Array of `Callback` object |

##### example
```js
// callback can be a Array of Callback object
book.render('public/doc/quick-start.md', {
  prepare: function () {  // prepare to execute before request content.
    // todo
  },
  success: function (data) {
    // todo
  },
  fail: function (err) {
    // todo
  },
  finally: function () {
    // todo
  }
});
```


### route
Routing some resource that consist of handle resource and render.

##### parameters
| name     | description     |
|----------|-----------------|
| url		   | url of file     |
| callback | `Callback` object or Array of `Callback` object |

##### example
```js
// callback can be a Array of Callback object
book.route('public/doc/quick-start.md', {
  prepare: function () {  // prepare to execute before request content.
    // todo
  },
  success: function (data) {
    // todo
  },
  fail: function (err) {
    // todo
  },
  finally: function () {
    // todo
  }
});
```


### show
Show the Magicbook.
