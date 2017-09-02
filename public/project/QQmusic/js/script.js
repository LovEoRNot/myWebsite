$(function() {
  var user = $('.user'),
      exit = $('.exit'),
      musicList = $('.music-show'),
      selectAll = $('#select-all').parent(),
      checkbox = $('.music-checkbox:gt(0)')
  var c = Array.from(checkbox) || Array.prototype.slice.call(checkbox);
  var className = 'music-checkbox-checked';

  user.hover(function() {exit.show()}, function() {exit.hide()});
  musicList.on('mouseover', '.music-detail', function() {
    $(this).find('.music-oprator, .music-oprator-icon').show();
    $(this).find('.time').hide();
  }).on('mouseout', '.music-detail', function() {
    $(this).find('.music-oprator, .music-oprator-icon').hide();
    $(this).find('.time').show();
  });
  selectAll.on('click', function() {   
    if($(this).hasClass(className)) {
      $(this).removeClass(className);
      checkbox.each(function() {$(this).removeClass(className);})
    } else {
      $(this).addClass(className)
      checkbox.each(function() {$(this).addClass(className); })
    } 
  });
  checkbox.on('click', function() {
    $(this).toggleClass(className);
    var isAll = c.every(function(item) { return $(item).hasClass(className);});
    if(isAll) {selectAll.addClass(className);} 
    else {selectAll.removeClass(className);}
  })
});

$(function() {
  var menuPlay = $('#menu-play'),
      btnPlay = $('#btn-play'),
      btnRandom = $('#btn-random'),
      btnLike = $('#btn-like'),
      btnClean = $('#btn-clean'),
      btnVoice = $('#btn-voice'),
      top = $('.top'),
      cleanPattern = $('.clean-pattern'),
      mp3 = $('#mp3')[0];
  var randomList = ['btn-random', 'btn-single', 'btn-all', 'btn-sequence'], index = 0;

  $('#menu-play, #btn-play').on('click', function() {
    var i = btnPlay.children(), j = menuPlay.children();
    if(i.hasClass('btn-stop')) {mp3.pause();} 
    else {mp3.play()}
    i.toggleClass('btn-stop'); j.toggleClass('menu-stop'); 
  });
  btnRandom.click(function() {
    var i = $(this).children()
    var className = i.prop('class');
    changeClass(i, className, randomList[index]);
    index = (index + 1) % randomList.length
  });
  btnLike.click(function() {$(this).children().toggleClass('btn-red-like')});
  btnClean.click(function() {
    if($(this).children().hasClass('btn-clean-on')) {
      top.show(); cleanPattern.hide();
    } else {
      top.hide(); cleanPattern.show();
    }
    $(this).children().toggleClass('btn-clean-on');
  });
  btnVoice.click(function() {
    $(this).children().toggleClass('btn-voice-off');
    if(mp3.muted) { mp3.muted = false}
    else { mp3.muted = true}
  });


  var musicDot = $('#music-dot'),    //进度条上的圆点
      musicPlay = $('#music-play'),  //已播放的进度条
      voicePlay = $('#voice-play'),
      voiceDot = $('#voice-dot'),
      musicProgress = $('#music-dot').parents('.progress-down'),
      voiceProgress = voicePlay.parent();
  var duration;
  
  //音乐能够播放时触发
  mp3.oncanplay = function() {
    duration = mp3.duration
    time = secToMin(duration);
    $('#time, #total').text(time);
    mp3.volume = .5;
    $('.lds-css').hide();
  };
  musicProgress.on('mousedown', function(e) {
    e = e || window.event;
    setmusicPlayWidth(e);
  });
  musicDot.on('mousedown', function() {
    $(window).on('mouseover', function(e) {
      e = e || window.event;
      setmusicPlayWidth(e);
    }).on('mouseup', function() {$(this).off('mouseover');})
  })
  voiceProgress.on('mousedown', function(e) {
    e = e || e.pageX;
    setvoicePlayWidth(e);
  })
  voiceDot.on('mousedown', function() {
    $(window).on('mouseover', function(e) {
      e = e || window.event;
      setvoicePlayWidth(e);
    }).on('mouseup', function() {$(this).off('mouseover');})
  })
  mp3.ontimeupdate = function() {
    $('#now').text(secToMin(mp3.currentTime));
    var width = (mp3.currentTime / duration) * 100; 
    musicPlay.css('width', width + '%');
  }

  function setvoicePlayWidth(e) {
    var x = e.pageX;
    var offsetLeft = voiceProgress.offset().left;
    var high = (x - offsetLeft) / voiceProgress.width();
    if(high > 1) high = 1;
    if(high < 0) high = 0;
    voicePlay.css('width', high * 100 + '%');
    mp3.volume = high.toFixed(1);
  }
  function setmusicPlayWidth(e) {
    var x = e.pageX;
    var offsetLeft = musicProgress.offset().left;
    var width = ((x - offsetLeft) / musicProgress.width()) * 100;
    if(width > 100) width = 100;
    if(width < 0) width = 0;
    musicPlay.css('width', width + '%');
    mp3.currentTime = (width * duration) / 100;
    $('#now').text(secToMin(mp3.currentTime));
  }
  function secToMin(second) {
    second = Math.round(second);
    var min = Math.floor(second / 60);
    min = min < 10 ? '0' + min : min;
    var sec = second - min * 60;
    sec = sec < 10 ? '0' + sec : sec;
    return  min + ':' + sec;
  }
  function changeClass(el, oldClass, newClass) {
    if(el.hasClass(oldClass) && (oldClass !== newClass)) {
      el.removeClass(oldClass).addClass(newClass);
    }
  }
});

$(function() {
  var Sscroll = $('#s-scroll'), Cscroll = $('#c-scroll');
      nowPosi = Sscroll.offset().top - Sscroll.parent().offset().top - 10;  //歌词当前所在的位置
  $('#s-scroll, #c-scroll').on('mousedown', function(e) {
    e = e || window.event;
    lyricSrcoll(e, $(this))
  });

  function lyricSrcoll(e, el) {
    var offset = 0, clickPosiY = e.pageY;
    var lyricHeigth = el.height(),
        wrapHeight = el.parent().height() - 30;
    $(window).on('mouseover', function(e) {
      e = e || window.event;
      var pageY = e.pageY;     
      offset = (pageY - clickPosiY) > 0 ? 10 : -10;
      clickPosiY = pageY;
      nowPosi += offset;
      if(nowPosi > 0) nowPosi = 0;
      else if(nowPosi < -lyricHeigth + wrapHeight) nowPosi = -lyricHeigth + wrapHeight;
      el.css({
        'transition': 'transform .5s ease-out',
        'transform': 'translate3d(0px, ' + nowPosi +'px, 0px)',
      })
    }).on('mouseup', function() {$(this).off('mouseover');})
  }
});