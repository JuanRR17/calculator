import React from 'react'
import PropTypes from 'prop-types'

/* function strToHTML(text){
    const a=new DOMParser()
    const b=a.parseFromString(text, 'text/html')
    return b
}
 */

const Button = ({text, param, clickHandler, param2}) => {
    return (
        <button onClick={() => clickHandler(param, param2)} dangerouslySetInnerHTML = {{__html : text }}>
                {/* <span>{text}</span> */}
        </button>      
    )
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired,

    //param:PropTypes.oneOfType([PropTypes.string,PropTypes.func]).isRequired
}

export default Button
