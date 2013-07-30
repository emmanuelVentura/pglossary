/*
 Javascript du module GLOSSARY (pglossary).
 Téléchargez modèle, module et rangée sur
 http://www.automne4you.com 
 
 La librairie jQuery est nécessaire pour le fonctionnement du code suivant.

 Pour chaque lien fait avec le plug-in wysiwyg (.pglossary-link), une bulle d'aide est ajoutée au survol.
 La bulle affiche ce qui se trouve dans le 'title'.
 
*/
(function($) {
	 $.fn.glossaryTips=function(){

		$(document).mousemove(function(e){
			positionLeft=Math.round(Math.round(e.pageX)-($('.pglossary-tooltip').width()/2));
			positionTop=Math.round(Math.round(e.pageY)-$('.pglossary-tooltip').height()-10);
			$(".pglossary-tooltip").css({left:positionLeft, top:positionTop});
		}); 
		$(this).hover(
			function(){
				$(this).attr('rel', $(this).attr('title'));
				$('body').prepend('<div class="pglossary-tooltip"><p>'+$(this).attr('title')+'</p></div>');
				$(this).removeAttr('title');
			},
			function(){
				$(this).attr('title', $(this).attr('rel'));
				$(".pglossary-tooltip").remove();
				//$(this).removeAttr('rel');
			});
		
	}

})(jQuery);
$(document).ready(function(){

	$('a.pglossary-link').glossaryTips();


	var getSearch = function  (e) {
		$('.pglossary-form a').removeClass('pglossary-letter');
		$(e.target).addClass('pglossary-letter');
		var letter = $(e.target).html();

			e.preventDefault();
			$.ajax({
				type: 		"GET",
				url: 		pageURL,
				data: 		'out=xml&letter=' + letter,
				success: 	displaySearch
			});
		return true;
	}
	var getPage = function  (e) {
		var href = $(e.target).is('a') ? $(e.target).attr("href") : $(e.target).parent('a').attr("href");
		if (href) {
			e.preventDefault();
			$.ajax({
				type: 		"GET",
				url: 		href,
				data: 		'out=xml',
				success: 	displaySearch
			});
			return false;
		}
		return true;
	}
	var displaySearch = function  (xmlcontent) {
		if (xmlcontent.getElementsByTagName('data').length > 0) {
			if($('.pglossary-results').length>0){
				$('.pglossary-results').replaceWith(xmlcontent.getElementsByTagName('data').item(0).firstChild.nodeValue);
			}
			if($('.pglossary-noresult').length>0){
				$('.pglossary-noresult').replaceWith(xmlcontent.getElementsByTagName('data').item(0).firstChild.nodeValue);
			}
		}
		catchResults();
		return true;
	}
	$(".pglossary-loading").ajaxStart(function(){
		$(this).show();
	});
	$(".pglossary-loading").ajaxStop(function(){
		$(this).hide();
	});
	
	if ($('.pglossary .pglossary-form').length>0) {
		$('.pglossary-form a').click(getSearch);
	}

	var catchResults = function  (xmlcontent) {
		if ($('.pglossary-results .pglossary-pages').length>0) {
			$('.pglossary-results .pglossary-pages a').click(getPage);
		}
	}
	catchResults();

});