$(window).on("load",function(e){wow=new WOW({animateClass:'animated',offset:100,callback:function(box){console.log("WOW: animating <"+box.tagName.toLowerCase()+">")}});wow.init();});$(document).ready(function($){$("#cssmenu").menumaker({format:"multitoggle"});if($(".btn-searchsg").length>0){$(".btn-searchsg").click(function(){if($(".frm-search-1").hasClass("active")){$(".frm-search-1").removeClass("active");}else{$(".frm-search-1").addClass("active");return false;}});}
setTimeout(function(){$('.loading').fadeOut(300,function(){$(this).remove();});},800);$(".scroll-danhsach").click(function(){$('body,html').animate({scrollTop:$(".scroll").offset().top},800);});});$(document).click(function(){$(".a").removeClass("active");$(".a").removeClass("show");$("#a").removeClass("normal");});$('.list-cata, .btn-menu, #link-search,.frm-search,.frm-search-1, .layer-menu, .btn-action').click(function(event){event.stopPropagation();});(function($){$.fn.menumaker=function(options){var cssmenu=$(this),settings=$.extend({format:"dropdown",sticky:false},options);return this.each(function(){$(this).find(".button").on('click',function(){$(this).toggleClass('menu-opened');var mainmenu=$(this).next('ul');if(mainmenu.hasClass('open')){mainmenu.slideToggle().removeClass('open');}else{mainmenu.slideToggle().addClass('open');if(settings.format==="dropdown"){mainmenu.find('ul').show();}}});cssmenu.find('li ul').parent().addClass('has-sub');multiTg=function(){cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');cssmenu.find('.submenu-button').on('click',function(){$(this).toggleClass('submenu-opened');if($(this).siblings('ul').hasClass('open')){$(this).siblings('ul').removeClass('open').slideToggle();}else{$(this).siblings('ul').addClass('open').slideToggle();}});};if(settings.format==='multitoggle')multiTg();else cssmenu.addClass('dropdown');if(settings.sticky===true)cssmenu.css('position','fixed');resizeFix=function(){var mediasize=1000;if($(window).width()>mediasize){cssmenu.find('ul').show();}
if($(window).width()<=mediasize){cssmenu.find('ul').hide().removeClass('open');}};resizeFix();return $(window).on('resize',resizeFix);});};})(jQuery);
var pictureSrc ="images/dao.png"; //http://iris-tips.blogspot.com/
var pictureSrc_2nd ="images/mai.png"; //http://iris-tips.blogspot.com/
var pictureWidth = 25; //the width of the snowflakes
var pictureHeight = 25; //the height of the snowflakes
var numFlakes = 10; //the number of snowflakes
var downSpeed = 0.01; //the falling speed of snowflakes (portion of screen per 100 ms)
var lrFlakes = 10; //the speed that the snowflakes should swing from side to side


if( typeof( numFlakes ) != 'number' || Math.round( numFlakes ) != numFlakes || numFlakes < 1 ) { numFlakes = 10; }

//draw the snowflakes
for( var x = 0; x < numFlakes; x++ ) {
    if(x % 2 == 0) {
        if( document.layers ) { //releave NS4 bug
            document.write('<layer id="snFlkDiv'+x+'"><imgsrc="'+pictureSrc+'" height="'+pictureHeight+'"width="'+pictureWidth+'" border="0"></layer>');
        } else {
            document.write('<div style="position:absolute;"id="snFlkDiv'+x+'"><img src="'+pictureSrc+'"height="'+pictureHeight+'" width="'+pictureWidth+'" border="0"></div>');
        }
    }
    else {
        if( document.layers ) { //releave NS4 bug
            document.write('<layer id="snFlkDiv'+x+'"><imgsrc="'+pictureSrc_2nd+'" height="'+pictureHeight+'"width="'+pictureWidth+'" border="0"></layer>');
        } else {
            document.write('<div style="position:absolute;"id="snFlkDiv'+x+'"><img src="'+pictureSrc_2nd+'"height="'+pictureHeight+'" width="'+pictureWidth+'" border="0"></div>');
        }
    }

}

//calculate initial positions (in portions of browser window size)
var xcoords = new Array(), ycoords = new Array(), snFlkTemp;
for( var x = 0; x < numFlakes; x++ ) {
    xcoords[x] = ( x + 1 ) / ( numFlakes + 1 );
    do { snFlkTemp = Math.round( ( numFlakes - 1 ) * Math.random() );
    } while( typeof( ycoords[snFlkTemp] ) == 'number' );
    ycoords[snFlkTemp] = x / numFlakes;
}

//now animate
function flakeFall() {
    if( !getRefToDivNest('snFlkDiv0') ) { return; }
    var scrWidth = 0, scrHeight = 0, scrollHeight = 0, scrollWidth = 0;
//find screen settings for all variations. doing this every time allows for resizing and scrolling
    if( typeof( window.innerWidth ) == 'number' ) { scrWidth = window.innerWidth; scrHeight = window.innerHeight; } else {
        if( document.documentElement && (document.documentElement.clientWidth ||document.documentElement.clientHeight ) ) {
            scrWidth = document.documentElement.clientWidth; scrHeight = document.documentElement.clientHeight; } else {
            if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
                scrWidth = document.body.clientWidth; scrHeight = document.body.clientHeight; } } }
    if( typeof( window.pageYOffset ) == 'number' ) { scrollHeight = pageYOffset; scrollWidth = pageXOffset; } else {
        if( document.body && ( document.body.scrollLeft ||document.body.scrollTop ) ) { scrollHeight = document.body.scrollTop;scrollWidth = document.body.scrollLeft; } else {
            if(document.documentElement && (document.documentElement.scrollLeft ||document.documentElement.scrollTop ) ) { scrollHeight =document.documentElement.scrollTop; scrollWidth =document.documentElement.scrollLeft; } }
    }
//move the snowflakes to their new position
    for( var x = 0; x < numFlakes; x++ ) {
        if( ycoords[x] * scrHeight > scrHeight - pictureHeight ) { ycoords[x] = 0; }
        var divRef = getRefToDivNest('snFlkDiv'+x); if( !divRef ) { return; }
        if( divRef.style ) { divRef = divRef.style; } var oPix = document.childNodes ? 'px' : 0;
        divRef.top = ( Math.round( ycoords[x] * scrHeight ) + scrollHeight ) + oPix;
        divRef.left = ( Math.round( ( ( xcoords[x] * scrWidth ) - (pictureWidth / 2 ) ) + ( ( scrWidth / ( ( numFlakes + 1 ) * 4 ) ) * (Math.sin( lrFlakes * ycoords[x] ) - Math.sin( 3 * lrFlakes * ycoords[x]) ) ) ) + scrollWidth ) + oPix;
        ycoords[x] += downSpeed;
    }
}

//DHTML handlers
function getRefToDivNest(divName) {
    if( document.layers ) { return document.layers[divName]; } //NS4
    if( document[divName] ) { return document[divName]; } //NS4 also
    if( document.getElementById ) { return document.getElementById(divName); } //DOM (IE5+, NS6+, Mozilla0.9+, Opera)
    if( document.all ) { return document.all[divName]; } //Proprietary DOM - IE4
    return false;
}

window.setInterval('flakeFall();',100);