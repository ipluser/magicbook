## awesome.js
A markdown factory named awesome that consist of magicbook, marked, prism, etc.

### Import Dependencies
```html
  <link rel="stylesheet" type="text/css" href="public/css/prism-okaidia.css" />
  <link rel="stylesheet" type="text/css" href="dist/magicbook.min.css" />
  <link rel="stylesheet" type="text/css" href="plugins/markdown/css/awesome.min.css" />
  <link rel="stylesheet" type="text/css" href="plugins/components/css/agilities.min.css" />

  <script src="public/js/jquery-1.11.0.min.js"></script>
  <script src="public/js/marked.js"></script>
  <script src="public/js/prism.js"></script>
  <script src="public/js/prism-bash.min.js"></script>
  <script src="dist/magicbook.min.js"></script>
  <script src="plugins/components/js/agilities.min.js"></script>
  <script src="plugins/markdown/js/awesome.min.js"></script>
```

### To use
```js
  var book = Magicbook.markdown('awesome', {
    homeUrl: 'public/doc/quick-start.md',
    urlArgs: 'ver=0.7.0'
  });

  book.agilities();
  book.show();
```
