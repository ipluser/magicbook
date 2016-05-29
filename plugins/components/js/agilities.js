;(function (global, $, Magicbook) {  // eslint-disable-line

  var PREFIX_CLASS = 'magicbook-agilities-';
  var COMMON_BUTTON_CLASS_NAME = PREFIX_CLASS + 'button';

  var globalLocation = global.location;

  var addClassName = Magicbook.addClassName;

  var defaults = {
    scrollTop: true,
    turnPage: true
  };

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

  /**
   * initialize scrollTop
   * @param {Object|boolean} cfg => true/false or {
   *   selector: user customize scrollToTop button
   *   label: label of button
   * }
   * @returns {void}
   */
  function initScrollTop(cfg) {
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

    addClassName($scrollToTop, PREFIX_CLASS + 'scroll-top');
    addClassName($scrollToTop, COMMON_BUTTON_CLASS_NAME);

    $scrollToTop.on('click', function scrollTopClickEvent() {
      self.moveTo();
    });

    !selector && self.$container.append($scrollToTop);
  }

  /**
   * initialize turnPage
   * @param {Object|boolean} cfg => true/false or {
   *   prev: {
   *     label: label of prev button
   *     selector: user customize prev button
   *   },
   *   next: {
   *     label: label of next button
   *     selector: user customize next button
   *   },
   *   gap: gap between top and content
   * }
   * @returns {void}
   */
  function initTurnPage(cfg) {
    if (!cfg) {
      return;
    }

    var defaultsCfg = {
      prev: {
        label: 'prev'
      },
      next: {
        label: 'next'
      },
      gap: 0
    };

    var self = this;
    var $contentWrap = self.$contentWrap;
    var config = $.extend({}, defaultsCfg, cfg);
    var homeUrl = self.config.homeUrl;
    var prevSelector = config.prev.selector;
    var prevLabel = config.prev.label;
    var nextSelector = config.next.selector;
    var nextLabel = config.next.label;
    var gap = config.gap;

    function navigatorCallbackSuccessForInitTurnPage() {
      var $navigators = $('a[href^=#]');
      var navUrls = getNavigatorUrls($navigators, homeUrl);
      var navUrlsLength = navUrls.length;

      if (!navUrlsLength) {
        return;
      }

      var $prev = prevSelector && $(prevSelector) || $('<div>' + prevLabel + '</div>');
      var $next = nextSelector && $(nextSelector) || $('<div>' + nextLabel + '</div>');

      addClassName($prev, PREFIX_CLASS + 'turn-page__prev');
      addClassName($prev, COMMON_BUTTON_CLASS_NAME);
      addClassName($next, PREFIX_CLASS + 'turn-page__next');
      addClassName($next, COMMON_BUTTON_CLASS_NAME);

      function validIndex(index) {
        return index >= 0 && index < navUrlsLength;
      }

      function reset() {
        var url = self.getCurrentDocUrl();
        var index = navUrls.indexOf(url);

        if (!validIndex(index)) {
          return;
        }

        (index === 0) && $prev.hide() || $prev.show();
        (index === navUrlsLength - 1) && $next.hide() || $next.show();

        $navigators.removeClass('selected');
        var $nav = $('a[href="#' + url + '"]');
        addClassName($nav.length && $nav || $('a[href="#"]'), 'selected');
      }

      function turnPage(type) {
        var _type = type || 'next';
        var curUrl = self.getCurrentDocUrl();
        var curIndex = navUrls.indexOf(curUrl);

        if (curIndex === -1) {
          return;
        }

        (_type === 'next' && curIndex++) || (_type === 'prev' && curIndex--);

        if (!validIndex(curIndex)) {
          return;
        }

        globalLocation.hash = navUrls[curIndex];
      }

      function prev() {
        turnPage('prev');
      }

      function next() {
        turnPage();
      }

      $prev.on('click', prev);
      $next.on('click', next);

      if (!prevSelector || !nextSelector) {
        var $turnPage = $('<div></div>');

        addClassName($turnPage, PREFIX_CLASS + 'turn-page-wrap');
        !prevSelector && $turnPage.append($prev);
        !nextSelector && $turnPage.append($next);

        self.$container.append($turnPage);
      }

      reset();
      self.moveTo({ selector: $contentWrap, gap: gap });

      $(global).on('hashchange', function hashchangeForReset() {
        reset();
        self.moveTo({ selector: $contentWrap, gap: gap });
      });

      Magicbook.potion.prev = prev;
      Magicbook.potion.next = next;
    }

    self.config.navigatorCallbackQueue.push({
      success: navigatorCallbackSuccessForInitTurnPage
    });
  }

  Magicbook.potion.agilities = function agilities(cfg) {
    var self = this;
    var config = $.extend({}, defaults, cfg);

    initScrollTop.call(self, config.scrollTop);
    initTurnPage.call(self, config.turnPage);
  };
})(window, jQuery, Magicbook);  // eslint-disable-line
