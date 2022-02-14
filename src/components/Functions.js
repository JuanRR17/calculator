import React from 'react';
import Button from './Button';
import styled from 'styled-components';

const Functions = (props) => {
    const {
        seq, 
        value, 
        handleSetSeq, 
        handleSetValue, 
        handleSetResult
    } = props;
    
    const functDEL = str =>{
    return str.slice(0,-1);
        }
    
    const onClickDel = () =>{
        if (seq.length > 0 && seq[seq.length-1]!== "="){
            const newSeq=functDEL(seq);
            const newValue=functDEL(value);
            handleSetSeq(newSeq);
            handleSetValue(newValue);
            }
    };

    const onClickAC = () =>{
        handleSetSeq([]);
        handleSetValue(``);
        handleSetResult(Number(0));
    };

    return(
    <FunctionsBody>
        <Button 
            text="DEL"
            clickHandler = {onClickDel}
            color='red'
        />
        <Button
            text="AC"
            clickHandler = {onClickAC}
            color='red'
        />
    </FunctionsBody>
    )
};

export default Functions;

const FunctionsBody = styled.div`
    display: grid;
    grid-gap: 7px;
    grid-template-columns: 1fr 1fr;
`;