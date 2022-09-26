import React from 'react';
import "./LoadingSpinner.css";
import {RotatingLines} from "react-loader-spinner";

function LoadingSpinner({isLoading}) {

    return (
        <div className="loadingSpinner" style={{visibility: isLoading && "visible"}}>
            <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="66"
                visible={isLoading}
            />
        </div>
    );
}

export default LoadingSpinner;