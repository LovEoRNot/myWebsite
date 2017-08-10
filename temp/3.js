// while(line=readline()){
    var line = 'abc';
    var len = line.length,
        subLen = 0;
        arr = line.split('');
    process(arr);
    len = (subLen < len) ? subLen : len;

    console.log(len);

//     print(a+b);
// }

function process(arr) {
  var p = [];
  arr.forEach(function(val) {
      p.push(val);
  })
    console.log('p='+p)
  if(arr.length === 1) {
    return arr[0];
  } else {
    for(var i=0; i < arr.length; i++) {
      var temp = arr[i];  
      p.splice(i, 1);  
      temp += process(p);
      console.log(temp)
      if(isHuiWen(temp)) {       
        subLen++;
      }
    }
  }
}

function isHuiWen(str) {
  for(var i=0; i < Math.floor(str.length / 2); i++) {
    if(str.charAt(i) !== str.charAt(str.length - 1 - i)) {
      return false;
    }
  }
  return true;
}
