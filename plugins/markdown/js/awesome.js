;(function (global, $, marked, Prism, Magicbook) {  // eslint-disable-line

  function normalizeLang(lang) {
    if (!lang || !Prism.languages[lang]) {
      return 'bash'; // not import bash js
    }

    return lang;
  }

  function routeCallbackSuccessForPrismStyle() {
    var $codes = $('pre > code');
    var index;
    var len;

    for (index = 0, len = $codes.length; index < len; index++) {
      var $code = $($codes[index]);
      var codeClass = $code.attr('class') || 'language-bash';

      Magicbook.addClassName($code, codeClass);
      Magicbook.addClassName($code.parent(), codeClass);
    }
  }

  marked.setOptions({
    langPrefix: 'language-',
    highlight: function highlight(code, lang) {
      return Prism.highlight(code, Prism.languages[normalizeLang(lang)]);
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
})(window, jQuery, marked, Prism, Magicbook);  // eslint-disable-line
