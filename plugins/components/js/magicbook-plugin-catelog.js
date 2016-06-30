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
  var defaults = {
    locationSelector: '',
    catelogSelector: 'h3',
    duration: 500,
    gap: 30
  };

  function carry(cfg) {
    var config = $.extend({}, defaults, cfg);
    var locationSelector = config.locationSelector;
    var catelogSelector = config.catelogSelector;
    var duration = config.duration;
    var gap = config.gap;
    var idPrefix = Magicbook.randomString();

    return function navigatorCallbackSucessForCarryCatelog() {
      var self = this;
      var $contentWrap = self.$contentWrap;
      var $content = self.$content;
      var $catelog = $contentWrap.find(catelogSelector);
      var len = $catelog.length;
      var catelogHtml = '<div class="catelog-items-wrap"><ul class="catelog-items">';

      $('.catelog-items-wrap').remove();

      if (!len) {
        return;
      }

      for (var index = 0; index < len; index++) {
        var $item = $($catelog[index]);
        var id = $item.attr('id');

        if (!id || id === '-') {
          id = idPrefix + index;
          $item.attr('id', id);
        }

        catelogHtml += '<li class="catelog-item"><a class="catelog-item__link" data-identifier="' +
            id + '"><b class="catelog-item__number">' + (index + 1) + '. </b>' +
            $item.text() + '</a></li>';
      }
      catelogHtml += '</ul></div>';

      locationSelector && $(locationSelector).length && $(locationSelector).after(catelogHtml)
      || $content.before(catelogHtml);

      $('.catelog-items-wrap').off('click').on('click', '.catelog-item__link', function moveToAssignedCatelog() {
        self.moveTo({
          selector: '#' + $(this).attr('data-identifier'),
          duration: duration,
          gap: gap
        });
      });
    };
  }

  Magicbook.potion.carryCatelog = function carryCatelog(cfg) {
    var self = this;
    var routeCallbackSuccessForCarryCatelog = carry(cfg);

    self.config.routeCallbackQueue.push({
      success: routeCallbackSuccessForCarryCatelog
    });
  };
}));
