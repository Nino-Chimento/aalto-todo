import React, { FC } from 'react';
import './switch.css';

interface SwitchProps {
    handleChange:(e:boolean) => void
}

export const Switch:FC<SwitchProps> = ({handleChange}) => {
    
    

  return (
    <>
      <input
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
        onChange={(e) => handleChange(e.target.checked)}
      />
      <label
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

