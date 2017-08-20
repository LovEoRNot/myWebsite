var _break = document.getElementById('break'),
    _session = document.getElementById('session'),
    _breakMin = document.getElementById('breakMin'),
    _breakAdd = document.getElementById('breakAdd'),
    _sessionMin = document.getElementById('sessionMin'),
    _sessionAdd = document.getElementById('sessionAdd'),
    _title = document.querySelector('.title'),
    _time = document.querySelector('.time'),
    _clock = document.querySelector('.clock'),
    _wave = document.querySelector('.wave');

var breakTime = 1,
    sessionTime = 5,
    bt = breakTime * 60, 
    st = sessionTime * 60,
    isSession = true, 
    isFirst = true,
    seesionClock, breakClock;

_break.innerHTML = breakTime;
_session.innerHTML = sessionTime;
_breakMin.addEventListener('click', breakMinus);
_breakAdd.addEventListener('click', breakAdd);
_sessionMin.addEventListener('click', sessionMinus);
_sessionAdd.addEventListener('click', sessionAdd);
_clock.onclick = function(e) {
  if(isSession) {
    if(isFirst) {
      isFirst = false;
      _sessionAdd.removeEventListener('click', sessionAdd);
      _sessionMin.removeEventListener('click', sessionMinus);
      setSessionClock();
    } else {
      isFirst = true;
      _sessionMin.addEventListener('click', sessionAdd);
      _sessionAdd.addEventListener('click', sessionMinus);
      clearInterval(seesionClock);
    }      
  } else {
    if(isFirst) {
      isFirst = false; 
      _breakAdd.removeEventListener('click', breakAdd);
      _breakMin.removeEventListener('click', breakMinus);     
      setBreakClock();
    } else {
      isFirst = true;
      _breakMin.addEventListener('click', breakMinus);
      _breakAdd.addEventListener('click', breakAdd);
      clearInterval(breakClock);
    } 
  }
};

function setSessionClock() {
  bt = breakTime * 60;
  _title.innerHTML = 'SESSION';
  _wave.style.background = '#faa';
  
  seesionClock = setInterval(function() {                
    st -- ;
    _wave.style.top = Math.floor((st * 100) / (sessionTime * 60)) + '%';  
    if(st === -1) {
      isSession = false;
      _wave.style.top = '100%';
      clearInterval(seesionClock);
      setBreakClock();
    }
    _time.innerHTML = formatTime(st);
  }, 1000);
}

function setBreakClock() {
  st = sessionTime * 60; 
  _title.innerHTML = 'BREAK';
  _wave.style.background = '#afa';

  breakClock = setInterval(function() {               
    bt -- ; 
    _wave.style.top = Math.floor((bt * 100) / (breakTime * 60)) + '%'; 
    if(bt === -1) {
      isSession = true;
      _wave.style.top = '100%';
      clearInterval(breakClock);
      setSessionClock();
    }      
    _time.innerHTML = formatTime(bt);
  }, 1000);
}

function sessionAdd() {
  sessionChange(1);
  //timeChange(_session, sessionTime, 1);
}
function sessionMinus() {
  sessionChange(-1);
  //timeChange(_session, sessionTime, -1);
}

function breakAdd() {
  breakChange(1);
  //timeChange(_break, breakTime, 1);
}
function breakMinus() {
  breakChange(-1);
 // timeChange(_break, breakTime, -1);
}

// function timeChange(target, targetTime, t) {
//   if((t < 0) && targetTime === Math.abs(t)) {  
//     return; 
//   } else {
//     targetTime += t;
//   }
//   st = targetTime * 60;
//   target.innerHTML = targetTime;
//   if(isSession) {
//     time.innerHTML = targetTime;
//   } 
// }

function sessionChange(t) { 
  if((t < 0) && sessionTime === Math.abs(t)) {  
    return; 
  } else {
    sessionTime += t;
  }
  st = sessionTime * 60;
  _session.innerHTML = sessionTime;
  if(isSession) {
    _time.innerHTML = sessionTime;
  } 
}

function breakChange(t) {
  if((t < 0) && breakTime === Math.abs(t)) {  
    return; 
  } else {
    breakTime += t;
  }
  bt = breakTime * 60;
  _break.innerHTML = breakTime;
  if(!isSession) {
    _time.innerHTML = breakTime;
  } 
}

function formatTime(seconds) {
  var hour = Math.floor(seconds / 3600);
  var minute = Math.floor(seconds / 60);
  var second = seconds % 60;
  second = (second === 0) ? '00' : ((second > 9) ? second : '0' + second); 
  return (hour > 0 ? hour + ':' : '') + minute + 
         ':' + second;
}