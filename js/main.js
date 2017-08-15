//项目列表
var projectList = [
      { name: 'caculator', description: '一个简易的网页版计算器', addTime: '2017-7-20' },
      { name: 'danmu', description: '弹幕聊天窗口', addTime: '2017-7-20' },
      { name: 'introduce', description: '一份名人的介绍页面', addTime: '2017-7-20' },
      { name: 'randomQuoteMachine', description: '一个可以随机产生名言的网页应用', addTime: '2017-7-20' },
      { name: 'smallWebsite', description: '一个简易的小网站', addTime: '2017-7-20' },
      { name: 'tomatoClock', description: '一个网页版的番茄钟应用', addTime: '2017-7-20' },
      { name: 'weatherReport', description: '一个网页版的天气预报应用', addTime: '2017-7-20' },
      { name: 'simonGame', description: '一个简易的小游戏，游戏方式为根据系统提示来点击相应的部分，完成基础部分，剩余一些其他功能尚未完成', addTime: '2017-8-10' }
    ],
    COLORS = ['#f63e60', '#f6f43e', '#3e83f6', '#3ef65c', '#603ef6', '#f6723e', '#f63eaa'], //粒子颜色数组
    $projects = $('#projects'), 
    $list = $('.projects');
    var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
//cookie相关
// var Cookie = {
//   get: function (name) {
//     if (document.cookie.length > 0) {
//       var cookieName = name + '=',
//         cookieStart = document.cookie.indexOf(cookieName),
//         cookieValue = null;
//       if (cookieStart > -1) {
//         var cookieEnd = document.cookie.indexOf(';', cookieStart);
//         if (cookieEnd === -1) {
//           cookieEnd = document.cookie.length;
//         }
//         cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
//       }
//       return cookieValue;
//     }
//     return null;
//   },
//   set: function (name, value, expires) {
//     var cookieText = name + '=' + encodeURIComponent(value);
//     if (expires instanceof Date) {
//       cookieText += '; expires=' + expires.toGMTString();
//     }
//     document.cookie = cookieText;
//   },
//   remove: function (name) {
//     this.set(name, '', new Date(0));
//   }
// }
var tag = true;
$(window).on('scroll', function() {
  if(tag) {
    var scrollHeight = $(this).scrollTop();
    var clientHeight = document.documentElement.clientHeight;
    var speed = Math.floor((1-(scrollHeight / clientHeight)) * 800);
    $banner = $('.top-banner')
    $banner.css('margin-top', -scrollHeight+'px')
    if(scrollHeight > 100) {
      tag = false;
      $banner.animate({
        marginTop: -clientHeight+'px'
      }, speed, function() {
        $(window).scrollTop(0);        
      });      
    }
  }   
})
$('#second').on('click', function () {
  // $(this).parents('.wrap-white').fadeOut(500, function () {
  //   $(this).hide();
  //   $('#second').off('click');
  // });
  $(this).parents('.top-banner').slideUp();
});
$projects.on('click', 'li', function () {
  var title = $(this).attr('data-control');
  location.href = './project/' + title + '/index.html';
})

thisIsFirstNeedToDo();
function thisIsFirstNeedToDo() { 
  $('.top-banner').css('height', clientHeight)
  listProject();      //列出项目
  setTimeout(wordWrap, 500);
 // checkCookie();      //检验是否进入过，如果进入过就不再显示欢迎页面
}
function listProject() {
  var html = '';
  var clientWidth = document.body.clientWidth || document.documentElement.clientWidth;
  projectList.forEach(function (project) {
    html += '<li class="project-li" data-control="' + project.name + '"><div class="head-pic">' +
      '<img src="./img/project/' + project.name + '.png"></div><div class="text"><div class="description">' +
      project.description + '</div><div class="addTime">上一次更新' + project.addTime + '</div></div></li>'
  });
  $($list).append(html);
  if (clientWidth > 1024) { $('.project-li').addClass('peoject-inline'); }
}
function wordWrap() {
  $('#first').fadeOut(1000, function () {
    $('#second').fadeIn(2000);
  });
}
function getDate() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = (month < 10) ? '0' + month : month;
  var day = date.getDate();
  day = (day < 10) ? '0' + day : day;
  return year + '-' + month + '-' + day;
}
// function checkCookie() {
//   var lastCome = Cookie.get('lastCome');
//   if (lastCome === null) {
    
//     var expires = new Date();
//     expires.setMinutes(expires.getMinutes() + 3);  //cookie的有效时间为3分钟
//     Cookie.set('lastCome', 'isCome', expires)
//   } else {
//     $('.top-banner').css({
//       top: -clientHeight+'px',
//       marginTop: -clientHeight+'px'
//     }) 
//   }
// }
