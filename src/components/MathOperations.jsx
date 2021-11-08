import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

const operations = [
    "*","/","+","-"
]


const renderButtons = onClickOp =>{

    const renderButton = operation => (
        
        <Button
        key={operation}
        text={operation}
        param={operation}
        clickHandler={onClickOp}
        />
        )
    
    return operations.map(renderButton)
}

const MathOperations = ({onClickOp, onClickEqual, onClickEXP}) => {
    return (
        <section className="math-operations">
            {renderButtons(onClickOp)}
            {/* <Button key={"EXP"} text={"EXP"}  clickHandler={onClickEXP}/> */}
            <Button key={"="} text={"="} param={"="} clickHandler={onClickEqual}/>
        </section>

    )
}

MathOperations.propTypes = {
    onClickEqual: PropTypes.func.isRequired,
    onClickOp: PropTypes.func.isRequired,
    onClickEXP: PropTypes.func.isRequired
}

export default MathOperations