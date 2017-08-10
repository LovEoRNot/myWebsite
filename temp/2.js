 //while(line=readline()){
     var line = 'abaababaab'
    var temp = line,
        len = 0;
    while(true) {
      temp = temp.slice(0, -1);
      if(isEvenString(temp)) {
        len = temp.length;
        break;
      }
    }
    
    console.log(len);


//    print(len);
//}

function isEvenString(str) {
  if((str.length) % 2 !== 0) return false;

  var head = str.substr(0, str.length / 2);
  var foot = str.substr(str.length / 2);

  if(head === foot) return true;
  return false;
}


