import { useState } from 'react';
import './SwitchButton.css'; // Assuming you will style the component in a CSS file

const SwitchButton = ({ name, onChange, label, origIsChecked }) => {
    const [isChecked, setIsChecked] = useState(origIsChecked || false);

    const handleToggle = () => {
        const newValue = !isChecked;
        setIsChecked(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <div className='switch-button'>
            <input type='checkbox' id={name} className='switch-button-checkbox' checked={isChecked} onChange={handleToggle} />
            <label className='switch-button-label' htmlFor={name} for={name}>
                <span className='switch-button-inner' />
                <span className='switch-button-switch' />
            </label>
            {label && <span className='switch-button-text'>{label}</span>}
        </div>
    );
};

export default SwitchButton;