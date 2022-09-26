import React from 'react';
import "./Button.css";

function Button({fontSize, text, type, padding, margin}) {
    return (
        <button className="button" type={type}
                style={{fontSize: fontSize + "px", padding: padding, margin: margin}}>
            {text}
        </button>
    );
}

export default Button;