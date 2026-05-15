/**
 * Fetches product journey data from our backend using API
 */

const BASE_URL = import.meta.env.DEV
    ? ''
    : 'https://reduse-api-ddfkdgengccka5fz.australiaeast-01.azurewebsites.net'

// Fetch product journey for a given object name
export const fetchProductJourney = async (objectName) => {
    try {
        const res = await fetch(`${BASE_URL}/api/product-journey/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ objectName }),
        })
        if (!res.ok) throw new Error(`HTTP error ${res.status}`)
        return await res.json()
    } catch (e) {
        console.error(`Failed to fetch product journey: ${e}`)
        return null
    }
}
