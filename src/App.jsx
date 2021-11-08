/* eslint no-eval:0*/
import React, {useState} from 'react'
import words from 'lodash.words'
import Numbers from './components/Numbers'
import Functions from './components/Functions'
import MathOperations from './components/MathOperations'
import SpecOp from './components/SpecOp'
import './App.css'

function App() {
  //Variable Equal
  const [equal, setEqual]=useState(0)
  console.log(equal)
  //Valor mostrado en la Secuencia (seq)
  const [seq,setSeq]=useState("")
  const items_seq = words(seq, /[^-^+^*^/^=]+/g)
  const v_seq = items_seq.length > 0 ? seq : '0';
  
  //Valor mostrado en el Valor (value)
  const [value,setValue]=useState("")
  const v_value = value!=="" ? value : '0';

  //Valor mostrado en el Resultado (result)
  
  const [result, setResult]=useState("0")

  //Funciones
  
  const enterValue = number =>{
    const pattern1=/[\d.]$/

    setSeq(`${seq}${number}`)
        if(pattern1.test(seq))
          setValue(`${value}${number}`)
        else
          setValue(`${number}`)

  } 
 
  const enterExp = (number, num2, texto) => {
    setResult(Math.pow(num2,(number)))
    if(texto==="&radic;" || texto==="<sup>1</sup>/")
      setSeq(`${texto}${num2}`)
      else
      setSeq(`${num2}${texto}`)
  }
   const functDEL = str =>{
    return str.substring(0, str.length - 1)
       }

   const checkLastChar = number =>{
       equal === 0 ? enterValue(number) : setValue("AC? +-*/?")
   }

  //App return
  return (
    <div className="calc-body">
        <div className="result-body">
         
          {/*Value*/}
          <div>
            {v_value}
          </div>
          {/*Sequence*/}
          <div className="operations-sequence"
          dangerouslySetInnerHTML = {{__html : v_seq }}>
            {/* {v_seq} */}
          </div>
           {/*Result*/}
           <div className="result">
          {result}
          </div>
        </div>
        <SpecOp 
              onClickPar = { text =>
                  setSeq(`${seq}${text}`)
                   }
              onClickSqr = { (number,texto) =>{
                  if (v_value==="0")
                  enterExp(number,result,texto)
                  else
                  enterExp(number,value,texto)

                  setEqual(1)
                }
              }
          />
        
        <div className="buttons-body">
          <Numbers onClickNumber = { number =>{
            const pattern1=/[.]/
            if (number==="."){
                if (!pattern1.test(value))
                checkLastChar(number)
                else
                  return
                } 
            else   
                checkLastChar(number)
              }
            }
          
          />
          <div className="functions-body">
            <Functions 
              onClickDel = {() =>{
                if (seq.length > 0 && equal===0){
                const newSeq=functDEL(seq)
                const newValue=functDEL(value)
                setSeq(newSeq)
                setValue(newValue)
                }
              }
               }
               onClickAC = {() =>{
                  setSeq(``)
                  setValue(``)
                  setResult(`0`)
                  setEqual(0)
                }
              }
            />
            <MathOperations
              const onClickOp = {operation =>{
                const pattern2=/\D$/
                if(equal===0)
                    {
                    if(pattern2.test(seq))
                        {
                        const opStack=seq.slice(0,-1)
                        setSeq(`${opStack}${operation}`)
                        }
                        else
                        setSeq(`${seq}${operation}`)
                    }
                      else{
                          if(pattern2.test(seq))
                          {
                          setSeq(`${result}${operation}`)
                          setEqual(0)
                          }
                      }
                  }
              }

              onClickEXP = {number => {
                  setSeq(`${seq}^`)
                }
              }

              onClickEqual = { (text) =>{
                const pattern3=/[+\-*=)>]$/m
                if(pattern3.test(seq))
                  return                 
                else{
                setSeq(`${seq}${text}`)
                setResult(eval(seq).toString())
                setEqual(equal+1)
                setValue("0")
                }
                
              }
             }
              />
          </div>
        </div>
    </div>
  );
}

export default App;
