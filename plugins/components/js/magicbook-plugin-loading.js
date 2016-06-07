;(function (global, $, Magicbook) {  // eslint-disable-line

  var defaults = {
    navigator: {
      selector: '',
      text: 'loading...'
    },
    content: {
      selector: '',
      text: 'loading...'
    }
  };

  function animate(cfg) {
    var options = $.extend({}, defaults, cfg);
    var navigatorLoadingSelector = options.navigator.selector;
    var navigatorLoadingText = options.navigator.text;
    var contentLoadingSelector = options.content.selector;
    var contentLoadingText = options.content.text;
    var self = this;
    var config =  self.config;

    function initLoading() {
      var $navigatorLoading = (navigatorLoadingSelector && $(navigatorLoadingSelector)) ||
          $('<div>' + navigatorLoadingText + '</div>');
      var $contentLoading = (contentLoadingSelector && $(contentLoadingSelector)) ||
          $('<div>' + contentLoadingText + '</div>');

      Magicbook.addClassName($navigatorLoading, 'loading');
      Magicbook.addClassName($navigatorLoading, 'navigator-loading');
      Magicbook.addClassName($contentLoading, 'loading');
      Magicbook.addClassName($contentLoading, 'content-loading');

      self.$navigatorWrap.append($navigatorLoading);
      self.$contentWrap.append($contentLoading);

      self.$navigatorLoading = $navigatorLoading;
      self.$contentLoading = $contentLoading;
    }

    self.handler('initLoading', initLoading, { priority: 0 });

    config.navigatorCallbackQueue.unshift({
      prepare: function prepareForLoading() {
        var _this = this;
        _this.$navigator.empty();
        _this.$navigatorLoading.show();
      },
      finally: function finallyForLoading() {
        this.$navigatorLoading.hide();
      }
    });

    config.routeCallbackQueue.unshift({
      prepare: function prepareForLoading() {
        var _this = this;
        _this.$content.empty();
        _this.$contentLoading.show();
      },
      finally: function finallyForLoading() {
        this.$contentLoading.hide();
      }
    });
  }

  Magicbook.potion.animateLoading = animate;
})(window, jQuery, Magicbook);  // eslint-disable-line
