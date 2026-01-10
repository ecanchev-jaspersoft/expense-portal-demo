import './Dropdown.css';
import { useState } from 'react';

export const Dropdown = ({ options, label, name, origSelectedValue, handleChange, disabled = false }) => {
    const [theVal, setTheVal] = useState(origSelectedValue);

    const handleSelectionChange = (e) => {
        const newVal = e.target.value;
        setTheVal(newVal);
        handleChange?.(newVal);
    };
    return (
        <div className='dropdown-container'>
            {label && (
                <label htmlFor={name} className='dropdown-label'>
                    {label}
                </label>
            )}
            <select id={name} name={name} className='dropdown-select' value={theVal} onChange={handleSelectionChange} disabled={disabled}>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};