## magicbook-plugin-catelog.js
Add catelog for the content.

### Usage
#### Import Dependencies
Make sure `magicbook` are included.
```html
  <link rel="stylesheet" type="text/css" href="plugins/components/css/magicbook-plugin-catelog.min.css" />

  <script src="plugins/components/js/magicbook-plugin-catelog.min.js"></script>
```

#### To Use
```js
  {magicbook instance}.carryCatelog();

  // or

  {magicbook instance}.carryCatelog({
    locationSelector: '',
    catelogSelector: 'h3',
    duration: 500,
    gap: 30
  });
```

### Configuration
#### catelogSelector
Catelog selector.

##### default
`h3`

#### duration
How long the animation will run.

##### default
`500`

#### gap
Gap between top and the assigned block.

##### default
`30`

#### locationSelector
Catelog's location, after the assigned selector.

##### default
`''`, before the content.

