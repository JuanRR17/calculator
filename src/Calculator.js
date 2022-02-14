import React, {useState} from 'react';
import styled from 'styled-components';
import Numbers from './components/Numbers';
import Functions from './components/Functions';
import MathOperations from './components/MathOperations';
import Result from './components/Result';
import SpecOp from './components/SpecOp';

const Calculator = () => {
    const [seq,setSeq]=useState([]);
    const [value,setValue]=useState("");
    const [result, setResult]=useState(Number(0));
   
    const v_seq = seq.length > 0 ? seq : ['0'];
    const v_value = value!=="" ? value : '0';

    return (
        <div className='row justify-content-center mt-5'>
            <CalcBody className="
            col-10
            col-sm-8
            col-md-6
            col-lg-5
            col-xl-4
            col-xxl-3
            p-3
            p-lg-4
            ">
                <Result 
                    v_value={v_value} 
                    v_seq={v_seq} 
                    result={result}
                />
                <SpecOp 
                    seq={seq} 
                    handleSetSeq={(valor) => setSeq(valor)} 
                    handleSetValue={(valor) => setValue(valor)}
                />
                <div className='buttons-frame'>
                    <Numbers 
                        seq={seq} 
                        value={value} 
                        handleSetSeq={(valor) => setSeq(valor)} 
                        handleSetValue={(valor) => setValue(valor)}
                    />
                    <div className="no-numbers">
                        <Functions 
                            seq={seq} 
                            value={value}
                            handleSetSeq={(valor) => setSeq(valor)} 
                            handleSetValue={(valor) => setValue(valor)}
                            handleSetResult={(valor) => setResult(valor)}
                        />
                        <MathOperations
                            seq={seq} 
                            result={result} 
                            handleSetSeq={(valor) => setSeq(valor)} 
                            handleSetValue={(valor) => setValue(valor)}
                            handleSetResult={(valor) => setResult(valor)}
                        />
                    </div>
                </div>
            </CalcBody>
        </div>
    )
};

export default Calculator;

const CalcBody = styled.div`
    background-color: rgb(75, 75, 75);
    user-select: none;
    border-radius: 8%;
    height: auto;
    box-shadow:0px 0px 20px #777;
    border:10px outset #333;
    display: grid;
    grid-gap:10px;
    font-size:30px;
    .buttons-frame{
        display: grid;
        grid-gap: 10px;
        grid-template-columns: 3fr 2fr;
        .no-numbers{
            display: grid;
            grid-gap: 7px;
        }
    }
`;