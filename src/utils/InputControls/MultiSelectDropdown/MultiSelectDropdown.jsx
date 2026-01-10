import { useState, useEffect, useRef } from 'react';
import { useDisabledState } from '../../../hooks/useDisabledState';
import './MultiSelectDropdown.css';

export const MultiSelectDropdown = ({ label, options, name, handleChange, isLoading = false, disabled = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const selectedOptions = options.filter(opt => opt.selected);
    const { isDisabled, createClickHandler } = useDisabledState(disabled, isLoading);

    // Close dropdown when clicking outside
    useEffect(() => {
        if (!isOpen) return;
        
        const handleClickOutside = (event) => {
            if (!dropdownRef.current?.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const updateOptions = (newSelectedOptions) => {
        const updatedOptions = options.map(opt => ({
            ...opt,
            selected: newSelectedOptions.some(selected => selected.value === opt.value)
        }));
        handleChange(updatedOptions, name);
    };

    const handleOptionClick = (clickedOption) => {
        const newSelectedOptions = clickedOption.selected
            ? selectedOptions.filter(opt => opt.value !== clickedOption.value)
            : [...selectedOptions, clickedOption];
        updateOptions(newSelectedOptions);
    };

    const removeTag = (optionToRemove) => {
        updateOptions(selectedOptions.filter(opt => opt.value !== optionToRemove.value));
    };

    const selectAll = () => {
        updateOptions(options);
    };
    const clearAll = () => {
        updateOptions([]);
    };
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='multi-select-dropdown' ref={dropdownRef}>
            {label && (
                <label className='multi-select-label'>{label}</label>
            )}
            <div className={`multi-select-container ${isLoading ? 'loading' : ''} ${disabled ? 'disabled' : ''}`}>
                <div className='multi-select-tags' onClick={createClickHandler(toggleDropdown)}>
                    {selectedOptions.length > 0 ? (
                        <>
                            {selectedOptions.slice(0, 2).map((option) => (
                                <span key={option.value} className='multi-select-tag'>
                                    {option.label}
                                    <button
                                        type='button'
                                        className='multi-select-tag-remove'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (!isLoading) removeTag(option);
                                        }}
                                        disabled={isLoading}
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                            {selectedOptions.length > 2 && (
                                <span className='multi-select-overflow-indicator'>
                                    +{selectedOptions.length - 2} more
                                </span>
                            )}
                        </>
                    ) : (
                        <span className='multi-select-placeholder'>
                            {isLoading ? 'Loading...' : isDisabled ? 'Disabled' : 'Select options...'}
                        </span>
                    )}
                </div>
                <button
                    type='button'
                    className={`multi-select-arrow ${isOpen ? 'open' : ''} ${isLoading ? 'loading' : ''} ${disabled ? 'disabled' : ''}`}
                    onClick={createClickHandler(toggleDropdown)}
                    disabled={isDisabled}
                >
                    {isLoading ? '⏳' : isDisabled ? '🚫' : '▼'}
                </button>
            </div>
            
            {isOpen && !isDisabled && (
                <div className='multi-select-options'>
                    {/* Select All / Clear All buttons */}
                    <div className='multi-select-actions'>
                        <button
                            type='button'
                            className='multi-select-action-btn'
                            onClick={selectAll}
                            disabled={isDisabled}
                        >
                            Select All
                        </button>
                        <button
                            type='button'
                            className='multi-select-action-btn'
                            onClick={clearAll}
                            disabled={isDisabled}
                        >
                            Clear All
                        </button>
                    </div>
                    
                    {/* Divider */}
                    <div className='multi-select-divider'></div>
                    
                    {/* Options */}
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={`multi-select-option ${option.selected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
                            onClick={createClickHandler(() => handleOptionClick(option))}
                        >
                            <span className='multi-select-option-text'>{option.label}</span>
                            {option.selected && <span className='multi-select-option-check'>✓</span>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
