;(function (global, $, Magicbook) {  // eslint-disable-line

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

        catelogHtml += '<li class="catelog-item"><a class="catelog-item__link" data-identifier="' +
            $item.attr('id') + '"><b class="catelog-item__number">' + (index + 1) + '. </b>' +
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
})(window, jQuery, Magicbook);  // eslint-disable-line
