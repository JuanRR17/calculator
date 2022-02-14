
//CHECKS
let pattern1=["*","/"];
let pattern2=["+","-"];
let pattern3=["(",")"];
let patternSqr=["√","^"];
let patternPI=["π"];

const findMathOp1 = (op) => {
  return (op === "*" || op === "/");
}

const findMathOp2 = (op) => {
  return (op === "+" || op === "-" || op === "*" || op === "/");
}

const findSqr = (op) => {
  return (op === "√" || op === "^");
}
const findPI = (op) => {
  return (op === "π");
}

const checkOperation = (array,pattern) => {
  return array.some(r=>pattern.indexOf(r)>=0);
}

// CHECK PARENTESIS ARE EVEN
export const checkPar = array => {
 let par1=0;
 let par2=0;
  for(let i=0;i<array.length;i++){
    if (array[i]==="(")
      par1++;
    if (array[i]===")")
      par2++;
  }   
  if(par1===par2)
    return true;
  else
     return false;
}


//GET NUMBERS
const getFirstNumber = (array,n) => {
    let num1=array.slice(0,n);
    num1=num1.reverse();
    let m = num1.findIndex(findMathOp2);
    if(m===-1){
      m=num1.length;
    }
    num1=num1.slice(0,m);
    num1=num1.reverse();
    let a=arrayToNumber(num1);
    return [a,m];
}

const getSecondNumber = (array,n) => {
  let num2=array.slice(n+1);
  let p = num2.findIndex(findMathOp2);
  if(p===-1){
    p=num2.length;
  }
  num2=num2.slice(0,p)
  let b=arrayToNumber(num2);

  return [b,p];
}
const arrayToNumber = array => {
  array=array.reverse();
  let a=parseFloat(0);
  let coma=array.findIndex((a)=> a===".");

  if(coma===-1){
    for(let i=0;i<array.length;i++){
      a=a+(array[i]*Math.pow(10,i));
    }
  }
  else{
    let b=array.slice(coma+1);
    for(let j=0;j<b.length;j++){
      a=a+(b[j]*Math.pow(10,j));
  }
  let c=array.slice(0,coma);
  c=c.reverse();
    for(let k=0;k<c.length;k++){
      a=parseFloat(a)+parseFloat(c[k]*Math.pow(10,-k-1));
    }
  }
    return a;
}
const newArray = (array,n,m,p,newNumber) => {
  const init=n-m;
  const cant_remove=m+p+1;
  array.splice(init,cant_remove,newNumber);

  return array;
}

//MATH OPERATIONS
const singleOperation = (n1,op,n2) => {
  switch (op){
      case "*":{
          let a=n1*n2;
          return a;
        }
      case "/":{
        let a=n1/n2;
        return a;
      }
      case "+":{
        let a=n1+n2;
        return a;
      }
      case "-":{
        let a=n1-n2;
        return a;
      }
      case "√":
      case "^":
          {
        let a=Math.pow(n1,n2);
        return a;
      }
      default:
        break;
    }
}

const solveSimpleOperation = (array,findMathOp) => {
  let n = array.findIndex(findMathOp);
  let resultArray=[];
  if(n !== -1 ){
      if(array[n]==="√"){
        const[b,p]=getSecondNumber(array,n);
        const resultNumber=singleOperation(b,array[n],1/2);  
        resultArray=newArray(array,n,0,p,resultNumber);
      }
      else{
        //GET FIRST NUMBER OF THE OPERATION
        const[a,m]=getFirstNumber(array,n);
        //GET SECOND NUMBER OF THE OPERATION 
        const[b,p]=getSecondNumber(array,n);
        const resultNumber=singleOperation(a,array[n],b);
        resultArray=newArray(array,n,m,p,resultNumber);
      }

   return resultArray;
   }
}

//SOLVE PARENTESIS
const isolatePar = array => {
  let index1=0;
  let index2=0;
    for(let i=0;array[i]!==")";i++){
      if (array[i]==="("){
        index1=i;
        }
      index2=i+1;
      }
      let isolPar=array.slice(index1+1,index2);
  return [isolPar,index1,index2];
}

//REPLACE PI
const replacePI = array => {
  let n = array.findIndex(findPI);
  return array.splice(n,1,Math.PI);
}

//SOLVING
const finalChecks = (array,pattern,findOp) => {
  let newArray=array;
  if(checkOperation(newArray,pattern)){
    do{
      newArray=solveSimpleOperation(newArray, findOp); //checks
    }while(checkOperation(newArray,pattern))
  }
  return newArray;
}

const calculate = array => {
  let newArray=array;

  if(checkOperation(newArray,patternPI)){         // checks and replaces π for its value
    do{
      replacePI(newArray);
    }while(checkOperation(newArray,patternPI))
  }

  newArray=finalChecks (newArray,patternSqr,findSqr);    //checks √ and ^
  newArray=finalChecks (newArray,pattern1,findMathOp1);  //checks * and /

  if(checkOperation(newArray,pattern2)){
  do{
    newArray=solveSimpleOperation(newArray, findMathOp2) //checks + and -
  }while(checkOperation(newArray,pattern2))
}
  else{
    newArray=arrayToNumber(array);
  }
  return parseFloat(newArray);
}

export const finalCalculation = array => {
  let parArray=array;
  let parSolved;
  if(checkOperation(parArray,pattern3) && checkPar(parArray)){  // checks parentesis
    do{
      const [isolPar,index1,index2]=isolatePar(parArray);        // isolates parentesis
      parSolved=calculate(isolPar);                              // calculates parentesis
      parArray=newArray(parArray,index1,0,index2-index1,parSolved); //updates array
    }while(checkOperation(parArray,pattern3) && checkPar(parArray))
  }
  parArray=calculate(parArray); 
  return parArray;
}