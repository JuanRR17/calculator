import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { lastSequenceCharFunct } from '../utils/Constants';
import { pattern1 } from '../utils/Patterns';
import styled from 'styled-components';

const spOp = [
    {texto:<>&radic;</>, exp:1/2, addSeq:["√","("]}, //&radic;"√"
    {texto:<><sup>1</sup>/<sub>x</sub></>, exp:-1, addSeq:[1,"/"]},
    {texto:<>x<sup>2</sup></>, exp:2, addSeq:["^",2]},
    {texto:<>x<sup>3</sup></>, exp:3, addSeq:["^",3]}
];

const renderButtons = onClickSqr => {

    const renderButton = number => (
        <Button
            key={number.exp}
            text={number.texto}
            param={number.exp}
            param2={number.addSeq}
            clickHandler={onClickSqr}
            color="specOp"
        />
    );
    return spOp.map(renderButton);
};     

const SpecOp = (props) => {
    const {
        seq, 
        handleSetSeq, 
        handleSetValue
    } = props;

    const onClickPar = () =>{
        let cont = 0;
        for(let i=0; i<seq.length;i++){
            if(seq[i]==="(")
                cont++;
            if(seq[i]===")")
                cont--;
        }
        if(lastSequenceCharFunct(seq) !== "="){
            if(cont > 0){
                if(pattern1.test(lastSequenceCharFunct(seq))|| lastSequenceCharFunct(seq)===")"){
                    handleSetSeq([...seq,")"]);
                }
                else{
                    handleSetSeq([...seq,"("]);
                }
            }
            else{
                if(pattern1.test(lastSequenceCharFunct(seq)) || lastSequenceCharFunct(seq)===")"){
                    handleSetSeq([...seq,"*","("]);
                }
                else{
                    handleSetSeq([...seq,"("]);
                }
            }
        }
        else{
            handleSetValue("AC? +-*/?");
        }
    };

    const enterExp = (addSeq) => {
        handleSetSeq([...seq, addSeq[0], addSeq[1]]);
    };

    const onClickSqr = (exp,addSeq) =>{
        switch (exp){
            case 0.5:
            case -1:{
                if(!pattern1.test(lastSequenceCharFunct(seq))){
                    enterExp(addSeq);
                }
                break;
                }
            default:{
                if(pattern1.test(lastSequenceCharFunct(seq))){
                    enterExp(addSeq);
                }
                break;
                }
            }
        };

    return (
        <SpecOpContainer className="specOp">
            <Button key={"("} color="specOp" text="( )" clickHandler={onClickPar}/>
            {renderButtons(onClickSqr)}
        </SpecOpContainer>
    )
};

SpecOp.propTypes = {
    seq:PropTypes.array.isRequired,
    handleSetSeq:PropTypes.func.isRequired,
    handleSetValue:PropTypes.func.isRequired,
};

export default SpecOp;

const SpecOpContainer = styled.div`
    display: grid;
    grid-template-columns:auto auto auto auto auto;
    grid-gap:10px;
`;