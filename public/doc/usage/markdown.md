Markdown docs system, example below:

### Import Dependencies
```html
  <link rel="stylesheet" type="text/css" href="dist/magicbook.min.css" />
  <link rel="stylesheet" type="text/css" href="public/css/prism-okaidia.css" />
  <script src="public/js/jquery-1.11.0.min.js"></script>
  <script src="dist/magicbook.min.js"></script>
  <script src="public/js/marked.js"></script>
  <script src="public/js/prism.js"></script>
```

### HTML
```html
  <div class="magicbook-container"></div>
```

### Show
```js
  marked.setOptions({
    highlight: function (code, lang) {
      return Prism.highlight(code, Prism.languages[lang]);
    }
  });

  Magicbook.prototype.parser = marked;

  var routeCallback = {
    success: function routeCallbackSuccessForPrismStyle() {
      var $codes = $('pre > code');
      for (var index in $codes) {
        var $code = $($codes[index]);
        var codeClass = $code.attr('class');

        if (!codeClass) {
          return ;
        }

        codeClass = codeClass.replace(/^|\s+lang\-/g, ' language-');
        $code.attr('class', codeClass);
        $code.parent().addClass(codeClass);
      }
    }
  };

  var book = new Magicbook({
    container: '.magicbook-container',
    homeUrl: 'public/doc/quick-start.md',
    urlArgs: 'ver=0.5.0',
    routeCallbackQueue: routeCallback
  });

  book.show();
```
