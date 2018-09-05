
(function( $ ) {
  $.fn.accordionMenu = function() {
	var $this = this;
	$("ul:first", $this).addClass('acdnTop');
	$("ul:first li", $this).each(function(lfdnr, id) {
		$(id).contents().each(function(lfdnr, ele) { 
			if(ele.nodeType === 3 && $(ele).text().replace(/^\s+|\s+$/g, '') != "")
			{
				$(id).prepend($('<div class="acdnHeading"><div class="acdnArrowImage"></div>' + $(ele).text() + '</div>'));
				$(ele).remove();
			}
		});
	});
	$("ul:first > li", $this).each(function(lfdnr, id) {
		$(id).addClass('acdnSeparator');
	});
	$("ul:first > li:last", $this).removeClass('acdnSeparator');
	$("ul:first > li > ul", $this).each(function(lfdnr, id) {
		$(id).addClass('acdnSub');
	});
	$("a", $this).each(function(lfdnr, id) {
		$(id).addClass('acdnLink').css('display', 'block');
	});
	$("ul:first > li div.acdnHeading", $this).click(function(obj) {
		if(!$(obj.target).hasClass('acdnCurrent')){
			$("ul", $(obj.target).parents("ul:first")).slideUp();
			$(".acdnCurrent", $(obj.target).parents("ul:first")).each(function(lfdnr, ele) {
				if(obj.target != ele)
					$(ele).removeClass('acdnCurrent');
			});
		}
		$(obj.target).toggleClass('acdnCurrent');
		$(this).nextAll('ul:first').slideToggle();
	});
	$('a', $this).each(function(lfdnr, ele) {
		if(window.location.href.indexOf($(ele).attr('href')) != -1) {
			$(ele).parents("ul:not(.acdnTop)").slideDown();
			$(ele).parents("ul > li", $this).each(function(lfdnr2, ele2) {
				$("div.acdnHeading",ele2).addClass('acdnCurrent');
			});
		}
	});

  };
})( jQuery );