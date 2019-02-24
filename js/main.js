

$(document).ready(function(){

		$('input[type=file]').change(function(e) {
		var str = $(this).val();
		if (str.lastIndexOf('\\')) {
			var i = str.lastIndexOf('\\') + 1;
		}
		else {
			var i = str.lastIndexOf('/') + 1;
		}
		var filename = str.slice(i);
		var uploaded = $(this).closest('form').find('label span');
		uploaded.addClass('show-opacity');
		uploaded.html(filename);

	});

	/* mobile check */
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			// $('html, body').css('min-width', '1320px').addClass('mobile');
			// $('html').css('width', window.innerWidth + 'px');
		} else {
			$('a.whatsapp').attr('href', '#').addClass('def');
			$('a.viber').attr('href', '#').addClass('def');
		}

		$('.def').on('click', function(e) {
			e.preventDefault(); 
		});


		$(".send").on('click', function (e) {
			e.preventDefault();

			var form = $(this).parents("form");
			form.find("input").each(function () {

				var inp = $(this);
				var req = $(this).data("req");

				if ( inp.attr('type') === 'email' ) {
					var em = inp.val();
					if ( !validateEmail(em) ) {
						inp.addClass("error");
					} else {
						inp.removeClass("error");
					}
				} else if (req === 1 && !inp.val().length ) {
					inp.addClass("error");
				} else {
					inp.removeClass("error");
				}

			});

			if (form.find(".error").length) {
				return false;
			} else {
				$.ajax({
					type: "POST",
					url: form.attr('action'),
					data: form.serialize(),
					success: function (response) {

						$(':input')
						.not(':button, :submit, :reset, :hidden')
						.val('')
						.removeAttr('checked')
						.removeAttr('selected');

						$.fancybox.close();
						var message = $('.modal');
						$.fancybox(message);

					}
				});
			}

		});



	// /*SCROLL TO*/
	$('.main-nav a[href^="#"]').on('click', function(event) {
		var target = $( $(this).attr('href') );
		if( target.length ) {
			event.preventDefault();
			$('html, body').animate({
				scrollTop: target.offset().top
			}, 600);
		}
	});


	/* SLICK_SLIDER */
	if ($('.main-slider').length) {
		$('.main-slider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: true,
			centerMode: false,
			prevArrow: '<button type="button" data-role="none" class="slick-prev slick-arrow" aria-label="Previous" role="button" style="display: block;"></button>',
			nextArrow: '<button type="button" data-role="none" class="slick-next slick-arrow" aria-label="Next" role="button" style="display: block;"></button>',
			centerPadding: '30px',
			touchMove: false,
			draggable: false
		});
	};


	/*FANCYBOX*/
	$(".fancybox-modal").fancybox({
		'hideOnContentClick': true,
		minWidth : 230,
		padding : 0,
		margin: 0,
		closeBtn : false,
		fitToView: true,
		beforeShow: function() {},
		afterClose: function() {},
		helpers: {
			overlay: {
				locked: false
			}
		}
	});

	$(".fancybox").fancybox({
		'hideOnContentClick': true,
		minWidth : 230,
		padding : 0,
		closeBtn : true,
		fitToView: true,
		beforeShow: function() {},
		afterClose: function() {},
		helpers: {
			overlay: {
				locked: false
			}
		}
	});


	$('.popup__close').on('click', function(e) {
		e.preventDefault(); 
		$.fancybox.close();
	});

	// $('.video-popup').fancybox({
	//   openEffect  : 'none',
	//   closeEffect : 'none',
	//   maxHeight: '500',
	//   maxWidth: '800',
	//   helpers : {
	//     media : {}
	//   }
	// });


	// var regDigits = new RegExp('^\\d+$');

	// $('input[type=tel]').keypress(function (e) {

	// 	var key = String.fromCharCode(!e.charCode ? e.which : e.charCode);

	// 	if (!regDigits.test(key)) {
	// 		e.preventDefault();
	// 		return false;
	// 	}
	// });

	// $('input[type=email]').keyup(function() {
	// 	var thisVal = $(this);
	// 	thisVal.val(thisVal.val().replace(/[^\x00-\x7F]+/i, ""))

	// });


	/*MASK JQUERY*/
	$('input[type=tel]').mask("+7 (999) 999-99-99");


	/*HIDE PLACEHOLDER*/
	$('input,textarea').focus(function(){
		$(this).data('placeholder',$(this).attr('placeholder'))
		.attr('placeholder','');
	}).blur(function(){
		$(this).attr('placeholder',$(this).data('placeholder'));
	});



	/*  wordpress regexp tel: */  
	// if ($('a[href^="tel:"]').length > 1) {

	//  $('a[href^="tel:"]').each(function() {

	//    var phone = $(this).text();
	//    phone = phone.replace(/\D+/g,"");

	//    $(this).attr('href', 'tel:+'+phone);
	//  });
	// } else {
	//  var phone = $('a[href^="tel:"]').text();
	//  phone = phone.replace(/\D+/g,"");
	//  $('a[href^="tel:"').attr('href', 'tel:+'+phone);
	// }



	/*YANDEX MAP*/
	if ($('#map-canvas').length) {
		ymaps.ready(init);
		function init(){
			var myMap=new ymaps.Map("map-canvas",{
				center:[55.854661, 37.585736],
				zoom:13,
				controls:['zoomControl']
			}),
			Placemark1=new ymaps.Placemark([55.854661, 37.585736],{
				balloonContent:'',
				hintContent:'',
			},{
				preset:'islands#redDotIcon'
			})
			myMap.geoObjects.add(Placemark1);
			myMap.behaviors.disable('scrollZoom');
		}
	};



	function validateEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}


});