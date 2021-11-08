import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

const spOp = [
    {"texto":"&radic;", "exp":1/2, "seq":"&radic;"},
    {"texto":"<sup>1</sup>/<sub>x</sub>", "exp":-1, "seq":"<sup>1</sup>/"},
    {"texto":"x<sup>2</sup>", "exp":2, "seq":"<sup>2</sup>"},
    {"texto":"x<sup>3</sup>", "exp":3, "seq":"<sup>3</sup>"},
]

const renderButtons = onClickSqr => {

    const renderButton = number => (
        <Button
            key={number.exp}
            text={number.texto}
            param={number.exp}
            param2={number.seq}
            clickHandler={onClickSqr}
        />
    )
    return spOp.map(renderButton)
}

const SpecOp = ({onClickPar, onClickSqr}) => {
    return (
        <section className="spec-operations">
            <Button key={"("} text={"("} param={"("} clickHandler={onClickPar}/>
            <Button key={")"} text={")"} param={")"} clickHandler={onClickPar}/>
            {renderButtons(onClickSqr)}
        </section>
    )
}

SpecOp.propTypes = {
    onClickPar:PropTypes.func.isRequired,
    onClickSqr:PropTypes.func.isRequired,
}

export default SpecOp
