// while(line=readline()){    
    var line = 'ASDATSDSFSDFSDFATCG';
    var DNA = ['A', 'T', 'C', 'G'];
    var result = '', temp = '';
    
    for(var i=0; i<line.length; i++) {
        if(DNA.indexOf(line.charAt(i)) !== -1 ) {           
            temp += line.charAt(i);
        } else {
            if(temp.length > result.length) {               
                result = temp;
            }
            temp = '';
        }
    }
    if((temp.length > 0) &&(temp.length > result.length)) {              
        result = temp;
        temp = '';
    }
    
    console.log(result.length)

//     print(result.length);
// }