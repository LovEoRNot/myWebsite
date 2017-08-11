$(window).on('load', function () {
  setTimeout(wordWrap, 500);
  document.documentElement.style.overflow = 'hidden';
  listProject();
  checkCookie();
  
})

var projectList = [
  { name: 'caculator', description: '一个简易的网页版计算器', addTime: '2017-7-20' },
  { name: 'danmu', description: '弹幕聊天窗口', addTime: '2017-7-20' },
  { name: 'introduce', description: '一份名人的介绍页面', addTime: '2017-7-20' },
  { name: 'randomQuoteMachine', description: '一个可以随机产生名言的网页应用', addTime: '2017-7-20' },
  { name: 'smallWebsite', description: '一个简易的小网站', addTime: '2017-7-20' },
  { name: 'tomatoClock', description: '一个网页版的番茄钟应用', addTime: '2017-7-20' },
  { name: 'weatherReport', description: '一个网页版的天气预报应用', addTime: '2017-7-20' },
  { name: 'simonGame', description: '一个简易的小游戏，游戏方式为根据系统提示来点击相应的部分，完成基础部分，剩余一些其他功能尚未完成', addTime: '2017-8-10' }
];

var $projects = $('#projects'),
  $list = $('.projects');

$('#second').on('click', function () {
    document.documentElement.style.overflow = 'scroll';
  $(this).parents('.wrap-white').fadeOut(500, function () {
    $(this).hide();
    $('#second').off('click');
  });
});
$projects.on('click', 'li', function () {
  var title = $(this).attr('data-control');
  location.href = './project/' + title + '/index.html';
})


function listProject() {
  var html = '';
  var clientWidth = document.body.clientWidth || document.documentElement.clientWidth;
  projectList.forEach(function (project) {
    html += '<li class="project-li" data-control="' + project.name + '"><div class="head-pic">' +
      '<img src="./img/project/' + project.name + '.png"></div><div class="text"><div class="description">' +
      project.description + '</div><div class="addTime">上一次更新' + project.addTime + '</div></div></li>'
  });
  $($list).append(html);
  if(clientWidth > 980) {$('.project-li').addClass('peoject-inline');}
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
//cookie相关
function checkCookie() {
   var lastCome = Cookie.get('lastCome');
  if (lastCome === null) {
    var expires = new Date();
    expires.setMinutes(expires.getMinutes() + 3);  //cookie的有效时间为3分钟
    Cookie.set('lastCome', 'isCome', expires)
    $('.wrap-white').show();
  }
}
var Cookie = {
  get: function(name) {
    if(document.cookie.length > 0) {
      var cookieName = name + '=',
          cookieStart = document.cookie.indexOf(cookieName),
          cookieValue = null;
      
      if(cookieStart > -1) {
        var cookieEnd = document.cookie.indexOf(';', cookieStart);
        if(cookieEnd === -1) {
          cookieEnd = document.cookie.length;
        }
        cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
      }
      return cookieValue;
    }
    return null; 
  },
  set: function(name, value, expires) {
    var cookieText = name + '=' + encodeURIComponent(value);
    if(expires instanceof Date) {
      cookieText += '; expires=' + expires.toGMTString();
    }
    document.cookie = cookieText;
  },
  remove: function(name) {
    this.set(name, '', new Date(0));
  }
}

