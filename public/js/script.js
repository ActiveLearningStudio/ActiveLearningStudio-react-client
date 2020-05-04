function handleHeader() {
	var nav = $('.navbar.fixed-top');
	function handleNav(){
		if (nav.length) {
			var contentNav = nav.offset().top;
			if (contentNav > 15) {
				nav.addClass('noshadow');
			} else {
				nav.removeClass('noshadow');
			}
		}
	}
	handleNav();
	$(window).scroll(function() {
		handleNav();
	});
}

$(document).ready(function(){
	handleHeader();
	
	$('.pie-wrapper').easyPieChart({
		animate: 1000,
		scaleColor: false,
		lineCap: 'butt',
		barColor: '#0754ac',
		trackColor: '#a8bfda',
		lineWidth: 4,
		size: 38
	});
	
	$('.owl-carousel').owlCarousel({
		loop:false,
		margin:20,
		nav:true,
		responsive:{
			0:{
				items:1
			},
			600:{
				items:2
			},
			1000:{
				items:4
			}
		}
	});
});

/******* LTI Iframe Settings *********/
$(document).ready(function () {

	window.addEventListener('message', receiveMessage, false);
	function receiveMessage(evt)
	{						
		var {h5piframeStyle} = JSON.parse(evt.data);		
		if(h5piframeStyle !== undefined){
			var h5piframeHeight = parseInt(h5piframeStyle.split(' ')[1].slice(0,-3));
			h5piframeHeight = h5piframeHeight + 200;			
			$('#contentframe').css({height:h5piframeHeight});
		}		
	}
	
});

//script to include in moodle tool provider
/**
(function() {
	var callbackLtiFrame = function(){	
		var iframe_lti = document.getElementsByTagName("iframe")[0];		
			iframe_lti.onload = function(e) {
			if(e.target.classList.contains("h5p-iframe")){
				var targetIframe = e.target;
				let timerId = setInterval(function(){
					var h5piframeStyle = targetIframe.getAttribute("style").toString(); 
					window.parent.postMessage(JSON.stringify({h5piframeStyle}), '*');                                   
				}, 1000);   
				// after 10 seconds stop
				setTimeout(() => { clearInterval(timerId);  }, 10000);                        	
			}			
		};			
	  };
	  
	  if (
		  document.readyState === "complete" ||
		  (document.readyState !== "loading" && !document.documentElement.doScroll)
	  ) {
		callbackLtiFrame();
	  } else {
		document.addEventListener("DOMContentLoaded", callbackLtiFrame);
	  }	
 })();
 */