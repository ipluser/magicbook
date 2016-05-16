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
#### openTag
Open controls for include tag.

##### default
`{%`


#### closeTag
Close controls for include tag.

##### default
`%}`


### methods
#### templateIncludeTag
Parse include tag.

##### parameters
| name      | description      |
|-----------|------------------|
| source | document content |
