## Methods
### handler
Get and set handler that add extra initialization to Magicbook.

##### parameters
| name    | description    |
|---------|----------------|
| name    | handler's name. |
| action  | a function to execute in show operation. |
| options | a options object that includes `priority` property that determines the order of execution. Under normal, the 0 is primary  action, the 1 is Magicbooks own, the 2, 3, ... is others. |


### normalizeImageUrl
Normalizing image's url that based on base file.

##### parameters
| name     | description      |
|----------|------------------|
| baseFile | relative file of image |
| url		 | url of file      |


### normalizeUrl
Normalizing url that will handle baseUrl, urlArgs and other before fetch resource.

##### parameters
| name    | description     |
|---------|-----------------|
| url		| url of file     |


### parser
Parsing content to some format after fetch resource.

##### parameters
| name    | description     |
|---------|-----------------|
| data		| content of file |


### render
Rendering content after handle resource.

##### parameters
| name     | description     |
|----------|-----------------|
| url		 | url of file     |
| callback | `Callback` object or Array of `Callback` object |

##### example
```js
// callback can be a Array of Callback object
book.render('public/doc/quick-start.md', {
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
| url		 | url of file     |
| callback | `Callback` object or Array of `Callback` object |

##### example
```js
// callback can be a Array of Callback object
book.route('public/doc/quick-start.md', {
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

