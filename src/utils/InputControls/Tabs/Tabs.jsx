import './Tabs.css';

/**
 * Tabs component - Tab navigation for switching between different options
 * @param {Object} props - Component props
 * @param {Array<{value: string, label: string}>} props.options - Available tab options
 * @param {string} props.activeTab - Currently active tab value
 * @param {Function} props.onTabChange - Handler for tab selection changes
 */
export const Tabs = ({ options, activeTab, onTabChange }) => {
    if (!options || !activeTab) {
        return null;
    }

    return (
        <div className='tabs-container'>
            <div className='tabs-list'>
                {options.map((option, index) => (
                    <button
                        key={index}
                        className={`tab-button ${activeTab === option.value ? 'active' : ''}`}
                        onClick={() => onTabChange(option.value)}
                        type='button'
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
};
