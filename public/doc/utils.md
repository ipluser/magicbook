## Utils
There are some utils methods to facilitates magicbook.

### addClassName
Append class name to specified selector.

##### parameters
| name      | description    |
|-----------|----------------|
| selector  | element selector |
| className | class name |


### customizeMarkdown
Customize markdonw factory/generator for user get a magicbook instance by `markdown` generator.

##### parameters
| name    | description    |
|---------|----------------|
| name    | markdonw factory's name |
| factory | markdown factory function. Please refer [awesome plugins](#public/doc/plugins/markdown/js/awesome.md) |


### getPropertyByDefaultValue
Get a property from object, if not, then return specified value.

##### parameters
| name    | description    |
|---------|----------------|
| obj          | object to get |
| name         | the name of property to get |
| defaultValue | specified default value if not |


### hasOwnProperty
Returns a boolean indicating whether the object has the specified property.

##### parameters
| name    | description    |
|---------|----------------|
| obj     | object to test |
| key     | the name of the property to test |


### isArray
Returns a boolean indicating whether the object is javascript array object.

##### parameters
| name    | description    |
|---------|----------------|
| obj     | object to test |


### isBodyScroller
Returns a boolean indicating whether the body has scroll bar.

##### parameters
none


### isFunction
Returns a boolean indicating whether the object is javascript function object.

##### parameters
| name    | description    |
|---------|----------------|
| obj     | object to test |


### isNumber
Returns a boolean indicating whether the object is javascript number object.

##### parameters
| name    | description    |
|---------|----------------|
| obj     | object to test |


### isUndefined
Returns a boolean indicating whether the object is `undefined`.

##### parameters
| name    | description    |
|---------|----------------|
| obj     | object to test |


### markdown
A markdown generator.

##### parameters
| name    | description     |
|---------|-----------------|
| name    | markdown generator's name |
| cfg     | markdown's configuration  |


### parseArray
Parse object to javascript array object.

##### parameters
| name    | description    |
|---------|----------------|
| obj     | object to parse |


### randomString
Returns a random string that includes 25 character.

##### parameters
none


### requestGet
Http request with `get` type

##### parameters
| name     | description    |
|----------|----------------|
| url      | request url|
| callback | `Callback` object that includes `success`, `fail` and `finally` method  |


### toStringEqual
Returns a boolean indicating whether the object `toString()` is specified string.

##### parameters
| name    | description    |
|---------|----------------|
| obj     | object to test |
| toStr   | specified string to compare |
