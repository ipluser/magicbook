## Quick Start
An lightweight and scalable docs system for markdown, text or other. Example below:

### Installing
```
bower install magicbookjs
```

or

```
npm install magicbookjs
```

### Import Dependencies
To use **Magicbook**, you’ll need to make sure both the Magicbook and jQuery scripts are included.
```html
  <link rel="stylesheet" type="text/css" href="dist/magicbook.min.css" />
  <script src="public/js/jquery-1.11.0.min.js"></script>
  <script src="dist/magicbook.min.js"></script>
```

### HTML
```html
  <div class="magicbook-container"></div>
```

### Show
```js
  var book = new Magicbook({
    container: '.magicbook-container',
    homeUrl: 'README.md',
    navigatorUrl: 'navigator.md'
  });

  book.show();
```
