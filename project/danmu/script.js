var id = 0, topPos = 0, num = 0;
$("#sub").click(function() {
  saveMsg();
});
$(document).keydown(function(e) {
  if(e.which == 13) {
    saveMsg();
  }
});
showMsg();
//保存信息
function saveMsg() {
  var message = $(".inf").val();
  if(message === '') { return}
  $(".inf").val("");
  var str = JSON.stringify(message);
  addToScreen(message);	
  sessionStorage.setItem(id, str);
  id++;
}
//显示信息
function showMsg() {											
  if(id > 0) {
    var message = sessionStorage.getItem(num++ % id);
    message = message.replace(/"/g, "");
    addToScreen(message);
  }			
  setTimeout("showMsg()", 4000);
}
//把信息添加到屏幕上
function addToScreen(message) {
  var div = document.createElement("div");
  var msg = document.createTextNode(message);
  var r = Math.round(Math.random()*255);
  var g = Math.round(Math.random()*255);
  var b = Math.round(Math.random()*255);
  var t_color = "rgb(" + r +", " + g + ", " + b + ")";
  var width = $('.content').width();
  var speed = Math.round(Math.random()*10 + 15);
  
  div.appendChild(msg);
  div.className = "msg";
  div.style.color = t_color;
  div.style.top = (topPos++ % 7) * 50 + "px";								
  div.style.right = -(message.length * 20) + 'px';

  $(div).animate({right: width}, speed * 1000, function(){
    $(this).remove();
  });
  $(".screen").append(div);
}
$("#del").click(function() {
  //sessionStorage.clear();
  $(".screen").children().each(function() {
    $(this).remove();
  });				
})