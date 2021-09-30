import React from 'react'

const Button = ({text, color, onClick}) => {
    return (
    <button
        style = {
            {
                backgroundColor: color,
            }
        }
        className ='btn'
        onClick = {onClick}
    >
        <b>{text}</b>
    </button>
    )
}

Button.defaultProps = {
    color: 'steelBlue',
}

export default Button
