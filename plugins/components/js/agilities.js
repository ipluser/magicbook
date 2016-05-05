;(function (global, $, Magicbook) {  // eslint-disable-line

  var PREFIX_CLASS = 'magicbook-agilities-';
  var COMMON_BUTTON_CLASS_NAME = PREFIX_CLASS + 'button';

  var globalLocation = global.location;

  var defaults = {
    scrollTop: true,
    flip: true
  };

  Magicbook.potion.agilities = function agilities(cfg) {
    var self = this;
    var config = $.extend({}, defaults, cfg);

    drawScrollTop.call(self, config.scrollTop);
    drawFlip.call(self, config.flip);
  };

  /**
   * draw button of scroll to top
   * @param {Object|boolean} cfg => true/false or {
   *   selector: user customize scrollToTop button
   *   label: label of button
   * }
   * @returns {void}
   */
  function drawScrollTop(cfg) {
    if (!cfg) {
      return;
    }

    var defaultsCfg = {
      label: 'scrollToTop'
    };

    var self = this;
    var config = $.extend({}, defaultsCfg, cfg);
    var selector = config.selector;

    var $scrollToTop = selector && $(selector) || $('<div>' + config.label + '</div>');
    var $body = $('body');
    var $navigatorWrap = self.$navigatorWrap;
    var $contentWrap = self.$contentWrap;

    var scrollToTop = Magicbook.potion.scrollToTop = function scrollToTop(toContent) {
      $contentWrap.scrollTop() !== 0 && $contentWrap.scrollTop(0) || $body.scrollTop(toContent && $navigatorWrap.height() || 0);
    };

    Magicbook.addClassName($scrollToTop, PREFIX_CLASS + 'scroll-top');
    Magicbook.addClassName($scrollToTop, COMMON_BUTTON_CLASS_NAME);

    $scrollToTop.on('click', function scrollTopClickEvent() {
      scrollToTop();
    });

    self.config.routeCallbackQueue.push({
      success: function routeCallbackForScrollToContent() {
        scrollToTop(true);
      }
    });

    !selector && self.$container.append($scrollToTop);
  }

  /**
   * draw button of flip
   * @param {Object|boolean} cfg => true/false or {
   *   prev: {
   *     label: label of prev button
   *     selector: user customize prev button
   *   },
   *   next: {
   *     label: label of next button
   *     selector: user customize next button
   *   }
   * }
   * @returns {void}
   */
  function drawFlip(cfg) {
    if (!cfg) {
      return;
    }

    var defaultsCfg = {
      prev: {
        label: 'prev'
      },
      next: {
        label: 'next'
      }
    };

    var self = this;
    var config = $.extend({}, defaults, defaultsCfg);
    var homeUrl = self.config.homeUrl;
    var prevSelector = config.prev.selector;
    var prevLabel = config.prev.label;
    var nextSelector = config.next.selector;
    var nextLabel = config.next.label;

    function navigatorCallbackSuccessForDrawFlip() {
      var $navigators = $('a[href^=#]');
      var urls = getNavigatorUrls($navigators, homeUrl);
      var urlsLength = urls.length;

      if (!urlsLength) {
        return;
      }

      var $prev = prevSelector && $(prevSelector) || $('<div>' + prevLabel + '</div>');
      var $next = nextSelector && $(nextSelector) || $('<div>' + nextLabel + '</div>');

      function toggleFlip(curIndex) {
        if (curIndex < 0 || curIndex >= urlsLength) {
          return;
        }

        (curIndex !== 0) && $prev.show() || $prev.hide();
        (curIndex !== urlsLength - 1) && $next.show() || $next.hide();
      }

      function flip(type) {
        var _type = type || 'next';
        var curUrl = getCurrentUrl(homeUrl);
        var curIndex = urls.indexOf(curUrl);

        if (curIndex === -1) {
          return;
        }

        (_type === 'next' && curIndex++) || (_type === 'prev' && curIndex--);

        if (_type !== 'initialize' && curIndex >= 0 && curIndex < urlsLength) {
          globalLocation.hash = urls[curIndex] || '';
        }

        toggleFlip(curIndex);
      }

      var prev = Magicbook.potion.prev = function prev() {
        flip('prev');
      };

      var next = Magicbook.potion.next = function next() {
        flip();
      };

      Magicbook.addClassName($prev, PREFIX_CLASS + 'prev');
      Magicbook.addClassName($prev, COMMON_BUTTON_CLASS_NAME);
      Magicbook.addClassName($next, PREFIX_CLASS + 'next');
      Magicbook.addClassName($next, COMMON_BUTTON_CLASS_NAME);

      $prev.on('click', function prevClickEvent() {
        prev();
      });

      $next.on('click', function nextClickEvent() {
        next();
      });

      if (!prevSelector || !nextSelector) {
        var $flip = $('<div></div>');

        Magicbook.addClassName($flip, PREFIX_CLASS + 'flip-wrap');
        !prevSelector && $flip.append($prev);
        !nextSelector && $flip.append($next);

        self.$container.append($flip);
      }

      $navigators.on('click', function navigatorClickEvent() {
        var url = ($(this).attr('href') || '').replace(/#/, '') || homeUrl;

        toggleFlip(urls.indexOf(url));
        globalLocation.hash = url;
      });

      flip('initialize');
    }

    self.config.navigatorCallbackQueue.push({
      success: navigatorCallbackSuccessForDrawFlip
    });
  }

  function getNavigatorUrls($navigators, defaultUrl) {
    var index;
    var len;
    var urls = [];

    for (index = 0, len = $navigators.length; index < len; index++) {
      var $navigator = $($navigators[index]);
      var url = $navigator.attr('href').replace(/^#/, '') || defaultUrl;
      urls.push(url);
    }

    return urls;
  }

  function getCurrentUrl(defaultUrl) {
    var url = globalLocation.hash || defaultUrl;

    return url.replace(/^#/, '');
  }
})(window, jQuery, Magicbook);  // eslint-disable-line
