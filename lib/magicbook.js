;(function (global, $) {  // eslint-disable-line

  var defaults = {
    container: '',
    navigator: '',
    content: '',
    navigatorUrl: 'navigator.md',
    homeUrl: 'README.md',
    baseUrl: '',
    urlArgs: '',
    debug: false,
    navigatorCallback: {},
    routeCallback: {}
  };

  var globalLocation = global.location;
  var objectToString = Object.prototype.toString;

  var Magicbook = global.Magicbook = function Magicbook(cfg) {
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

    function drawNavigator() {
      var navigatorUrl = config.navigatorUrl;
      var callback = config.navigatorCallback;

      if (!navigatorUrl) {
        return;
      }

      $.get(navigatorUrl).success(function success(data) {
        var result = self.parser(data);
        var successCallback = getPropertyByDefaultValue(callback, 'success');

        self.$navigator.empty().append(self.parser(data));

        isFunction(successCallback) && successCallback.call(self, {
          origin: data,
          result: result
        });
      }).fail(function fail(err) {
        var failCallback = getPropertyByDefaultValue(callback, 'fail');

        if (isFunction(failCallback)) {
          failCallback.call(self, err);
          return;
        }

        self.$navigator.empty().append('<div class="magicbook-navigator__error magicbook-error">navigator not found</div>');
      }).always(function always() {
        var finallyCallback = getPropertyByDefaultValue(callback, 'finally');
        isFunction(finallyCallback) && finallyCallback.call(self);
      });
    }

    self.handlers = {};
    self.handlersCount = 0;

    self.handler('drawNavigator', drawNavigator, {
      priority: 1
    });

    self.handler('drawContent', function drawContenthandler() {
      self.route('', self.config.routeCallback);
    }, {
      priority: 1
    });

    global.onhashchange = function onhashchange() {
      self.route(globalLocation.hash, self.config.routeCallback);
    };
  };

  var proto = Magicbook.prototype;

  proto.parser = function parser(data) {
    return data;
  };

  proto.route = function route(url, callback) {
    var self = this;
    var _url = (isString(url) && url) || globalLocation.hash || self.config.homeUrl;

    _url = self.normalizeUrl(_url);
    self.render(_url, callback);
  };

  proto.render = function render(url, callback) {
    var self = this;

    if (!url) {
      return;
    }

    $.get(url).success(function success(data) {
      var result = self.parser(data);
      var successCallback = getPropertyByDefaultValue(callback, 'success');

      self.$content.empty().append(result);

      isFunction(successCallback) && successCallback.call(self, {
        origin: data,
        result: result
      });
    }).fail(function fail(err) {
      var failCallback = getPropertyByDefaultValue(callback, 'fail');

      if (isFunction(failCallback)) {
        failCallback.call(self, err);
        return;
      }

      self.$content.empty().append('<div class="magicbook-content__error magicbook-error">content not found</div>');
    }).always(function always() {
      var finallyCallback = getPropertyByDefaultValue(callback, 'finally');
      isFunction(finallyCallback) && finallyCallback.call(self);
    });
  };

  proto.normalizeUrl = function normalizeUrl(url) {
    var self = this;
    var config = self.config;
    var urlArgs = config.urlArgs;
    var _url = config.baseUrl + url.replace(/^#/, '');

    if (urlArgs && isString(urlArgs)) {
      _url += (_url.indexOf('?') === -1 ? '?' : '&') + urlArgs;
    }

    return _url;
  };

  proto.handler = function handler(name, action, options) {  // eslint-disable-line consistent-return
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
      options: $.extend({priority: 2}, options)
    };

    handlers[name] = cfg;
  };

  proto.show = function show() {
    var self = this;
    var handlers = self.handlers;
    var handlersArray = [];
    var index;
    var len;

    for (var name in handlers) {
      if (!hasOwnProperty(handlers, name)) {
        return;
      }

      var curHandler = handlers[name];
      var curHandlerPriority = curHandler.options.priority;

      for (index = 0, len = handlersArray.length; index < len; index++) {
        var pointer = handlersArray[index];
        var pointerPriority = pointer.options.priority;

        if (curHandlerPriority < pointerPriority
            || (curHandlerPriority === pointerPriority && curHandler.order < pointer.order )) {
          break;
        }
      }

      handlersArray.splice(index, 0, curHandler);
    }

    for (index = 0, len = handlersArray.length; index < len; index++) {
      var curAction = handlersArray[index].action;
      isFunction(curAction) && curAction.call(this);
    }
  };

  function toStringEqual(obj, toStr) {
    return objectToString.call(obj) === toStr;
  }

  function isFunction(fn) {
    return toStringEqual(fn, '[object Function]');
  }

  function isString(s) {
    return toStringEqual(s, '[object String]');
  }

  function getPropertyByDefaultValue(obj, name, defaultValue) {
    return obj && name && obj[name] || defaultValue;
  }

  function hasOwnProperty(obj, key) {
    return {}.hasOwnProperty.call(obj, key);
  }
})(window, jQuery);
