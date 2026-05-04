<template>
    <!-- Intro -->
    <ClothingActionCard v-if="questionIndex === -1" icon="pi pi-check-square" :title="title" :description="description"
        :leftButtonLabel="confirmLabel" :rightButtonLabel="skipLabel" :onLeftClick="startQuestionaire"
        :onRightClick="() => router.push('/')" />

    <!-- Question cards -->
    <ClothingQuestionaireSubCard v-else-if="questions.length > 0 && questionIndex < questions.length"
        :key="questionIndex" :question="questions[questionIndex]" :questionNumber="questionIndex + 1"
        :totalQuestions="questions.length" />

    <!-- Results card -->
    <ClothingQuestionaireResultCard v-else-if="resultsData" :results="resultsData"
        @openCalculator="$emit('openCalculator')" />

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getQuestionIndex, moveToNextQuestion, resetQuestionaire } from '@/utils/questionaireController'
import ClothingActionCard from '@/components/ClothingActionCard.vue'
import ClothingQuestionaireSubCard from '@/components/ClothingQuestionaireSubCard.vue'
import ClothingQuestionaireResultCard from '@/components/ClothingQuestionaireResultCard.vue'

const router = useRouter()

defineProps({
    title: { type: String, required: true },
    description: { type: String },
    confirmLabel: { type: String, required: true },
    skipLabel: { type: String, required: true },
})

defineEmits(['openCalculator'])

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
    background-color: darkgreen;
    border-color: transparent;
    border-radius: 1rem;
    box-shadow: 5rem;
    padding: 2rem;
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