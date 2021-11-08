import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

const Functions = ({onClickDel, onClickAC}) => {
        return(
        <section className="functions">
            <Button 
                text="DEL"
                clickHandler = {onClickDel}
            />
            <Button
                text="AC"
                clickHandler = {onClickAC}
            />
        </section>
        )
}

Functions.propTypes = {
    onClickDel: PropTypes.func.isRequired,
    onClickAC: PropTypes.func.isRequired,
}

export default Functions
