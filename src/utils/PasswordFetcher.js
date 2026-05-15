import { ref } from "vue"

const BASE_URL = 'https://reduse-api-ddfkdgengccka5fz.australiaeast-01.azurewebsites.net'

export const isPasswordCorrect = ref(false);

export async function validatePassword(password) {
    const response = await fetch(`${BASE_URL}/api/validate-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
    });
    return response.ok;
}

