## magicbook-plugin-loading.js
Support loading animation.

### Usage
#### Import Dependencies
Make sure `magicbook` are included.
```html
  <link rel="stylesheet" type="text/css" href="plugins/components/css/magicbook-plugin-loading.min.css" />

  <script src="plugins/components/js/magicbook-plugin-loading.min.js"></script>
```

#### To Use
```js
  {magicbook instance}.animateLoading();

  // or

  {magicbook instance}.animateLoading({
    navigator: {
      selector: '',
      text: ''
    },
    content: {
      selector: '',
      text: ''
    }
  });
```

### Configuration
#### navigator
`navigator` object that consist of `selector` and `text`.

##### default
```
navigator: {
  selector: '',
  text: 'loading...'
}
```

#### content
`content` object that consist of `selector` and `text`.

##### default
```
content: {
  selector: '',
  text: 'loading...'
}
```

