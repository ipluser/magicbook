;
(function (global, $) {

  var defaults = {
    container: '',
    navigator: '',
    content: '',
    navigatorUrl: '',
    homeUrl: 'README.md',
    baseUrl: '',
    urlArgs: '',
    flip: true,
    keys: true,
    debug: true,
    navigatorCallback: {},
    routeCallback: {},
  };

  var global_location = global.location;
  var object_toString = Object.prototype.toString;

  var Magicbook = global.Magicbook = function (cfg) {
    var self = this;
    var config = self.config = $.extend({}, defaults, cfg);

    var $container = self.$container = config.container && $(config.container)
        || $('<div class="magicbook-container"></div>');
    var $navigatorWrap = self.$navigatorWrap = $('<div class="magicbook-navigator-wrap"></div>');
    var $navigator = self.$navigator = config.navigator && $(config.navigator)
        || $('<div class="magicbook-navigator"></div>');
    var $contentWrap = self.$contentWrap = $('<div class="magicbook-content-wrap"></div>');
    var $content = self.$content = config.content && $(config.content)
        || $('<div class="magicbook-content"></div>');

    !config.navigator && $navigatorWrap.append($navigator);
    !config.content && $contentWrap.append($content);
    !config.container && $('body').append($container);
    $container.append($navigatorWrap).append($contentWrap);

    self.handlers = {};
    self.handlersCount = 0;

    self.handler('drawNavigator', self.drawNavigator, {
      level: 1,
    });

    self.handler('drawFlip', self.drawFlip, {
      level: 1,
    });

    self.handler('drawContent', function () {
      self.route('', self.config.routeCallback);
    }, {
      level: 1,
    });

    global.onhashchange = function () {
      self.route(global_location.hash, self.config.routeCallback);
    };
  };

  var proto = Magicbook.prototype;
  proto.handler = function (name, action, options) {
    var self = this;
    var handlers = self.handlers;

    if (name && isString(name) && !action && !options) {
      return handlers[name];
    }

    var oldCfg = handlers[name];
    var cfg = {
      order: oldCfg && oldCfg.order || self.handlersCount++,
      name: name,
      action: action,
      options: options,
    };

    handlers[name] = cfg;
  };

  proto.execute = function () {
    var self = this;
    var handlers = self.handlers;
    var handlersArray = [];

    for (var name in handlers) {
      var curHandler = handlers[name];
      var curHandlerLevel = curHandler.options.level;

      for (var index = 0, len = handlersArray.length; index < len; index++) {
        var pointer = handlersArray[index];
        var pointerLevel = pointer.options.level;

        if (curHandlerLevel < pointerLevel
            || (curHandlerLevel == pointerLevel && curHandler.order < pointer.order )) {
          break;
        }
      }

      handlersArray.splice(index, 0, curHandler);
    }

    for (var index in handlersArray) {
      handlersArray[index].action.call(this);
    }
  };

  proto.parser = function (data) {
    return data;
  };

  proto.drawNavigator = function () {
    var self = this;
    var config = self.config;
    var navigatorUrl = config.navigatorUrl;
    var callback = config.navigatorCallback;

    if (!navigatorUrl) {
      return;
    }

    $.get(navigatorUrl).success(function (data) {
      var result = self.parser(data);

      self.$navigator.empty().append(self.parser(data));

      callback && callback.success && callback.success.call(self, {
        origin: data,
        result: result,
      });
    }).fail(function (err) {
      if (callback && callback.fail) {
        callback.fail.call(self, err);
        return;
      }

      self.$navigator.empty().append('<div class="magicbook-navigator__error magicbook-error">navigator not found</div>')
    }).always(function () {
      callback && callback.finally && callback.finally.call(self);
    });
  };

  proto.drawFlip = function () {
    var self = this;

    if (!self.flip) {
      return;
    }

    var $flip = $('<div class="magicbook-flip"></div>');
    var $pre = $('<button class="magicbook-flip__pre magicbook-btn">pre</button>');
    var $next = $('<button class="magicbook-flip__next magicbook-btn">next</button>');

    self.$contentWrap.append($flip.append($pre).append($next));
  };

  proto.route = function (url, callback) {
    var self = this;

    url = (isString(url) && url) || global_location.hash || self.config.homeUrl;

    url = self.normalizeUrl(url);
    self.render(url, callback);
  };

  proto.normalizeUrl = function (url) {
    var self = this;
    var config = self.config;
    var urlArgs = config.urlArgs;

    url = url.replace(/^#/, '');

    if (urlArgs && isString(urlArgs)) {
      url += (url.indexOf('?') === -1 ? '?' : '&') + urlArgs;
    }

    return url;
  };

  proto.render = function (url, callback) {
    var self = this;

    if (!url) {
      return;
    }

    $.get(url).success(function (data) {
      var result = self.parser(data);

      self.$content.empty().append(result);

      callback && callback.success && callback.success.call(self, {
        origin: data,
        result: result,
      });
    }).fail(function (err) {
      if (callback && callback.fail) {
        callback.fail.call(self, err);
        return;
      }

      self.$content.empty().append('<div class="magicbook-content__error magicbook-error">content not found</div>')
    }).always(function () {
      callback && callback.finally && callback.finally.call(self);
    });
  };

  proto.show = function () {
    var self = this;

    self.execute();
  };

  proto.potion = function (name, fn) {
    if (!name) {
      return;
    }

    if (name && isString(name) && !fn) {
      return proto[name];
    }

    proto[name] = fn;
  };

  function isFunction(fn) {
    return toStringEqual(fn, '[object Function]');
  };

  function isString(s) {
    return toStringEqual(s, '[object String]');
  };

  function toStringEqual(obj, toStr) {
    return object_toString.call(obj) === toStr;
  };

})(window, jQuery);