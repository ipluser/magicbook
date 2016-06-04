## agilities.js
The **agilities** provides some infrastructure that includes **scroll to top**, **turn the page**.

### Usage
#### Import Dependencies
To use agilities, you’ll need to make sure `magicbook` are included.
```html
  <link rel="stylesheet" type="text/css" href="plugins/components/css/agilities.min.css" />

  <script src="plugins/components/js/agilities.min.js"></script>
```

#### To Use
```js
  {magicbook instance}.agilities();

  // or

  {magicbook instance}.agilities({
    scrollTop: true,
    turnPage: true
  });
```

### Configuration
#### scrollTop
It provides scroll to top function. `scrollTop` default `true`, you also specify `true/false`, `selector` or `label` property.
Example below:

```js
  {magicbook instance}.agilities({
    scrollTop: {
      label: 'scrollToTop'    // specified name of button if not specified selecotor, it default **scrollToTop**
      selector: '.selector',  // specified selector to scroll to top
    }
  });
```

#### turnPage
It provides turn the page function. `turnPage` default `true`, you also specify `true/false`, `prev` or `next` property.
Example below:

```js
  {magicbook instance}.agilities({
    turnPage: {
      selector: 'ul li > *:first-child'  // specified selector to navigator's text
      prev: {
        label: 'prev'               // specified name of prev button if not specified selecotor
        selector: '.prev-selector'  // specified selector to turn the previous page
      },
      next: {
        label: 'next'               // specified name of next button if not specified selecotor
        selector: '.prev-selector'  // specified selector to turn the next page
      },
      gap: 0                        // gap between top and the assigned block
    }
  });
```

### Methods
#### next
It provides next page turning. It will trigger `turnNext` event in `$container`.

#### prev
It provides prev page turning. It will trigger `turnPrev` event in `$container`.

