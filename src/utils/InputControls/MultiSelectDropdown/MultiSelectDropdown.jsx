import { useState, useEffect, useRef } from 'react';
import './MultiSelectDropdown.css';

/**
 * MultiSelectDropdown component - Dropdown with tag-based multi-select functionality
 * @param {Object} props - Component props
 * @param {string} props.label - Label for the dropdown
 * @param {Array<{value: string, label: string, selected: boolean}>} props.options - Available options with selection state
 * @param {string} props.name - Name identifier for the dropdown
 * @param {Function} props.handleChange - Handler for selection changes (selectedOptions, controlId)
 */
export const MultiSelectDropdown = ({ label, options, name, handleChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Derive selected options from props instead of maintaining separate state
    const selectedOptions = options.filter(opt => opt.selected);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        // Add event listener when dropdown is open
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Cleanup event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (clickedOption) => {
        let newSelectedOptions;
        
        if (clickedOption.selected) {
            // Remove from selection
            newSelectedOptions = selectedOptions.filter(opt => opt.value !== clickedOption.value);
        } else {
            // Add to selection
            newSelectedOptions = [...selectedOptions, clickedOption];
        }

        // Update options structure to reflect selection changes
        const updatedOptions = options.map(opt => ({
            ...opt,
            selected: newSelectedOptions.some(selected => selected.value === opt.value)
        }));

        // Call parent handler with full updated structure
        handleChange(updatedOptions, name);
    };

    const removeTag = (optionToRemove) => {
        const newSelectedOptions = selectedOptions.filter(opt => opt.value !== optionToRemove.value);
        
        // Update options structure
        const updatedOptions = options.map(opt => ({
            ...opt,
            selected: newSelectedOptions.some(selected => selected.value === opt.value)
        }));

        handleChange(updatedOptions, name);
    };

    const selectAll = () => {
        // Select all options
        const updatedOptions = options.map(opt => ({
            ...opt,
            selected: true
        }));

        handleChange(updatedOptions, name);
    };

    const clearAll = () => {
        // Deselect all options
        const updatedOptions = options.map(opt => ({
            ...opt,
            selected: false
        }));

        handleChange(updatedOptions, name);
    };

    return (
        <div className='multi-select-dropdown' ref={dropdownRef}>
            {label && (
                <label className='multi-select-label'>{label}</label>
            )}
            <div className='multi-select-container'>
                <div className='multi-select-tags' onClick={toggleDropdown}>
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
                                            removeTag(option);
                                        }}
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
                        <span className='multi-select-placeholder'>Select options...</span>
                    )}
                </div>
                <button
                    type='button'
                    className={`multi-select-arrow ${isOpen ? 'open' : ''}`}
                    onClick={toggleDropdown}
                >
                    ▼
                </button>
            </div>
            
            {isOpen && (
                <div className='multi-select-options'>
                    {/* Select All / Clear All buttons */}
                    <div className='multi-select-actions'>
                        <button
                            type='button'
                            className='multi-select-action-btn'
                            onClick={selectAll}
                        >
                            Select All
                        </button>
                        <button
                            type='button'
                            className='multi-select-action-btn'
                            onClick={clearAll}
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
                            className={`multi-select-option ${option.selected ? 'selected' : ''}`}
                            onClick={() => handleOptionClick(option)}
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
