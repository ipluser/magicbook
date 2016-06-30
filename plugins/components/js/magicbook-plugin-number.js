/* eslint-disable */
(function(global, factory) {
  if (!global.document) {
    throw new Error('magicbook requires a window with a document');
  }

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory(require('jquery'), require('magicbookjs'), global);
  } else if (typeof define === 'function' && define.amd) {
    define(['jquery', 'magicbook'], factory($, Magicbook, global));
  } else {
    factory(global.jQuery, Magicbook, global);
  }
}(typeof window !== 'undefined' ? window : this, function($, Magicbook, global) {
  /* eslint-enable */
  var addClassName = Magicbook.addClassName;

  var defaults = {
    selector: 'ul'
  };

  function numbering(cfg) {
    var config = $.extend({}, defaults, cfg);

    function numberList($ul) {
      var $items = $ul.children();
      var len = $items.length;
      var startNumber = '1';
      var index;

      for (index = 0; index < len; index++) {
        var $item = $($items[index]);
        var parentNumber = $item.parent().parent('li').attr('data-number');
        var currentNumber = (parentNumber ? (parentNumber + '.') : '') + startNumber++;
        var numberHtml = '<b>' + currentNumber + '. </b>';
        var $text = $item.children(':first');
        var $list = $item.children('ul');

        addClassName($text, 'navigator-number__text');
        $text.prepend(numberHtml);
        $item.attr('data-number', currentNumber);

        if ($list.length) {
          numberList($list);
        }
      }

      index && addClassName($ul, 'navigator-number');
    }

    return function navigatorCallbackSucessForNumberNavigator() {
      var self = this;
      var $navigator = self.$navigator;
      var $navs = $navigator.children(config.selector);
      var len = $navs.length;
      var index;

      for (index = 0; index < len; index++) {
        numberList($($navs[index]));
      }
    };
  }

  Magicbook.potion.numberNavigator = function numberNavigator(cfg) {
    var self = this;
    var navigatorCallbackSuccessForNumberNavigator = numbering(cfg);

    self.config.navigatorCallbackQueue.push({
      success: navigatorCallbackSuccessForNumberNavigator
    });
  };
}));
