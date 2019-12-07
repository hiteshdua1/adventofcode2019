var data = [3,8,1001,8,10,8,105,1,0,0,21,46,59,84,93,110,191,272,353,434,99999,3,9,101,2,9,9,102,3,9,9,1001,9,5,9,102,4,9,9,1001,9,4,9,4,9,99,3,9,101,3,9,9,102,5,9,9,4,9,99,3,9,1001,9,4,9,1002,9,2,9,101,2,9,9,102,2,9,9,1001,9,3,9,4,9,99,3,9,1002,9,2,9,4,9,99,3,9,102,2,9,9,1001,9,5,9,1002,9,3,9,4,9,99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,99];


function getValue(mode,arr,index){
    switch(mode) {
        case 0:
            return arr[arr[index]];
        case 1:
            return arr[index];
    }
}

var secondInputInstruction = 0;

function programAlarm(arr, inputInstruction) {
    let i=0;
    let inputInstructionCount =0;
    while(true) {
        let opCode;
        let inp1=0,inp2=0,out1=0
        if(arr[i]===99) {
            break;
        }
        if((''+arr[i]).length>1) {
            opCode = arr[i]%100;
            [inp1=0,inp2=0,out1=0] = (''+Math.floor(arr[i]/100)).split('').reverse().map(Number);
        } else {
            opCode = arr[i];
        }

        let firstVal = getValue(inp1,arr,i+1);
        let secondVal = getValue(inp2,arr,i+2);
        if(opCode===1) {
            out1?arr[i+3]:arr[arr[i+3]]= firstVal + secondVal;
            i+=4;
        }
        if(opCode===2) {
            out1?arr[i+3]:arr[arr[i+3]]=firstVal * secondVal;;
            i+=4;
        }

        if(opCode===3) {
            // store at the position
            if(inputInstructionCount===1) {
                arr[arr[i+1]]=secondInputInstruction;    
            } else {
                arr[arr[i+1]]=inputInstruction;
            }
            inputInstructionCount++;
            i+=2;
        }
        if(opCode===4) {
            if(getValue(inp1,arr,i+1)===0) {
                i+=2;   
            }else {
//                 console.log("Hola " + getValue(inp1,arr,i+1));
                secondInputInstruction = getValue(inp1,arr,i+1);
                return secondInputInstruction;
            }
            
        }
        if(opCode===5) {
            if(firstVal !== 0){
                i=secondVal;   
            } else {
                i +=3;
            }
        }
        if(opCode===6) {
            if(firstVal === 0){
                i=secondVal;   
            } else {
                i +=3;
            }
        }
        if(opCode===7) {
            if(firstVal < secondVal){
                out1?arr[i+3]:arr[arr[i+3]] =1;
            } else {
                out1?arr[i+3]:arr[arr[i+3]] =0;
            }
            i+=4;
        }
        if(opCode===8) {
            if(firstVal === secondVal){
                out1?arr[i+3]:arr[arr[i+3]] =1;
            } else {
                out1?arr[i+3]:arr[arr[i+3]] =0;
            }
            i+=4;
        }

    }

    return i;   
}


var permArr = [],
  usedChars = [];

function permute(input) {
  var i, ch;
  for (i = 0; i < input.length; i++) {
    ch = input.splice(i, 1)[0];
    usedChars.push(ch);
    if (input.length == 0) {
      permArr.push(usedChars.slice());
    }
    permute(input);
    input.splice(i, 0, ch);
    usedChars.pop();
  }
  return permArr
};

var allPossibleCombinations = permute([0,1,2,3,4]);
var maxSize = 0;
for(let i=0;i<allPossibleCombinations.length;i++) {
    secondInputInstruction = 0;
    for (let j=0;j<allPossibleCombinations[i].length;j++) {
        let ans = programAlarm([...data,...data,...data,...data,...data],allPossibleCombinations[i][j]);
        if (ans>maxSize) {
            maxSize = ans;
        }
    }
}

console.log(maxSize);