import React from 'react';
import "./LoadingSpinner.css";
import {RotatingLines} from "react-loader-spinner";

function LoadingSpinner({loading}) {

    return (
        <div className="loadingSpinner" style={{visibility: "visible"}}>
            <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="66"
                visible={true}
            />
        </div>
    );
}

export default LoadingSpinner;