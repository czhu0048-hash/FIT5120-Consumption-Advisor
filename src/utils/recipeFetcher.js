/**
 * Fetches recipe data from our backend using API
 */

const BASE_URL = import.meta.env.DEV
    ? ''
    : 'https://reduse-api-ddfkdgengccka5fz.australiaeast-01.azurewebsites.net'

// Normalized Overview data 
const normalizeOverview = (item) => ({
    ...item,
    recipe_name: item.title,
    img_src: item.image_url,
    total_time: item.total_time_mins != null ? `${item.total_time_mins} mins` : '',
})

// Normalized Detailed data
const normalizeDetailed = (item) => ({
    ...item,
    recipe_name: item.title,
    img_src: item.image_url,
    total_time: item.total_time_mins != null ? `${item.total_time_mins} mins` : '',
    ingredients: item.ingredients_clean ?? '',
    directions: item.instructions ?? '',
})

// Raw Overview data
export const fetchRecipeOverview = async (userInput) => {
    try {
        const listRes = await fetch(`${BASE_URL}/api/recipes/?q=${userInput}`)
        const listData = await listRes.json()
        return listData.map(normalizeOverview)
    } catch (e) {
        console.error(`Failed to fetch overview recipe: ${e}`)
        return []
    }

}

// Raw Detailed data
export const fetchRecipeDetailed = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}/api/recipes/${id}/`)
        const data = await res.json()
        return normalizeDetailed(data)
    } catch (e) {
        console.error(`Failed to fetch detailed recipe: ${e}`)
        return {}
    }
}