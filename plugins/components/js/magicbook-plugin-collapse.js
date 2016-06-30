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
  var globalLocation = global.location;
  var addClassName = Magicbook.addClassName;

  var CLASS = 'navigator-collapse';
  var CLASS_CLOSE = CLASS + '--close';
  var CLASS_OPEN = CLASS + '--open';
  var CLASS_TOGGLE = CLASS + '__toggle';
  var ELEMENT_TOGGLE = '<span class="' + CLASS_TOGGLE + '"></span>';

  var defaults = {
    selector: 'ul',
    expand: true
  };

  function collapse(cfg) {
    var config = $.extend({}, defaults, cfg);

    function handle($ul) {
      var $items = $ul.children();
      var len = $items.length;
      var index;

      for (index = 0; index < len; index++) {
        var $item = $($items[index]);
        var $text = $item.children(':first');
        var $children = $item.children('ul');

        if ($children.length) {
          addClassName($item, CLASS);

          $text.after(ELEMENT_TOGGLE);

          !config.expand && $children.hide();
          addClassName($item, config.expand && CLASS_OPEN || CLASS_CLOSE);

          handle($children);
        }
      }
    }

    function toggle($elem, inClosable) {
      var closable = Magicbook.isUndefined(inClosable) ? $elem.hasClass(CLASS_CLOSE) : inClosable;
      var $target = $elem.children('ul');

      $target.length && $elem.removeClass(closable && CLASS_CLOSE || CLASS_OPEN);
      $target.length && addClassName($elem, closable && CLASS_OPEN || CLASS_CLOSE);

      closable && $target.slideDown() || $target.slideUp();
    }

    function expandCurrentNavs($elem) {
      var $targets = $elem.parents('li');
      var len = $targets.length;
      var index = 0;

      while (index < len) {
        toggle($($targets[index++]), true);
      }
    }

    function getNavElementByHash(hash) {
      return $('[href="' + hash + '"]');
    }

    return function navigatorCallbackSuccessForCollapseNavigator() {
      var currentHash = globalLocation.hash;
      var self = this;
      var $navigator = self.$navigator;
      var $navs = $navigator.children(config.selector);
      var len = $navs.length;
      var index;

      addClassName($navs, 'navigator-collapses');
      for (index = 0; index < len; index++) {
        handle($($navs[index]));
      }

      self.$navigatorWrap.on('click', '.navigator-collapse__toggle', function collapseEvent(e) {
        var $currentTarget = $(e.currentTarget);
        var href = $currentTarget.attr('href');
        if (!href || currentHash === href) {
          toggle($(e.currentTarget).parent());
          e.stopPropagation();
        }
      });

      self.$container.on('turnPrev', function turnPrevForCollapse() {
        toggle($navs.find('.navigator-collapse > .selected').parent(), true);
      });

      self.$container.on('turnNext', function turnNextForCollapse() {
        toggle($navs.find('.navigator-collapse > .selected').parent(), true);
      });

      $(global).on('hashchange', function hashchangeForExpand() {
        currentHash = globalLocation.hash;
        expandCurrentNavs(getNavElementByHash(currentHash));
      });

      expandCurrentNavs(getNavElementByHash(currentHash));
    };
  }

  Magicbook.potion.collapseNavigator = function collapseNavigator(cfg) {
    var self = this;
    var navigatorCallbackSuccessForCollapseNavigator = collapse(cfg);

    self.config.navigatorCallbackQueue.push({
      success: navigatorCallbackSuccessForCollapseNavigator
    });
  };
}));
