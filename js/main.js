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
    $list = $('.projects'),
    //特效相关，用原生js实现
    canvas = document.getElementById('myCanvas'),
    ctx = canvas.getContext('2d'),
    particles = [],
    cw, ch;
//cookie相关
var Cookie = {
  get: function (name) {
    if (document.cookie.length > 0) {
      var cookieName = name + '=',
        cookieStart = document.cookie.indexOf(cookieName),
        cookieValue = null;
      if (cookieStart > -1) {
        var cookieEnd = document.cookie.indexOf(';', cookieStart);
        if (cookieEnd === -1) {
          cookieEnd = document.cookie.length;
        }
        cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
      }
      return cookieValue;
    }
    return null;
  },
  set: function (name, value, expires) {
    var cookieText = name + '=' + encodeURIComponent(value);
    if (expires instanceof Date) {
      cookieText += '; expires=' + expires.toGMTString();
    }
    document.cookie = cookieText;
  },
  remove: function (name) {
    this.set(name, '', new Date(0));
  }
}

$('#second').on('click', function () {
  document.documentElement.style.overflow = 'auto';
  $(this).parents('.wrap-white').fadeOut(500, function () {
    $(this).hide();
    $('#second').off('click');
  });
});
$projects.on('click', 'li', function () {
  var title = $(this).attr('data-control');
  location.href = './project/' + title + '/index.html';
})
//鼠标移动时绘制粒子
canvas.onmousemove = function (e) {
  e = e || window.event;
  var ex = e.pageX,
    ey = e.pageY;
  if (particles.length >= 500) {
    particles.shift();
  }
  for (var i = 0; i < 20; i++) {
    create(ex, ey);
  }
}

thisIsFirstNeedToDo();
function thisIsFirstNeedToDo() {
  listProject();      //列出项目
  checkCookie();      //检验是否进入过，如果进入过就不再显示欢迎页面
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
function checkCookie() {
  var lastCome = Cookie.get('lastCome');
  if (lastCome === null) {
    _init();
    setTimeout(wordWrap, 500);
    document.documentElement.style.overflow = 'hidden';
    var expires = new Date();
    expires.setMinutes(expires.getMinutes() + 3);  //cookie的有效时间为3分钟
    Cookie.set('lastCome', 'isCome', expires)
    $('.wrap-white').show();
  } else {
    $('.wrap-white').hide();
  }
}
function _init() {
  //设置canvas的宽高
  cw = document.body.clientWidth || document.documentElement.clientWidth,
  ch = document.documentElement.clientHeight || document.body.scrollHeight
       || document.body.clientHeight; //window.screen.height;
  canvas.width = cw;
  canvas.height = ch;
  render();
}
//创建粒子
function create(ex, ey) {
  var particle = new Particle(ex, ey);
  particle.init();
  particles.push(particle); //将每一个创建的粒子放到粒子集合中
}
//构造函数接受两个参数，分别表示粒子当前所在的位置
var Particle = function (x, y) {
  this.px = x;
  this.py = y;
  this.color = random(COLORS);
  this.radius = Math.floor(random(3, 12));
  this.force = Math.floor(random(2, 8));
  this.theta = random(0, 2 * Math.PI);
  this.vx = Math.cos(this.theta) * this.force;
  this.vy = Math.sin(this.theta) * this.force;
}
//构造函数，用于生成粒子
Particle.prototype = {
  constructor: Particle,
  init: function () {
    this.draw();
    this.update();
  },
  draw: function () {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.px, this.py, this.radius, 0, 2 * Math.PI);
    ctx.globalCompositeOperation = 'lighter';  //绘制的图形将会重叠，使重叠部分变亮
    ctx.fill();
  },
  update: function () {
    this.px += this.vx;
    this.py += this.vy;
    this.vx += Math.cos(this.theta) * .1; //逐步扩散
    this.vy += Math.sin(this.theta) * .1;
    this.vx *= .92;  //移动逐步变慢
    this.vy *= .92;
    this.radius *= .93;  //逐步变小
  }
}
//渲染粒子
function render() {
  ctx.clearRect(0, 0, cw, ch);
  //让所有粒子动起来
  for (var i = 0, len = particles.length; i < len; i++) {
    var particle = particles[i];
    particle.init();
  }
  requestAnimationFrame(render);   //帧动画， 
}
function random(min, max) {
  //min instanceof Array
  if (Object.prototype.toString.call(min) === '[object Array]') {
    //从颜色数组中随机选取一种颜色
    return min[Math.floor(Math.random() * min.length)];
  } else {
    //随机产生一个位于min到max之间的随机整数
    return Math.random() * (max - min) + min;
  }
}