import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { lastSequenceCharFunct } from '../utils/Constants';
import { finalCalculation,checkPar } from '../utils/equalCalculation';
import { patternEq } from '../utils/Patterns';
import styled from 'styled-components';

const operations = [
{text:"X",param:"*"},
{text:"/",param:"/"},
{text:"+",param:"+"},
{text:"-",param:"-"}
];

const renderButtons = onClickOp =>{

    const renderButton = operation => (
        
        <Button
            key={operation.text}
            text={operation.text}
            param={operation.param}
            clickHandler={onClickOp}
        />
        )
    
    return operations.map(renderButton);
};

const MathOperations = (props) => {
    const {seq, 
        handleSetSeq, 
        result, 
        handleSetValue, 
        handleSetResult
    } = props;
    
    const onClickOp = operation =>{
        replaceOperator(operation);
        handleSetValue("");
    };

    const replaceOperator = operation =>{
        switch (lastSequenceCharFunct(seq)){
            case "=":{
                handleSetSeq([result,operation]);
                break;
                }
            case "+":
            case "-":
            case "*":
            case "/":
            case ".":
            case "^":{
                const opStack=seq.slice(0,-1);
                handleSetSeq([...opStack, operation]);
                break;  
                }
            default:{
                handleSetSeq([...seq, operation]);
                break;
                }
        }
    }
    const onClickEqual = (text) =>{
        let eqStack=seq;
        if(checkPar(seq)){
        if(patternEq.test(lastSequenceCharFunct(seq))){
            eqStack=seq.slice(0,-1);
            handleSetSeq(eqStack);            
            }
        handleSetSeq([...eqStack, `${text}`]);
        handleSetResult(finalCalculation(eqStack));
        handleSetValue("0");
        }
    };
    return (
        <OperationsContainer>
            {renderButtons(onClickOp)}
            <Button key={"EXP"} text={"EXP"} param={"^"}  clickHandler={replaceOperator} />
            <Button key={"="} text={"="} param={"="} clickHandler={onClickEqual}/>    
        </OperationsContainer>        
    )
};

MathOperations.propTypes = {
    handleSetSeq: PropTypes.func.isRequired,
    handleSetValue: PropTypes.func.isRequired,
    handleSetResult: PropTypes.func.isRequired,
    result: PropTypes.number.isRequired
};

export default MathOperations;

const OperationsContainer = styled.div`
    display: grid;
    grid-gap: 7px;
    grid-template-columns: 1fr 1fr;    
`;

