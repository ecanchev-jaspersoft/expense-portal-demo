/**
 * Input Controls Service - Handles API calls for input control dependencies
 */

/**
 * Fetches dependent options for multi-select dropdowns
 * @param {string} uri - The API endpoint URI
 * @param {Object} requestBody - The request body containing all control values
 * @returns {Promise<Object>} - API response with new options for dependent controls
 */
export const doPostToFetchDependentOptions = async (uri, requestBody) => {
    try {
        const response = await fetch(uri, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Remote-Domain": window.location.origin,
                "X-Suppress-Basic": "true",
            },
            body: JSON.stringify(requestBody),
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching dependent options:', error);
        throw error;
    }
};
