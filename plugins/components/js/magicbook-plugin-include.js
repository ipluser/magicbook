;(function (global, $, Magicbook) {  // eslint-disable-line

  var TAG_NAME = 'include';
  var defaults = {
    openTag: '{%',
    closeTag: '%}'
  };

  function tempate(cfg) {
    var options = $.extend({}, defaults, cfg);
    var openTag = options.openTag;
    var closeTag = options.closeTag;

    function parse(chunk) {
      var tokens = chunk.trim().replace(/\s+/g, ' ').split(' ');
      var tag = tokens[0];
      var len = tokens.length;

      if (len <= 1 || tag !== TAG_NAME) {
        return openTag + chunk + closeTag;  //
      }

      var content;
      var url = tokens[1];
      var _url = url.length > 2 ? url.substring(1, url.length - 1) : url;
      _url = _url.search(/\:\/\//) !== -1 ? _url : this.relativeCurrentUrl(_url);

      $.ajax({
        url: _url,
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

    self.config.parseFilters.push({
      before: tempate(cfg)
    });

    self.templateIncludeTag = tempate(cfg);
  };
})(window, jQuery, Magicbook);  // eslint-disable-line
