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
  var TAG_NAME = 'include';

  var defaults = {
    openTag: '{%',
    closeTag: '%}',
    normalizes: []
  };

  function tempate(cfg) {
    var options = $.extend({}, defaults, cfg);
    var openTag = options.openTag;
    var closeTag = options.closeTag;
    var normalizes = Magicbook.parseArray(options.normalizes);

    function prune(data, next) {
      data.url = data.url.replace(/^('|")/, '').replace(/('|")$/, '');
      next();
    }

    function resolve(data) {
      var url = data.url;

      if (!url.match(/^(https?|ftp):\/\//g)) {
        data.url = this.relativeCurrentUrl(url);
      }
    }

    normalizes.unshift(prune);
    normalizes.push(resolve);

    function runNormalizes(data) {
      var len = normalizes.length;
      var index = 0;
      var isContinue = false;

      function next() {
        index++;
        isContinue = true;
      }

      while (index < len) {
        var normalize = normalizes[index];

        isContinue = false;

        if (normalize.call(this, data, next)) {
          break;
        }

        if (!isContinue) {
          break;
        }
      }

      return data;
    }

    function parse(chunk) {
      var tokens = chunk.trim().replace(/\s+/g, ' ').split(' ');
      var tag = tokens[0];
      var len = tokens.length;

      if (len <= 1 || tag !== TAG_NAME) {
        return openTag + chunk + closeTag;
      }

      var content;
      var url = tokens[1];
      var result = runNormalizes.call(this, { url: url });

      $.ajax({
        url: result.url,
        async: false,
        success: function templateIncludeTagSuccess(data) {
          content = data;
        },
        error: function templateIncludeTagError() {
          content = [TAG_NAME, ': \'', url, '\' not found'].join(' ');
        }
      });

      return content;
    }

    return function render(source) {
      var blocks = (source || '').split(openTag);
      var len = blocks.length;
      var index;

      if (len <= 1) {
        return source;
      }

      var out = '';
      for (index = 0; index < len; index++) {
        var block = blocks[index];
        var chunks = block.split(closeTag);

        if (chunks.length === 1) {
          out += chunks[0];
          continue;
        }

        var content = parse.call(this, chunks[0]);

        out += content;
        out += chunks[1];
      }

      return out;
    };
  }

  Magicbook.potion.enableIncludeTag = function enableIncludeTag(cfg) {
    var self = this;
    var templateIncludeTag = tempate(cfg);

    self.config.parseFilters.push({
      before: templateIncludeTag
    });

    self.templateIncludeTag = templateIncludeTag;
  };
}));
