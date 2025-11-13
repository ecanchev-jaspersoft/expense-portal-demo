import { useState } from 'react';
import './SwitchButton.css'; // Assuming you will style the component in a CSS file

const SwitchButton = ({ name, onChange, label }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        const newValue = !isChecked;
        setIsChecked(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <div className='switch-button'>
            {label && <span className='switch-button-text'>{label}</span>}
            <input type='checkbox' id={name} className='switch-button-checkbox' checked={isChecked} onChange={handleToggle} />
            <label className='switch-button-label' htmlFor={name}>
                <span className='switch-button-inner' />
                <span className='switch-button-switch' />
            </label>
        </div>
    );
};

export default SwitchButton;