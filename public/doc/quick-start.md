## Quick Start
### Import Dependencies
To use [Magicbook](https://github.com/ipluser/magicbook), you’ll need to make sure both the Magicbook and jQuery scripts are included.
```html
  <link rel="stylesheet" type="text/css" href="public/css/magicbook.css" />
  <link rel="stylesheet" type="text/css" href="public/css/prism-okaidia.css" />
  <script src="public/js/jquery-1.11.0.min.js"></script>
  <script src="lib/magicbook.js"></script>
  <script src="public/js/marked.js"></script>
  <script src="public/js/prism.js"></script>
```

### HTML
```html
  <div class="magicbook-container"></div>
```

### Show
```js
  var routeCallback = {
    success: function (data) {
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
    navigatorUrl: 'navigator.md',
    urlArgs: 'ver=0.4.0',
    routeCallback: routeCallback,
  });

  marked.setOptions({
    highlight: function (code, lang) {
      return Prism.highlight(code, Prism.languages[lang]);
    }
  });

  book.potion('parser', marked);
  book.show();
```
