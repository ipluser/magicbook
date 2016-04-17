;
(function (global, $) {

  var defaults = {
    container: '',
    navigator: '',
    content: '',
    navigatorUrl: '',
    homeUrl: '',
    baseUrl: '',
    waitSeconds: 7,
    urlArgs: '',
    map: {},
    flip: true,
    keys: true,
    debug: true,
  };

  var global_location = global.location;

  var magicbook = global.magicbook = function (cfg) {
    var self = this;
    var config = self.config = $.extend({}, defaults, cfg);

    var $container = self.$container = config.container && $(config.container)
        || $('<div class="magicbook-container"></div>');
    var $navigator = self.$navigator = config.navigator && $(config.navigator)
        || $('<div class="magicbook-navigator"></div>');
    var $content = self.$content = config.content && $(config.content)
        || $('<div class="magicbook-content"></div>');

    !config.navigator && $container.append($navigator);
    !config.content && $container.append($content);
    !config.container && $('body').append($container);

    global.onhashchange = function () {
      self.route(global_location.hash);
    };
  };

  var proto = magicbook.prototype;

  proto.show = function () {
    var self = this;

    initNavigator(self);

    self.route();
  };

  proto.potion = function (name, fn) {
    if (!name) {
      return;
    }

    proto[name] = fn;
  };

  proto.route = function (url) {
    var self = this;

    url = url || global_location.hash || self.config.homeUrl;

    url = self.normalizeUrl(url);
    self.render(url);
  };

  proto.normalizeUrl = function (url) {
    var self = this;
    var config = self.config;
    var urlArgs = config.urlArgs;

    url = url.replace(/^#/, '');

    if (urlArgs && typeof urlArgs === 'string') {
      url += (url.indexOf('?') === -1 ? '?' : '&') + urlArgs;
    }

    return url;
  };

  proto.render = function (url) {
    var self = this;

    if (!url) {
      return;
    }

    $.get(url).success(function (data) {
      self.$content.empty()
          .append(self.parse(data));
    }).fail(function () {
      self.$content.empty()
          .append('<div class="magicbook-content__error magicbook-error">content not found</div>')
    });
  };

  proto.parse = function (data) {
    return data;
  };

  function initNavigator(that) {
    var config = that.config;
    var navigatorUrl = config.navigatorUrl;

    if (!navigatorUrl) {
      return;
    }

    $.get(navigatorUrl).success(function (data) {
      that.$navigator.empty()
          .append(that.parse(data));
    }).fail(function () {
      that.$navigator.empty()
          .append('<div class="magicbook-navigator__error magicbook-error">navigator not found</div>')
    });
  };

})(window, jQuery);