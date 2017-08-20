$(document).ready(function() {
  var isBegin = false,
      $slide = $('.slide'),
      $light = $('.light'),
      $count = $('#count'),
      $start = $('#start'),
      $strict = $('#strict');
  
  var btn = [];
  for(var i=0; i<4; i++) {
    btn.push('#b'+i);
  }
  
  $start
    .on('mousedown', function() {
      $(this).addClass('active');
    })
    .on('mouseup', function() {
      $(this).removeClass('active');  
      if(isBegin) {
        gameStart(); 
      }     
    });

  $strict
    .on('mousedown', function() {
      $(this).addClass('active');
    })
    .on('mouseup', function() {
      $(this).removeClass('active');      
      if($light.is(':hidden') && isBegin) {
        $light.show();
      } else {
        $light.hide();
      }     
    });

  //开关  
  $('.switch').on('click', function() {  
    if($slide.css('left') === '1px') {
      $slide.css('left', this.offsetWidth/2 + 'px');
      init();
    } else {
      off();
    }
  });

  var sequency = [];//存放点击顺序的数组
  var sounds = [];
  var level = 1;  //当前是第几关
  
  //游戏初始化
  function init() {  
    isBegin = true;
    $count.text('--');
    $count.css('color', '#f00');
    sequency = [];
    level = 1;
    playerClick = [];
    if(!$light.is(':hidden')) {
      $light.hide();
    }
  }
  //按钮关闭
  function off() {
    $slide.css('left', '1px');
    isBegin = false;
    $count.text('--');
    $count.css('color', '#700');
    sequency = [];
    level = 1;
    playerClick = [];
    if(!$light.is(':hidden')) {
      $light.hide();
    } 
  }
  //游戏开始
  function gameStart() {
    if(level === 1) {
      showWords(level);
      setTimeout(function() {
        getSequency(level); //第一关开始  
      }, 1100);      
    } else {
      exampleShow();
    }
    
  }
  var showTime = 0, duarution = 800;
  //事例按钮顺序
  function exampleShow() {
    for(var i=0; i<sequency.length; i++) {
      (function(i) {       
        setTimeout(function() {
          $(btn[i]).addClass('isClick');
          setTimeout(function() {
            $(btn[i]).removeClass('isClick');
          }, duarution)
        }, showTime);
        showTime += (duarution + 300);
      })(sequency[i]);
    }
    showTime = 0;
    setTimeout(playerGo, (duarution + 300) * sequency.length);
  }

  //获得该关卡的点击序列，lv表示第几关
  function getSequency(lv) {
    var num = [];
    if(lv <= 7) {
      num.push(Math.floor(Math.random()*3));     
    } else if(lv <= 14) {
      num.push(Math.floor(Math.random()*3));
      num.push(Math.floor(Math.random()*3));
    } else {
      for(var i=0; i<3; i++) {
        num.push(Math.floor(Math.random()*3));    
      }
    }
    sequency = sequency.concat(num);
    exampleShow();
  }
  //关卡显示,花费时间：1s
  function showWords(lv) {
    var word;
    if(isNaN(lv)) {
      word = lv;
    } else {
      word = (lv < 10) ? '0'+lv : lv;
    } 
    $count.text(word);
    var flag = true, times = 0;
    //文字闪烁显示
    var inteval = setInterval(function() {
      if(times < 4) {
        if(flag) {
          $count.text('');
          flag = false;
        } else {
          $count.text(word);
          flag = true;
        }
      } else {
        clearInterval(inteval);
      }    
      times++; 
    }, 200);
  }
  
  var playerClick = []; //保存玩家按的顺序
  var n = 0;            //当前按的是第几个

  //玩家可以开始行动
  function playerGo() {
    btn.forEach(function(now) {
      $(now)
        .on('mouseover', function() {$(this).css('cursor', 'pointer');})
        .on('mousedown', function() {          
          $(this).addClass('isClick');
        })
        .on('mouseup', function() {
          $(this).removeClass('isClick');
          playerClick.push(parseInt($(this).attr('id').slice(-1), 10));
          for(var i=0; i<(n+1); i++) {
            //玩家按的方块与期望不一致时发出提示信息
            if(playerClick[i] != sequency[i]) {              
              playerClick.splice(0, playerClick.length);   
              n = 0;         
              playerStop();
              showWords('!!');
              setTimeout(function() {
                $count.text((level<10)?'0'+level:level);
                setTimeout(function() {
                  exampleShow()  
                }, 1100); 
              }, 1000);             
              return;
            }
          }        
          n++;
          //如果按完所有期望的方块则关卡提升，同时清空临时数据
          if(n === sequency.length) {
            playerStop();
            playerClick = [];
            n = 0;
            level++;
            if(level === 4) {
              init();
              return;
            }
            setTimeout(function() {              
              showWords(level);
              setTimeout(function() {
                getSequency(level);  
              }, 1100);              
            }, 500)           
          }
        });
    })
    
  }
  //玩家不能行动
  function playerStop() {
    n = 0;
    $(btn[0]+','+btn[1]+','+btn[2]+','+btn[3])
      .on('mouseover', function() {$(this).css('cursor', 'default');})
      .off('mousedown')
      .off('mouseup');
  }
});

//严格模式和声音未完成