<template>
    <div
        style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; gap: 0.75rem;">
        <input v-model="userInput" type="password" placeholder="Please enter website password" style="width: 100vh;"
            @keyup.enter="onClick">
        <button @click="onClick" :disabled="loading">Confirm</button>
        <i v-if="loading" class="pi pi-spin pi-spinner" style="font-size: 2rem; color: green;"></i>
        <label for="" v-if="passwordMessage" style="color: red;">{{ passwordMessage }}</label>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { isPasswordCorrect, validatePassword } from '@/utils/PasswordFetcher';

const userInput = ref("");
const passwordMessage = ref("");
const loading = ref(false);

const onClick = async () => {
    if (loading.value) return;
    loading.value = true;
    passwordMessage.value = "";
    try {
        const valid = await validatePassword(userInput.value);
        if (valid) {
            isPasswordCorrect.value = true;
        } else {
            passwordMessage.value = "Password incorrect. Please try again.";
        }
    } catch {
        passwordMessage.value = "Error connecting to server. Please try again.";
    } finally {
        loading.value = false;
    }
};
</script>