/**
 * Fetches clothing/textiles awareness statistics from our backend API
 */

const BASE_URL = import.meta.env.DEV
    ? ''
    : 'https://reduse-api-ddfkdgengccka5fz.australiaeast-01.azurewebsites.net'

const normalizeTextileYear = (item) => ({
    financial_year: item.financial_year,
    financial_year_start: item.financial_year_start,
    disposal: item.Disposal ?? 0,
    international_export: item['International Export'] ?? 0,
    interstate_export: item['Interstate Export'] ?? 0,
    processed_locally: parseFloat(item.processed_locally_including_wte) ?? 0,
    total_generation: item['Total Generation'] ?? 0,
    recovery_rate_pct: parseFloat(item.recovery_rate_pct) ?? 0,
    disposal_rate_pct: parseFloat(item.disposal_rate_pct) ?? 0,
    export_rate_pct: parseFloat(item.export_rate_pct) ?? 0,
})

export const fetchTextileYears = async () => {
    try {
        const res = await fetch(`${BASE_URL}/api/textiles/years/`)
        const data = await res.json()
        return data.map(normalizeTextileYear)
    } catch (e) {
        console.error(`Failed to fetch textile year statistics: ${e}`)
        return []
    }
}
