import React from 'react';
import "./Setting.css";

function Setting({defaultValue, labelName, handleInputOnChange}) {

    const handleOnChange = (e) => {
       handleInputOnChange(labelName, e);

    }

    return (
        <div className="setting">
            <label htmlFor="settingInput" className="settingLabel">
                {labelName}
            </label>
            {labelName === "Description"
                ? <textarea onChange={handleOnChange} defaultValue={defaultValue} name="settingInput" />
                : <input onChange={handleOnChange} defaultValue={defaultValue} name="settingInput" type="text" />
            }
        </div>
    );
}

export default Setting;