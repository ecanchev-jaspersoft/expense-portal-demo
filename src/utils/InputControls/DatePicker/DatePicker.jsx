import './DatePicker.css';

export const DatePicker = ({ label, name, disabled = false }) => {
    return (
        <div className='datepicker'>
            {label && (
                <label htmlFor={name} className='datepicker-label'>
                    {label}
                </label>
            )}
            <input 
                type="date" 
                id={name} 
                name={name} 
                className='datepicker-input' 
                disabled={disabled}
            />
        </div>
    );
};
