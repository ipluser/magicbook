## magicbook-plugin-number.js
The **magicbook-plugin-number** auto to give the navigator chapter number.

### Usage
#### Import Dependencies
To use magicbook-plugin-number, you’ll need to make sure `magicbook` are included.
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
