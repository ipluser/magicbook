## magicbook-plugin-collapse.js
Support collapse navigators.

### Usage
#### Import Dependencies
Make sure `magicbook` are included.
```html
  <link rel="stylesheet" type="text/css" href="plugins/components/css/magicbook-plugin-collapse.min.css" />

  <script src="plugins/components/js/magicbook-plugin-collapse.min.js"></script>
```

#### To Use
```js
  {magicbook instance}.collapseNavigator();

  // or

  {magicbook instance}.collapseNavigator({
    selector: '#guide+ul',
    expand: true
  });
```

### Configuration
#### expand
Initial status for navigators.

##### default
`true`

#### selector
Navigator selector.

##### default
`ul`

