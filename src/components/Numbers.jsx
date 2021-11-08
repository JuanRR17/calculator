import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

//const pi= "&pi;";
const point=".";
const numbers =[7,8,9,4,5,6,1,2,3,0, point]

const renderButtons = onClickNumber =>{

    const renderButton = number => (
        <Button
        key={number}
        text={number.toString()}
        param={number.toString()}
        clickHandler={onClickNumber}
        />
    )
    return numbers.map(renderButton)
}

const Numbers = ({onClickNumber}) => {
    return (
        <section className="numbers-body">
            {renderButtons(onClickNumber)}
            {/* <Button key={"dot"} text="." param="." clickHandler={onClickNumber}/> */}
        </section>
    )
}

Numbers.propTypes = {
    onClickNumber: PropTypes.func.isRequired,
}

export default Numbers
