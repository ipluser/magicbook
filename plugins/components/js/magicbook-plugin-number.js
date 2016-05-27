;(function (global, $, Magicbook) {  // eslint-disable-line

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
        var $link = $item.children('a');
        var $list = $item.children('ul');

        $item.attr('data-number', currentNumber);
        $link.length && $link.prepend(numberHtml) || $item.prepend(numberHtml);

        if ($list.length) {
          numberList($($list));
        }
      }

      index && Magicbook.addClassName($ul, 'navigator-number');
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
})(window, jQuery, Magicbook);  // eslint-disable-line
