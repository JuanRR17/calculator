import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import styled from 'styled-components';
import { lastSequenceCharFunct } from '../utils/Constants';
import { pattern1,patternComa,patternDec,pattern0 } from '../utils/Patterns';

const pi= {text:"π", param:"π"};
const dot=".";
const numbers =[7,8,9,4,5,6,1,2,3,0, dot];

const renderButtons = onClickNumber =>{

    const renderButton = number => (
        <Button
        key={number}
        text={number.toString()}
        param={number}
        clickHandler={onClickNumber}
        />
    )
    return numbers.map(renderButton);
};

const Numbers = (props) => {
    const {
        seq, 
        value, 
        handleSetSeq, 
        handleSetValue
    } = props;

    const enterValue = number =>{
        handleSetSeq([...seq, number])
            if(pattern1.test(lastSequenceCharFunct(seq)))
                handleSetValue(`${value}${number}`);
            else
                handleSetValue(`${number}`);
    }; 
      
    const checkLastChar = number =>{
        lastSequenceCharFunct(seq) !== "=" ? enterValue(number) : handleSetValue("AC? +-*/?");
    };
  
    const onClickNumber = (number) => {
        switch (number) {
            case ".":{
            if ((!patternComa.test(value) && patternDec.test(lastSequenceCharFunct(seq))) || value==="")
                checkLastChar(number);
                else
                    return;
                break;
            }
            case 0:{
                if(value!==""){
                    checkLastChar(number);
                }
                else{
                    return;
                }
                break;
            }
            default:{
                if(pattern0.test(value) && lastSequenceCharFunct(seq)===0){
                    let zeroSeq=seq.splice(-1,1);
                    handleSetValue("");
                    handleSetSeq([...zeroSeq, number]);
                    checkLastChar(number);
                }
                else
                    checkLastChar(number);
            }
        }
    }; 
       
    const onClickPI = (number) =>{
        if(!pattern1.test(lastSequenceCharFunct(seq)))
            checkLastChar(number);
    };

    return (
        <NumbersContainer>
            {renderButtons(onClickNumber)}
            <Button key={"pi"} text={pi.text} param={pi.param} clickHandler={onClickPI}/>
        </NumbersContainer>
    )
};

Numbers.propTypes = {
    seq:PropTypes.array.isRequired,
    value:PropTypes.string.isRequired,
    handleSetSeq: PropTypes.func.isRequired,
    handleSetValue: PropTypes.func.isRequired,
};

export default Numbers;

const NumbersContainer = styled.div`
    display: grid;
    grid-gap:7px;
    grid-template-columns:auto auto auto;
`;