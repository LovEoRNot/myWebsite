var panel = document.querySelector('.panel');
var sum = document.getElementById('sum');
var old = document.getElementById('oldNum');
var firstNum = '',
    secondNum = '',
    positive = true, equal = false,
    oprator, type;

panel.addEventListener('click', function(e) {
  var el = e.target || e.srcElement;
  type = el.getAttribute('data-controle');
  caculator(el, type);
});

function caculator(el, type) {
  switch(type) {
    case 'SEV':
    case 'EIG':
    case 'NIG':    
    case 'FOR':
    case 'FIV':
    case 'SIX': 
    case 'ONE':
    case 'TWO':
    case 'THR':  
    case 'ZER': 
      if(equal) {
        firstNum = '0';
        equal = false;
      }
      firstNum += el.innerHTML;   
      firstNum = parseFloat(firstNum);  
      break; 
    case 'ACE':     
      firstNum = '0';
      secondNum = '';
      break;
    case 'DEL':
      if(firstNum !== '0') {
        if(firstNum.length > 1) {
          firstNum = firstNum.slice(0, -1); 
        } else {
          firstNum = '0';
        }         
      }         
      break;
    case 'PER':
    case 'DIV':
    case 'MUL':
    case 'MIN':
    case 'ADD':    
      if(firstNum !== '0') {
        getResult(oprator);
      }
      oprator = type;
      secondNum = firstNum;
      firstNum = '0';
      break;
    case 'PON':
      if(positive) {
        positive = false;
        firstNum = '-' + firstNum;
      } else {
        positive = true;
        firstNum = firstNum.slice(1);
      }      
      break;
    case 'POI':
      if(equal) {
        firstNum = '0';
        equal = false;
      }
      firstNum += '.';
      break;
    case 'EQU':     
      getResult(oprator);
      equal = true;
      return 0;   
  }
  old.value = secondNum;
  sum.value = firstNum;
  firstNum = '' + firstNum;
}

function getResult(op) {
  var total;
  switch(op) {
    case 'PER':
      total = secondNum % firstNum;
      break;
    case 'DIV':
      if(firstNum !== '0') {
        total = secondNum / firstNum;
      } else {
        return;
      }    
      break;
    case 'MUL':
      total = secondNum * firstNum;
      break;
    case 'MIN':
      total = secondNum - firstNum;
      break;
    case 'ADD':
      total = parseFloat(firstNum) + parseFloat(secondNum);      
      break;
    default:
      total = firstNum; 
      break;
  }
  oprator = ''; 
  firstNum = total;
  old.value = '';
  sum.value = total;
}