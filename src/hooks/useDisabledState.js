import { useCallback } from 'react';

/**
 * Custom hook to handle disabled state logic consistently across components
 * @param {boolean} disabled - Whether the component is disabled
 * @param {boolean} isLoading - Whether the component is loading
 * @returns {Object} - Disabled state utilities
 */
export const useDisabledState = (disabled = false, isLoading = false) => {
    const isDisabled = disabled || isLoading;
    
    /**
     * Creates a click handler that respects disabled state
     * @param {Function} handler - The original handler function
     * @returns {Function|undefined} - Disabled-aware click handler
     */
    const createClickHandler = useCallback((handler) => {
        return isDisabled ? undefined : handler;
    }, [isDisabled]);

    /**
     * Creates a disabled-aware event handler
     * @param {Function} handler - The original handler function
     * @returns {Function} - Disabled-aware event handler
     */
    const createEventHandler = useCallback((handler) => {
        return (event) => {
            if (isDisabled) return;
            return handler(event);
        };
    }, [isDisabled]);

    return {
        isDisabled,
        createClickHandler,
        createEventHandler,
    };
};
