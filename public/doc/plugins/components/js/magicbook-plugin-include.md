## magicbook-plugin-include.js
Support `include` template tag in document.

### usage
#### Import Dependencies
Make sure `magicbook` are included.
```html
  <script src="plugins/components/js/magicbook-plugin-include.min.js"></script>
```

#### To use include tag
```
{% include './test.md' %}
```

#### Initialize
```js
  {magicbook instance}.enableIncludeTag();

  // or

  {magicbook instance}.enableIncludeTag({
    openTag: '{%',
    closeTag: '%}'
  });
```

### configuration
#### closeTag
Close controls for include tag.

##### default
`%}`

#### normalizes
`normalizes`, consist of a series of `Normalize` function that will normalize url. Example below:

```js
// It will be parsed to Array if not Array
normalizes: [function normalizeTest(data, next) {
  if (data.url.startWith('test/')) {
    // todo
  } else {
    next();  // calling next Normalize function
  }
}]
```

**data**, has a `url` property.

**next**, indicating the next normalize function.

If you don't invoke `next`, It will stop normalize process and return.

##### default `[]`

#### openTag
Open controls for include tag.

##### default
`{%`


### methods
#### templateIncludeTag
Parse include tag.

##### parameters
| name      | description      |
|-----------|------------------|
| source | document content |
