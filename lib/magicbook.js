;
(function (global, $) {

  var defaults = {
    container: '',
    navigator: '',
    content: '',
    navigatorUrl: '',
    homeUrl: '',
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
    var $navigatorWrap = self.$contentWrap = $('<div class="magicbook-navigator-wrap"></div>');
    var $navigator = self.$navigator = config.navigator && $(config.navigator)
        || $('<div class="magicbook-navigator"></div>');
    var $contentWrap = self.$contentWrap = $('<div class="magicbook-content-wrap"></div>');
    var $content = self.$content = config.content && $(config.content)
        || $('<div class="magicbook-content"></div>');

    !config.navigator && $navigatorWrap.append($navigator);
    !config.content && $contentWrap.append($content);
    !config.container && $('body').append($container);
    $container.append($navigatorWrap).append($contentWrap);

    self.steps = [];
    self.stepsMap = {};

    self.step('initNavigator', initNavigator, {
      level: '1',
    });

    self.step('initFlip', initFlip, {
      level: '1',
    });

    self.step('initContent', function () {
      self.route('', self.config.routeCallback);
    }, {
      level: '1',
    });

    global.onhashchange = function () {
      self.route(global_location.hash, self.config.routeCallback);
    };
  };


  var magicBookProto = Magicbook.prototype;

  magicBookProto.step = function (name, action, options) {
    var self = this;

    if (name && isString(name) && !action && !options) {
      return self.stepsMap[name];
    }

    var stepCfg = {
      name: name,
      action: action,
      options: options,
    };

    self.stepsMap[name] = stepCfg;
    self.steps.push(stepCfg);
  };

  magicBookProto.show = function () {
    var self = this;
    var steps = self.steps;

    for (var i = 0, len = steps.length; i < len; i++) {
      var action = steps[i].action;
      if (isFunction(action)) {
        action.call(self);
      }
    }
  };

  magicBookProto.potion = function (name, fn) {
    if (!name) {
      return;
    }

    if (name && isString(name) && !fn) {
      return magicBookProto[name];
    }

    magicBookProto[name] = fn;
  };

  magicBookProto.route = function (url, callback) {
    var self = this;

    url = (isString(url) && url) || global_location.hash || self.config.homeUrl;

    url = self.normalizeUrl(url);
    self.render(url, callback);
  };

  magicBookProto.normalizeUrl = function (url) {
    var self = this;
    var config = self.config;
    var urlArgs = config.urlArgs;

    url = url.replace(/^#/, '');

    if (urlArgs && isString(urlArgs)) {
      url += (url.indexOf('?') === -1 ? '?' : '&') + urlArgs;
    }

    return url;
  };

  magicBookProto.render = function (url, callback) {
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
        return ;
      }

      self.$content.empty().append('<div class="magicbook-content__error magicbook-error">content not found</div>')
    }).always(function () {
      callback && callback.finally && callback.finally.call(self);
    });
  };

  magicBookProto.parser = function (data) {
    return data;
  };

  function initNavigator() {
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
        return ;
      }

      self.$navigator.empty().append('<div class="magicbook-navigator__error magicbook-error">navigator not found</div>')
    }).always(function () {
      callback && callback.finally && callback.finally.call(self);
    });
  };

  function initFlip() {
    var self = this;

    if (!self.flip) {
      return ;
    }

    var $flip = $('<div class="magicbook-flip"></div>');
    var $pre = $('<button class="magicbook-flip__pre magicbook-btn">pre</button>');
    var $next = $('<button class="magicbook-flip__next magicbook-btn">next</button>');

    self.$contentWrap.append($flip.append($pre).append($next));
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