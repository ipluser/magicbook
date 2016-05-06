## agilities.js
The **agilities** provides some infrastructure that includes **scroll to top**, **flip**, etc.

### usage
#### Import Dependencies
To use agilities, you’ll need to make sure `magicbook` are included.
```html
  <link rel="stylesheet" type="text/css" href="plugins/components/css/agilities.min.css" />

  <script src="plugins/components/js/agilities.min.js"></script>
```

#### To use
```js
  {magicbook instance}.agilities({
    scrollTop: true,
    flip: true
  });

  // or

  {magicbook instance}.agilities();
```

### configuration
#### flip
It provides flip prev/next function. 'flip' default `true`, you also specify `true/false`, `prev` or `next` property.
Example below:

```js
  {magicbook instance}.agilities({
    flip: {
      prev: {
        label: 'prev'               // specified name of prev button if not specified selecotor
        selector: '.prev-selector'  // specified selector to flip previous
      },
      next: {
        label: 'next'               // specified name of next button if not specified selecotor
        selector: '.prev-selector'  // specified selector to flip next
      }
    }
  });
```

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

### methods
#### next
It provides next page turning.

#### prev
It provides prev page turning.

#### scrollToTop
It provides scroll to top.

##### parameters
| name      | description      |
|-----------|------------------|
| toContent | `boolean` whether the scroll to content's top when pixel of screen < `768px` |

