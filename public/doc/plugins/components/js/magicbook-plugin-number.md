## magicbook-plugin-number.js
Add chapter number for the navigators.

### Usage
#### Import Dependencies
Make sure `magicbook` are included.
```html
<link rel="stylesheet" type="text/css" href="plugins/components/css/magicbook-plugin-number.min.css" />

<script src="plugins/components/js/magicbook-plugin-number.min.js"></script>
```

#### To Use
```js
  {magicbook instance}.numberNavigator();

  // or

  {magicbook instance}.numberNavigator({
    selector: 'ul'
  });
```

### Configuration
#### selector
Navigator selector.

##### default
`ul`
