var sitebasepath = 'js/';



includejs=function(url) {
    document.write('<script src="' + url + '"></script>');
}


    includejs(sitebasepath+"jquery-1.7.min.js");
	includejs(sitebasepath+"bootstrap.min.js");
	includejs(sitebasepath+"menu.js"); 
	includejs(sitebasepath+"wow.min.js"); 
	includejs(sitebasepath+"slick.js");
	
	includejs(sitebasepath+"jquery.magnific-popup.js");
	includejs(sitebasepath+"sticky-header.js");
	includejs(sitebasepath+"jquery-equal-height.min.js");


ON_LOAD=function(){

	
jQuery('[data-toggle="tooltip"]').tooltip({
placement: "bottom"										  
}); 
	


  

 
wow = new WOW({
  boxClass:     'wow',      // default
  animateClass: 'animated', // default
  offset:       0,          // default
  mobile:       true        // default
 
});
wow.init();
					

	
	
}




