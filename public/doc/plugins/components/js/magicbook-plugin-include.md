## magicbook-plugin-include.js
The **magicbook-plugin-include** supports `include` template tag in document.

### usage
#### Import Dependencies
To use magicbook-plugin-include, you’ll need to make sure `magicbook` are included.
```html
  <script src="plugins/components/js/magicbook-plugin-include.min.js"></script>
```

#### To use include tag
```markup
{% include './test.md' %}
```

#### Initialize
```js
  {magicbook instance}.enableIncludeTag({
    openTag: '{%',
    closeTag: '%}'
  });

  // or

  {magicbook instance}.enableIncludeTag();
```

### configuration
#### closeTag
Close controls for include tag.

##### default
`%}`

### normalizes
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
