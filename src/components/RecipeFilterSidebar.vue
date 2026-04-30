<template>
    <aside class="filter-sidebar">
        <div class="row">

            <!-- Duration -->
            <div class="col-12 col-md-6 mb-4">
                <label class="filter-label fw-bold small">Duration (mins)</label>
                <div class="d-flex gap-2 mt-1">
                    <input type="number" class="form-control form-control-sm" placeholder="Min" min="0"
                        :value="recipeFilters.minTime ?? ''"
                        @change="recipeFilters.minTime = toNum($event.target.value)" />
                    <input type="number" class="form-control form-control-sm" placeholder="Max" min="0"
                        :value="recipeFilters.maxTime ?? ''"
                        @change="recipeFilters.maxTime = toNum($event.target.value)" />
                </div>
            </div>

            <!-- Difficulty -->
            <div class="col-12 col-md-6 mb-2">
                <label class="filter-label fw-bold small">Difficulty</label>
                <div class="d-flex gap-2 mt-1">
                    <button v-for="level in difficulties" :key="level" class="btn btn-sm difficulty-btn flex-grow-1"
                        :class="recipeFilters.difficulty === level ? 'active' : ''" @click="toggleDifficulty(level)">
                        {{ level }}
                    </button>
                </div>
            </div>
        </div>
    </aside>
</template>

<script setup>
import { recipeFilters } from '@/utils/recipeFilterInstance'

const difficulties = ['Easy', 'Medium', 'Hard']
const toNum = (val) => val === '' ? null : Number(val)

const toggleDifficulty = (level) => {
    recipeFilters.value.difficulty = recipeFilters.value.difficulty === level ? null : level
}
</script>

<style scoped>
.filter-sidebar {
    border-radius: 8px;
}

.filter-label {
    letter-spacing: 0.04em;
    color: #555;
    display: block;
}

.difficulty-btn {
    background: white;
    border: 1px solid #dddddd;
    color: #444444;
    border-radius: 0.4rem;
    transition: all 0.2s;
}

.difficulty-btn.active {
    background-color: #2e7d32;
    border-color: #2e7d32;
    color: white;
}

.difficulty-btn:hover:not(.active) {
    background-color: #eee;
}
</style>