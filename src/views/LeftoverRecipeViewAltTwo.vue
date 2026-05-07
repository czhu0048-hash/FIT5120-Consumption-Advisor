<template>
    <div class="d-flex" style="min-height: 100vh;">
        <div class="flex-grow-1 container mt-5">

            <div class="text-center mb-4">
                <h1 class="display-5 fw-normal">
                    <span class="font-inter"><b>Cook with what </b></span>
                    <span class="font-grace">you've got</span>
                </h1>
                <p class="text-secondary fs-8">Add what's in your fridge. We'll do the matching.</p>
            </div>


            <div class="search-bar-container p-4 rounded shadow-sm bg-white mb-4">
                <div class="row g-2 align-items-end">
                    <div class="col-12 col-md-4">
                        <label class="form-label fw-bold d-flex align-items-center"><i class="pi pi-check-circle me-2"
                                style="color: #6b705c;"></i>
                            Ingredients to Include</label>
                        <input class="form-control" type="text" placeholder="e.g. Tomato, Apple"
                            v-model="ingredientInputString" @input="onInputStringChanged" @keyup.enter="applyFilters">
                    </div>
                    <div class="col-12 col-md-4">
                        <label class="form-label fw-bold d-flex align-items-center"><i class="pi pi-times-circle me-2"
                                style="color: #6b705c;"></i>
                            Ingredients to Exclude</label>
                        <input class="form-control" type="text" placeholder="e.g. Nuts, Milk"
                            v-model="ingredientInputStringExclusive" @input="onInputStringExclusiveChanged"
                            @keyup.enter="applyFilters">
                    </div>
                    <div class="col-12 col-md-2">
                        <button class="btn btn-success w-100 fw-bold" @click="applyFilters" :disabled="searching">
                            <i class="pi pi-search me-2"></i>Search
                        </button>
                    </div>
                    <div class="col-12 col-md-2">
                        <button class="btn btn-outline-secondary w-100 fw-bold" @click="resetSearch">
                            <i class="pi pi-refresh me-2"></i>Reset
                        </button>
                    </div>
                </div>

                <div class="mt-3">
                    <a href="javascript:void(0)" class="text-decoration-none small fw-bold text-success color: #555"
                        @click="showFilters = !showFilters">
                        {{ showFilters ? 'Show Fewer Options ▲' : 'Show More Options ▼' }}
                    </a>
                </div>

                <div v-show="showFilters" class="mt-4 pt-3 border-top">
                    <RecipeFilterSidebar />
                </div>
            </div>

            <div class="text-center my-3">
                <i v-if="searching || modalLoading" class="pi pi-spin pi-spinner"
                    style="font-size: 2rem; color: green;"></i>
                <div v-if="errormsg" class="alert alert-danger d-inline-block py-2 px-4 mt-2">
                    {{ errormsg }}
                </div>
            </div>

            <Teleport to="body">
                <div v-if="modalRecipe" class="recipe-modal-backdrop" @click.self="modalRecipe = null">
                    <div class="recipe-modal-dialog">
                        <button class="recipe-modal-close btn btn-sm btn-light" @click="modalRecipe = null">
                            <i class="pi pi-times"></i>
                        </button>
                        <div class="recipe-modal-body">
                            <RecipeCardDetailed :recipe-json="modalRecipe" />
                        </div>
                    </div>
                </div>
            </Teleport>

            <div>
                <div v-if="recipeSearchResults.length > 0" class="row">
                    <div v-for="(result, index) in normalizedResults" :key="index" class="col-12 col-md-3 g-3"
                        @click="openModal(result)" style="cursor: pointer;">
                        <RecipeCardOverview :recipe-json="result"></RecipeCardOverview>
                    </div>
                </div>

                <div v-if="totalPages > 1"
                    class="d-flex justify-content-center align-items-center gap-2 mt-5 mb-4 flex-wrap">
                    <button class="btn btn-outline-success btn-sm" :disabled="currentPage === 1"
                        @click="goToPage(currentPage - 1)">&laquo; Prev</button>
                    <template v-for="page in pageRange" :key="page">
                        <span v-if="page === '...'" class="px-2">…</span>
                        <button v-else class="btn btn-sm"
                            :class="currentPage === page ? 'btn-success' : 'btn-outline-success'"
                            @click="goToPage(page)">{{ page }}</button>
                    </template>
                    <button class="btn btn-outline-success btn-sm" :disabled="currentPage === totalPages"
                        @click="goToPage(currentPage + 1)">Next &raquo;</button>
                </div>

                <div v-if="filteredResults.length > 0" class="text-center text-muted mb-5" style="font-size:0.9rem;">
                    Showing {{ (currentPage - 1) * pageSize + 1 }}–{{ Math.min(currentPage * pageSize,
                        filteredResults.length) }} of {{
                        filteredResults.length }} results
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import RecipeCardOverview from '@/components/RecipeCardOverview.vue';
import RecipeCardDetailed from '@/components/RecipeCardDetailed.vue';
import RecipeFilterSidebar from '@/components/RecipeFilterSidebar.vue';
import { fetchRecipeOverview, fetchRecipeDetailed } from '@/utils/recipeFetcher';
import { passesFilters } from '@/utils/recipeFilterInstance';

const errormsg = ref("");
const searching = ref(false);
const recipeSearchResults = ref([]);
const currentPage = ref(1);
const pageSize = 20;
const modalRecipe = ref(null);
const modalLoading = ref(false);
const ingredientInputString = ref("");
const ingredientInputStringExclusive = ref("");

const showFilters = ref(false);

const totalPages = computed(() => Math.ceil(filteredResults.value.length / pageSize));
const filteredResults = computed(() => recipeSearchResults.value.filter(passesFilters));

// text-input validation (incorrect format)
const isInvalidFormat = (val) => {
    const raw = val.trim();
    if (!raw) return false;

    // check common wrong delimiters: ; / | : + & or multiple words without a comma ","
    const hasWrongSymbols = /[;/|:+&>."']/.test(raw);
    const hasMultipleWordsNoComma = !raw.includes(',') && raw.split(/\s+/).length > 1;


    return hasWrongSymbols || hasMultipleWordsNoComma;
};

const resetSearch = () => {
    ingredientInputString.value = "";
    ingredientInputStringExclusive.value = "";
    recipeSearchResults.value = [];
    errormsg.value = "";
};

watch(filteredResults, (filtered) => {
    if (recipeSearchResults.value.length > 0 && filtered.length === 0) {
        errormsg.value = "No recipes found for the given ingredients and filters."
    } else if (filtered.length > 0) {
        errormsg.value = ""
    }
})

const normalizedResults = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    return filteredResults.value.slice(start, start + pageSize);
});

const pageRange = computed(() => {
    const total = totalPages.value;
    const cur = currentPage.value;
    const pages = [];
    if (total <= 7) {
        for (let i = 1; i <= total; i++) pages.push(i);
    } else {
        pages.push(1);
        if (cur > 3) pages.push('...');
        for (let i = Math.max(2, cur - 1); i <= Math.min(total - 1, cur + 1); i++) pages.push(i);
        if (cur < total - 2) pages.push('...');
        pages.push(total);
    }
    return pages;
});

const onInputStringChanged = () => {
    if (isInvalidFormat(ingredientInputString.value)) {
        errormsg.value = "Please separate ingredients with a comma";
    } else {
        errormsg.value = "";
    }
};

const onInputStringExclusiveChanged = () => {
    if (isInvalidFormat(ingredientInputStringExclusive.value)) {
        errormsg.value = "Please separate ingredients with a comma";
    } else {
        errormsg.value = "";
    }
};

const goToPage = (page) => {
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const openModal = async (recipeObject) => {
    modalRecipe.value = null;
    modalLoading.value = true;
    modalRecipe.value = await fetchRecipeDetailed(recipeObject.id);
    modalLoading.value = false;
};

async function applyFilters() {
    const includeRaw = ingredientInputString.value.trim();
    const excludeRaw = ingredientInputStringExclusive.value.trim();

    if (!includeRaw) {
        errormsg.value = "Please enter at least one ingredient to include.";
        return;
    }

    // Block search if format is invalid in either field
    if (isInvalidFormat(includeRaw) || isInvalidFormat(excludeRaw)) {
        errormsg.value = "Please separate ingredients with a comma";
        return;
    }

    errormsg.value = "";
    searching.value = true;
    const results = await fetchRecipeOverview(includeRaw, excludeRaw);
    recipeSearchResults.value = results;
    currentPage.value = 1;
    searching.value = false;

    if (results.length <= 0) {
        errormsg.value = "No recipes found for the given ingredients and filters.";
    }
}
</script>

<style scoped>
.font-inter {
    font-family: 'Inter', sans-serif;
    color: black;
    overflow-x: hidden;
}


.font-grace {
    font-family: 'Covered By Your Grace';
    color: #009387;
    font-size: clamp(24px, 5vw, 60px);
    margin-bottom: 20px;
    word-spacing: -7px;
}


.search-bar-container {
    background: rgba(255, 255, 255, 0.9) !important;
    border-radius: 15px;
    border: 1px solid #e0e0e0;
}

.font-options {
    color: #555;
}


.form-label {
    color: #444;
    margin-bottom: 4px;
}

.btn-success {
    background-color: #009387 !important;
    border: none;
    height: 38px;
}

.btn-success:hover {
    background-color: #007f70 !important;
}

.recipe-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1050;
    padding: 1rem;
}

.recipe-modal-dialog {
    position: relative;
    max-width: 56rem;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    border-radius: 12px;
    background: white;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}

.recipe-modal-close {
    position: sticky;
    top: 0.5rem;
    float: right;
    margin: 0.5rem 0.5rem 0 0;
    z-index: 10;
}
</style>