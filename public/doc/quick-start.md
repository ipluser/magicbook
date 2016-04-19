## Quick Start
### Import Dependencies
To use [Magicbook](https://github.com/ipluser/magicbook), you’ll need to make sure both the Magicbook and jQuery scripts are included.
```html
  <link rel="stylesheet" href="public/css/magicbook.css" />
  <script src="public/js/jquery-1.11.0.min.js"></script>
  <script src="lib/magicbook.js"></script>
  <script src="public/js/marked.js"></script>
```

### HTML
```html
  <div class="magicbook-container"></div>
```

### Show
```js
  var book = new Magicbook({
    container: '.magicbook-container',
    navigatorUrl: 'navigator.md',
    homeUrl: 'README.md',
  });
  
  book.potion('parser', marked);
  book.show();
```
