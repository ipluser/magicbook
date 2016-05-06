Markdown docs system, example below:

### Import Dependencies
```html
  <link rel="stylesheet" type="text/css" href="public/css/prism-okaidia.css" />
  <link rel="stylesheet" type="text/css" href="dist/magicbook.min.css" />
  <link rel="stylesheet" type="text/css" href="plugins/markdown/css/awesome.min.css" />

  <script src="public/js/jquery-1.11.0.min.js"></script>
  <script src="public/js/marked.js"></script>
  <script src="public/js/prism.js"></script>
  <script src="dist/magicbook.min.js"></script>
```

### HTML
```html
  <div class="magicbook-container"></div>
```

### Show
```js
  marked.setOptions({
    langPrefix: 'language-',
    highlight: function (code, lang) {
      return Prism.highlight(code, Prism.languages[lang]);
    }
  });

  Magicbook.potion.parser = marked;

  var routeCallback = {
    success: function routeCallbackSuccessForPrismStyle() {
      var $codes = $('pre > code');
      for (var index in $codes) {
        var $code = $($codes[index]);
        var codeClass = $code.attr('class');

        if (!codeClass) {
          return ;
        }

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

### Awesome factory
Easy to get a markdown instance with [awesome plugins](#public/doc/plugins/markdown/js/awesome.md)

