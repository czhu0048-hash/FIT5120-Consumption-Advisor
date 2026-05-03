<template>
    <div style="display: flex; justify-content: center; align-items: center; width: 100%;">

        <!-- Intro -->
        <div v-if="questionIndex === -1" class="container card gap-5 col-12 col-md-6" style="justify-content: center; align-items: center; text-align: center;
            background-color: #eee; padding-left: 5%; padding-right: 5%; padding-top: 3%;">
            <h1 style="font-weight: bold;">{{ title }}</h1>
            <label v-if="description" style="color: #555; width: 75%;">{{ description }}</label>
            <div class="row gap-2 mb-5" style="width: 100%; justify-content: center;">
                <button class="questionaireButton" @click="startQuestionaire">{{ confirmLabel }}</button>
                <button class="questionaireButton questionaireSubButton" @click="$router.push('/')">{{ skipLabel
                }}</button>
            </div>
        </div>

        <!-- Question cards -->
        <ClothingQuestionaireSubCard v-else-if="questions.length > 0 && questionIndex < questions.length"
            :key="questionIndex" :question="questions[questionIndex]" :questionNumber="questionIndex + 1"
            :totalQuestions="questions.length" />

        <!-- Results card -->
        <ClothingQuestionaireResultCard v-else-if="resultsData" :results="resultsData" />

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getQuestionIndex, moveToNextQuestion, resetQuestionaire } from '@/utils/questionaireController'
import ClothingQuestionaireSubCard from '@/components/ClothingQuestionaireSubCard.vue'
import ClothingQuestionaireResultCard from '@/components/ClothingQuestionaireResultCard.vue'

defineProps({
    title: { type: String, required: true },
    description: { type: String },
    confirmLabel: { type: String, required: true },
    skipLabel: { type: String, required: true },
})

const questions = ref([])
const resultsData = ref(null)
const questionIndex = getQuestionIndex

onMounted(async () => {
    // Fetch questionaire json data
    resetQuestionaire()
    const base = import.meta.env.BASE_URL
    const [qRes, rRes] = await Promise.all([
        fetch(base + 'questions.json'),
        fetch(base + 'questionaireResults.json'),
    ])
    questions.value = (await qRes.json()).questions
    resultsData.value = await rRes.json()
})

const startQuestionaire = () => {
    moveToNextQuestion()
}
</script>


<style>
h1 {
    font: bolder;
}

.questionaireButton {
    background-color: darkslateblue;
    border-color: transparent;
    border-radius: 1rem;
    box-shadow: 5rem;
    padding: 3%;
    width: auto;
    color: white;
    font-size: 100%;
    transition: all 0.2s;
}

.questionaireSubButton {
    background-color: transparent;
    color: #555;
    border-color: #555;
    border-style: solid;
}

.questionaireButton:hover {
    color: black;
    background-color: white;
    border-color: black;
    border-style: solid;
}
</style>