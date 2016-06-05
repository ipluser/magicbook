;(function (global, $, Magicbook) {  // eslint-disable-line

  var globalLocation = global.location;
  var magicbookProto = Magicbook.potion;
  var addClassName = Magicbook.addClassName;

  var PREFIX_CLASS = 'magicbook-agilities-';
  var COMMON_BUTTON_CLASS_NAME = PREFIX_CLASS + 'button';

  var defaults = {
    scrollTop: true,
    turnPage: true
  };

  function formatPageData($pages, homeUrl) {
    var len = $pages.length;
    var index;
    var pages = [];

    for (index = 0; index < len; index++) {
      var $page = $($pages[index]);
      var key =  Magicbook.randomString() + index;
      var url = $page.attr('href') || '';

      $page.attr('data-pageKey', key);
      pages.push({
        key: key,
        url: (url === '#') && homeUrl || url.replace('#', '')
      });
    }

    return pages;
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

    var $scrollToTop = selector && $(selector) || $('<button>' + config.label + '</button>');

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
   *   selector: navigator's text
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
      selector: 'ul li > *:first-child',
      prev: {
        label: 'prev'
      },
      next: {
        label: 'next'
      },
      gap: 0
    };

    var self = this;
    var $container = self.$container;
    var $contentWrap = self.$contentWrap;
    var homeUrl = self.config.homeUrl;
    var config = $.extend({}, defaultsCfg, cfg);
    var prevSelector = config.prev.selector;
    var prevLabel = config.prev.label;
    var nextSelector = config.next.selector;
    var nextLabel = config.next.label;
    var gap = config.gap;

    function navigatorCallbackSuccessForInitTurnPage() {
      var $pages = $(config.selector);
      var pagesData = formatPageData($pages, homeUrl);
      var pagesLen = pagesData.length;

      if (!pagesLen) {
        return;
      }

      var $prev = prevSelector && $(prevSelector) || $('<button>' + prevLabel + '</button>');
      var $next = nextSelector && $(nextSelector) || $('<button>' + nextLabel + '</button>');

      addClassName($pages, PREFIX_CLASS + 'turn-page__text');
      addClassName($prev, PREFIX_CLASS + 'turn-page__prev');
      addClassName($prev, COMMON_BUTTON_CLASS_NAME);
      addClassName($next, PREFIX_CLASS + 'turn-page__next');
      addClassName($next, COMMON_BUTTON_CLASS_NAME);

      function validIndex(index) {
        return index >= 0 && index < pagesLen;
      }

      function pageIndexOf(page) {
        var _page = page || '';

        for (var index = 0; index < pagesLen; index++) {
          var pageData = pagesData[index];

          if ((_page.url && pageData.url === _page.url)
              || (_page.key && pageData.key === _page.key)) {
            return index;
          }
        }
        return -1;
      }

      function resetSelectedPage(page) {
        $pages.removeClass('selected');
        var $page = $pages.filter('[data-pageKey="' + page.key + '"]');
        addClassName($page.length && $page || $('a[href="#"]'), 'selected');
      }

      function reset() {
        var url = self.getCurrentDocUrl();
        var index = pageIndexOf({ url: url });

        if (!validIndex(index)) {
          return;
        }

        (index === 0) && $prev.hide() || $prev.show();
        (index === pagesLen - 1) && $next.hide() || $next.show();

        resetSelectedPage(pagesData[index]);
      }

      function turnPage(type) {
        var _type = type || 'next';
        var $page = $pages.filter('.selected');
        var curIndex = pageIndexOf({ key: $page.attr('data-pageKey') });

        if (curIndex === -1) {
          return;
        }

        (_type === 'next' && curIndex++) || (_type === 'prev' && curIndex--);

        if (!validIndex(curIndex)) {
          return;
        }

        var nextPage = pagesData[curIndex];
        var nextUrl = nextPage.url;

        if (nextUrl) {
          globalLocation.hash = nextUrl;
        }

        resetSelectedPage(nextPage);
      }

      function prev() {
        turnPage('prev');
        $container.trigger('turnPrev');
      }

      function next() {
        turnPage();
        $container.trigger('turnNext');
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

      magicbookProto.prev = prev;
      magicbookProto.next = next;
    }

    self.config.navigatorCallbackQueue.push({
      success: navigatorCallbackSuccessForInitTurnPage
    });
  }

  magicbookProto.agilities = function agilities(cfg) {
    var self = this;
    var config = $.extend({}, defaults, cfg);

    initScrollTop.call(self, config.scrollTop);
    initTurnPage.call(self, config.turnPage);
  };
})(window, jQuery, Magicbook);  // eslint-disable-line
