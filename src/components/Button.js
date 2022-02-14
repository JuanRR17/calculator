import React from 'react';
import styled from 'styled-components';

const Button = (props) => {
    const {
        text, 
        param, 
        clickHandler, 
        param2, 
        color
    } = props;
   
    return (
        <div>
            <ButtonContainer 
                onClick={() => clickHandler(param, param2)}
                color={color}
                className={color === 'specOp' ? color : ''}
            >
                <span>{text}</span>
            </ButtonContainer> 
        </div>
 
    )
}

export default Button;

Button.defaultProps = {
    color: 'grey'
};

const ButtonContainer = styled.div`
    border-radius: 10px;
    color: white;
    font-size: 0.8em;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    border: 3px outset white;
    transition:color 500ms;
    transition:border 500ms;
    text-align: center;
    outline:2px solid rgb(0,0,0,0.6);
    background-color: ${props => props.color};
        :hover{
            color:#555;
            border-color:#555;
        }
        :active{
            transform: scale(0.9,0.9);
        }
    &.specOp{
        background-color: black;
        font-weight: 900;
        text-align: center;
        font-size: 0.7rem;
        border-radius: 8px;
    }

`;