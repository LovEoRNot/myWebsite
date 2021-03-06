$('.menu').on('click', function() { $(this).hide(); $('.aside-menu').fadeIn();})
$('.myClose').on('click', function() { $(this).parent().fadeOut(); $('.menu').show(); })
$('.more').on('click', function() { $(this).parent().slideUp(800, function() {$('.menu, footer').show();});})
$('.wrap~div, footer').hide();
var tag = true;  //用来标记是否继续触发sroll事件
$(window)
  .on('load', function() {
    $('body').css('overflow-y', 'scroll');
   $('.wrap').fadeOut(500, function(){$('.wrap~div, footer').show();}); 
    $('.addTime').each(function() {
      var oldTime = $(this).text();
      var newTime = formateDate(oldTime * 1000);
      $(this).text(newTime);
    })    
  })
  .on('scroll', function() {
    if(tag) {
      var scrollHeight = $(this).scrollTop();
      var clientHeight = document.documentElement.clientHeight;
      var speed = Math.floor((1-(scrollHeight / clientHeight)) * 800);
      var $banner = $('.banner')
      $banner.css('margin-top', -scrollHeight+'px')
      if(scrollHeight > 100) {
        tag = false;
        $banner.animate({
          marginTop: -clientHeight+'px'
        }, speed, function() {
          //$(window).scrollTop(0);    
          $('.menu, footer').fadeIn();     
        });      
      }
    }   
  });
$('.project') 
  .hover(function() {
    $(this).children('.description').stop().fadeIn();
  }, function() {
    $(this).children('.description').stop().fadeOut();
  })
  .on('click', '.description', function(e) {      
    var url = $(e.target).parents('.project').children('img').prop('title');
    location.href = url;
  });
$('.aside-menu dl').on('click', 'a', function() {
  var href = $(this).prop('href');
  href = href.slice(href.lastIndexOf('/')+1);
  var pos = $(href).offset().top;
  $("html,body").animate({scrollTop: pos}, "2000"); 
});
function formateDate(timestamp) {
  var date = new Date(timestamp);
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}