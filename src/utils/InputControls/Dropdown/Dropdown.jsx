import './Dropdown.css';
import { useState } from 'react';

export const Dropdown = ({ options, label, name, origSelectedValue }) => {
    const [theVal, setTheVal] = useState(origSelectedValue);
    return (
        <div className='dropdown-container'>
            {label && (
                <label htmlFor={name} className='dropdown-label'>
                    {label}
                </label>
            )}
            <select id={name} name={name} className='dropdown-select' value={theVal} onChange={(e) => setTheVal(e.target.value)}>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};