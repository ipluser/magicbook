;(function (global, $, marked, Prism, Magicbook) {  // eslint-disable-line

  marked.setOptions({
    langPrefix: 'language-',
    highlight: function highlight(code, lang) {
      return Prism.highlight(code, Prism.languages[lang]);
    }
  });

  Magicbook.potion.parser = marked;
  Magicbook.customizeMarkdown('awesome', function MarkdownAwesomeFactory(cfg) {
    var routeCallbackQueue = Magicbook.parseArray(cfg.routeCallbackQueue);
    routeCallbackQueue.push({
      success: routeCallbackSuccessForPrismStyle
    });
    cfg.routeCallbackQueue = routeCallbackQueue;

    return new Magicbook(cfg);
  });

  function routeCallbackSuccessForPrismStyle() {
    var $codes = $('pre > code');
    var index;
    var len;

    for (index = 0, len = $codes.length; index < len; index++) {
      var $code = $($codes[index]);
      var codeClass = $code.attr('class');

      if (!codeClass) {
        return;
      }

      $code.parent().addClass(codeClass);
    }
  }
})(window, jQuery, marked, Prism, Magicbook);  // eslint-disable-line
