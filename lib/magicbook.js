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
    navigatorCallbackQueue: [],
    routeCallbackQueue: []
  };

  var PREFIX_CLASS = 'magicbook-';

  var globalLocation = global.location;
  var objectProto = Object.prototype;
  var objectToString = objectProto.toString;

  var Magicbook = global.Magicbook = function Magicbook(cfg) {
    if (!(this instanceof Magicbook)) {
      return new Magicbook(cfg);
    }

    var self = this;
    var config = self.config = $.extend({}, defaults, cfg);

    initLayout();

    config.navigatorCallbackQueue = parseArray(config.navigatorCallbackQueue);
    config.routeCallbackQueue = parseArray(config.routeCallbackQueue);

    config.navigatorCallbackQueue.unshift({
      success: function navigatorCallbackSuccessForHandleImageNode() {
        callbackForHandleImageNode(self.$navigatorWrap.find('img'));
      }
    });

    config.routeCallbackQueue.unshift({
      success: function navigatorCallbackSuccessForHandleImageNode() {
        callbackForHandleImageNode(self.$contentWrap.find('img'));
      }
    });

    function initLayout() {
      var containerSelector = config.container;
      var navigatorSelector = config.navigator;
      var contentSelector = config.content;
      var $navigatorWrap = $('<div class="magicbook-navigator-wrap"></div>');
      var $contentWrap = $('<div class="magicbook-content-wrap"></div>');
      var $container;
      var $navigator;
      var $content;

      if (!navigatorSelector && !contentSelector) {
        $container = $(containerSelector);

        if (!$container.length) {
          $container = $('<div class="magicbook-container"></div>');
          $('body').prepend($container);
        }

        customizeClassName($container, 'container');

        $navigator = $('<div class="magicbook-navigator"></div>');
        $content = $('<div class="magicbook-content"></div>');

        $navigatorWrap.append($navigator);
        $contentWrap.append($content);
        $container.append($navigatorWrap).append($contentWrap);
      } else {
        if (navigatorSelector) {
          $navigator = $(navigatorSelector);

          if ($navigator.length) {
            customizeClassName($navigator, 'navigator');
            wrapElement($navigator, $navigatorWrap);
          }
        }

        if (contentSelector) {
          $content = $(contentSelector);
          if ($content.length) {
            customizeClassName($content, 'content');
            wrapElement($content, $contentWrap);
          }
        }
      }

      self.$container = $container;
      self.$navigatorWrap = $navigatorWrap;
      self.$contentWrap = $contentWrap;
      self.$navigator = $navigator;
      self.$content = $content;
    }

    function callbackForHandleImageNode($images) {
      var index;
      var len;
      var $image;

      for (index = 0, len = $images.length; index < len; index++) {
        $image = $($images[index]);
        $image.attr('src', self.normalizeImageUrl(global.location.hash || self.config.homeUrl, $image.attr('src')));
      }
    }

    function drawNavigator() {
      var navigatorUrl = self.normalizeUrl(config.navigatorUrl);
      var defaultCallbackQueue = config.navigatorCallbackQueue;

      if (!navigatorUrl) {
        return;
      }

      requestGet(navigatorUrl, {
        success: function drawNavigatorSuccess(data) {
          var result = self.parser(data);
          self.$navigator && self.$navigator.empty().append(self.parser(data));

          executeCallbackQueue(defaultCallbackQueue, 'success', self, [{
            origin: data,
            result: result
          }]);
        },
        fail: function drawNavigatorFail(err) {
          if (executeCallbackQueue(defaultCallbackQueue, 'fail', self, [err])) {
            return;
          }

          self.$navigator && self.$navigator.empty().append('<div class="magicbook-navigator__error magicbook-error">navigator not found</div>');
        },
        finally: function drawNavigatorFinally() {
          executeCallbackQueue(defaultCallbackQueue, 'finally', self);
        }
      });
    }

    self.handlers = {};
    self.handlersCount = 0;

    self.handler('drawNavigator', drawNavigator, {
      priority: 1
    });

    self.handler('drawContent', function drawContenthandler() {
      self.route();
    }, {
      priority: 1
    });

    global.onhashchange = function onhashchange() {
      self.route(globalLocation.hash);
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
    var defaultCallbackQueue = self.config.routeCallbackQueue;
    var extraCallbackQueue = parseArray(callback);

    if (!url) {
      return;
    }

    requestGet(url, {
      success: function renderCallbackSuccess(data) {
        var result = self.parser(data);
        self.$content && self.$content.empty().append(result);

        executeCallbackQueue(defaultCallbackQueue, 'success', self, [{
          origin: data,
          result: result
        }]);

        executeCallbackQueue(extraCallbackQueue, 'success', self, [{
          origin: data,
          result: result
        }]);
      },
      fail: function renderCallbackFail(err) {
        if (executeCallbackQueue(defaultCallbackQueue, 'fail', self, [err])
            || executeCallbackQueue(extraCallbackQueue, 'fail', self, [err])) {
          return;
        }

        self.$content && self.$content.empty().append('<div class="magicbook-content__error magicbook-error">content not found</div>');
      },
      finally: function renderCallbackFinally() {
        executeCallbackQueue(defaultCallbackQueue, 'finally', self);
        executeCallbackQueue(extraCallbackQueue, 'finally', self);
      }
    });
  };

  proto.normalizeUrl = function normalizeUrl(url) {
    if (!url) {
      return url;
    }

    var self = this;
    var config = self.config;
    var urlArgs = config.urlArgs;
    var _url = config.baseUrl + url.replace(/^#/, '');

    if (urlArgs && isString(urlArgs)) {
      _url += (_url.indexOf('?') === -1 ? '?' : '&') + urlArgs;
    }

    return _url;
  };

  proto.normalizeImageUrl = function normalizeImageUrl(baseFile, url) {
    var self = this;
    var normalizeUrl = baseFile || '';

    if ((!baseFile && !url) || !isString(baseFile) || (url && !isString(url))) {
      return url || '';
    }

    // url is a external link, e.g. http:// https://
    if (url.search(/\:\/\//) !== -1) {
      return url;
    }

    normalizeUrl = normalizeUrl.replace(/\#/, '').replace(/\/$/, '');
    normalizeUrl = normalizeUrl +
        (baseFile && '/../' || '') +
        (url || '');
    return self.normalizeUrl(normalizeUrl);
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

  function isArray(arr) {
    return toStringEqual(arr, '[object Array]');
  }

  function isUndefined(obj) {
    return typeof obj === 'undefined';
  }

  function parseArray(obj) {
    if (obj === null || isUndefined(obj)) {
      return [];
    }

    return isArray(obj) && obj || [obj];
  }

  function getPropertyByDefaultValue(obj, name, defaultValue) {
    return obj && name && obj[name] || defaultValue;
  }

  function hasOwnProperty(obj, key) {
    return {}.hasOwnProperty.call(obj, key);
  }

  function requestGet(url, callback) {
    if (!url) {
      return;
    }

    $.get(url).success(function HttpGetSuccess(data) {
      callback && isFunction(callback.success) && callback.success(data);
    }).fail(function HttpGetFail(err) {
      callback && isFunction(callback.fail) && callback.fail(err);
    }).always(function HttpGetFinally() {
      callback && isFunction(callback.finally) && callback.finally();
    });
  }

  function executeCallbackQueue(callbackQueue, callbackName, executeScope, args) {
    var index;
    var len;
    var callback;
    var execute = false;

    if (!isArray(callbackQueue)) {
      return execute;
    }

    for (index = 0, len = callbackQueue.length; index < len; index++) {
      callback = getPropertyByDefaultValue(callbackQueue[index], callbackName);

      if (isFunction(callback)) {
        execute = true;
        callback.apply(executeScope, args);
      }
    }

    return execute;
  }

  function addClassName(selector, className) {
    var $selector = $(selector);
    $selector && !$selector.hasClass(className) && $selector.addClass(className);
  }

  function customizeClassName(selector, className) {
    addClassName(selector, PREFIX_CLASS + className);
  }

  function wrapElement($selector, $selectorWrap) {
    $selector.after($selectorWrap);
    $selector.remove();
    $selectorWrap.append($selector);
  }
})(window, jQuery);
