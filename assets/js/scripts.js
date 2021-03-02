
function scroll_to(clicked_link, nav_height) {
	var element_class = clicked_link.attr('href').replace('#', '.');
	var scroll_to = 0;
	if(element_class != '.top-content') {
		element_class += '-container';
		scroll_to = $(element_class).offset().top - nav_height;
	}
	if($(window).scrollTop() != scroll_to) {
		$('html, body').stop().animate({scrollTop: scroll_to}, 1000);
	}
}


jQuery(document).ready(function() {
	
	/*
	    Navigation
	*/
	$('a.scroll-link').on('click', function(e) {
		e.preventDefault();
		scroll_to($(this), $('nav').outerHeight());
	});
	// toggle "navbar-no-bg" class
	$('.top-content .text').waypoint(function() {
		$('nav').toggleClass('navbar-no-bg');
	});
	
    /*
        Background slideshow
    */
    $('.top-content').backstretch("assets/img/backgrounds/hygiene2.jpg");
	$('.section-4-container').backstretch("assets/img/backgrounds/hygiene2.jpg");
    
    /*
        Wow
    */
    new WOW().init();
	
//counter

$(document).ready(function(){
    $('.counter-value').each(function(){
        $(this).prop('Counter',0).animate({
            Counter: $(this).text()
        },{
            duration: 3500,
            easing: 'swing',
            step: function (now){
                $(this).text(Math.ceil(now));
            }
        });
    });
});






	//Get the button
var btn = $('#button');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});



//$(".nav-tabs li.nav-item a.nav-link").click(function() {
//	$(".nav-tabs li.nav-item a.nav-link").removeClass('active');
//  })




  $('.contact-form form input[type="text"], .contact-form form textarea').on('focus', function() {
	$('.contact-form form input[type="text"], .contact-form form textarea').removeClass('input-error');
});
$('.contact-form form').submit(function(e) {
	e.preventDefault();
	$('.contact-form form input[type="text"], .contact-form form textarea').removeClass('input-error');
	var postdata = $('.contact-form form').serialize();
	$.ajax({
		type: 'POST',
		url: 'assets/contact.php',
		data: postdata,
		dataType: 'json',
		success: function(json) {
			if(json.emailMessage != '') {
				$('.contact-form form .contact-email').addClass('input-error');
			}
			if(json.subjectMessage != '') {
				$('.contact-form form .contact-subject').addClass('input-error');
			}
			if(json.messageMessage != '') {
				$('.contact-form form textarea').addClass('input-error');
			}
			if(json.emailMessage == '' && json.subjectMessage == '' && json.messageMessage == '') {
				$('.contact-form form').fadeOut('fast', function() {
					$('.contact-form').append('<p>Thanks for contacting us! We will get back to you very soon.</p>');
				});
			}
		}
	});

});
});
