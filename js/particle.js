var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var COLORS = ['#f63e60', '#f6f43e', '#3e83f6', '#3ef65c', '#603ef6', '#f6723e', '#f63eaa'];
var particles = [];
var cw, ch;

_init();
function _init() { 
  //设置canvas的宽高
  cw = document.body.clientWidth || document.documentElement.clientWidth,
  ch =  document.documentElement.clientHeight || document.body.scrollHeight 
       || document.body.clientHeight; //window.screen.height;
  canvas.width = cw;
  canvas.height = ch;
  render();
}

//鼠标移动时绘制粒子
canvas.onmousemove = function(e) {
  e = e || window.event;
  var ex = e.pageX,
      ey = e.pageY;
  
  if(particles.length >= 500) {
    particles.shift();
  }
  for(var i=0; i<15; i++) {
    create(ex, ey);
  } 
}

//创建粒子
function create(ex, ey) {
  var particle = new Particle(ex, ey);
  particle.init();
  particles.push(particle); //将每一个创建的粒子放到粒子集合中
}


//构造函数接受两个参数，分别表示粒子当前所在的位置
var Particle = function(x, y) {
  this.px = x;
  this.py = y;
  this.color = random(COLORS);
  this.radius = Math.floor(random(3, 15));

  this.force = Math.floor(random(2,8));
  this.theta = random(0, 2 * Math.PI);
  this.vx = Math.cos(this.theta) * this.force;
  this.vy = Math.sin(this.theta) * this.force;
}

Particle.prototype = {
  constructor: Particle,
  init: function() {
    this.draw();
    this.update();
  },
  draw: function() {     
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.px, this.py, this.radius, 0, 2 * Math.PI);
    ctx.globalCompositeOperation = 'lighter';  //绘制的图形将会重叠，使重叠部分变亮
    ctx.fill();
  },
  update: function() {
    this.px += this.vx;
    this.py += this.vy;

    this.vx += Math.cos(this.theta) * .1; //逐步扩散
    this.vy += Math.sin(this.theta) * .1;

    this.vx *= .92;  //移动逐步变慢
    this.vy *= .92;

    this.radius *= .95;  //逐步变小
  }
}

//渲染粒子
function render() { 
  ctx.clearRect(0, 0, cw, ch);
  //让所有粒子动起来
  for(var i=0, len=particles.length; i<len; i++) {
    var particle = particles[i];
    particle.init();
  }
  requestAnimationFrame(render);   //帧动画， 
}


function random(min, max) {
  //min instanceof Array
  if(Object.prototype.toString.call(min) === '[object Array]') {
    //从颜色数组中随机选取一种颜色
    return min[Math.floor(Math.random() * min.length)];
  } else {
    //随机产生一个位于min到max之间的随机整数
    return Math.random() * (max - min) + min;
  }
}