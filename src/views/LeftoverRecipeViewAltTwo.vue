<template>
    <div class="container basic" style="justify-content: center; align-items: center;">
        <div class="row mt-5">
            <div class="col-8 offset-2 col-md-4 offset-md-4 d-flex gap-2 mb-3">
                <button class="btn btn-outline-secondary flex-fill button_sub" @click="showFilters = !showFilters">
                    <i class="pi pi-filter me-1"></i>Filters
                    <span v-if="activeFilterCount > 0" class="badge bg-primary ms-1">{{ activeFilterCount }}</span>
                </button>
                <button class="btn btn-primary flex-fill button_main" @click="applyFilters"
                    :disabled="searching">Search</button>
            </div>
        </div>

        <!-- Filter Panel -->
        <div v-if="showFilters" class="row mb-4">
            <div class="col-12 col-md-10 offset-md-1 border rounded p-3 bg-light">
                <div class="mb-3">
                    <h6 class="fw-bold mb-2">Ingredients</h6>
                    <div class="d-flex flex-wrap gap-2">
                        <span v-for="item in ingredientFilters" :key="item.value" class="badge rounded-pill px-3 py-2"
                            :class="selectedIngredients.includes(item.value) ? 'bg-primary' : 'bg-secondary'"
                            style="cursor: pointer; user-select: none; font-size: 0.85rem;"
                            @click="toggleIngredient(item.value)">
                            {{ item.label }}
                        </span>
                    </div>
                </div>
                <div>
                    <h6 class="fw-bold mb-2">Category</h6>
                    <div class="d-flex flex-wrap gap-2">
                        <span v-for="item in categoryFilters" :key="item.value" class="badge rounded-pill px-3 py-2"
                            :class="selectedCategories.includes(item.value) ? 'bg-primary' : 'bg-secondary'"
                            style="cursor: pointer; user-select: none; font-size: 0.85rem;"
                            @click="toggleCategory(item.value)">
                            {{ item.label }}
                        </span>
                    </div>
                </div>
                <div class="mt-3 d-flex justify-content-end">
                    <button class="btn btn-sm btn-outline-danger button_sub" @click="clearFilters">Clear All</button>
                </div>
            </div>
        </div>

        <div class="text-center">
            <i v-if="searching" class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
        </div>
        <div style="text-align: center; justify-content: center;">
            <label v-if="errormsg" style="color: crimson;">{{ errormsg }}</label>
        </div>
        <div>
            <div v-if="recipeSearchResults.length > 0" class="row">
                <div v-for="(result, index) in paginatedResults" :key="index" class="col-12 col-md-3"
                    @click="toRecipeDetailed(result)">
                    <RecipeCardOverview :recipe-json="result"></RecipeCardOverview>
                </div>
            </div>
            <!-- Pagination controls -->
            <div v-if="totalPages > 1"
                class="d-flex justify-content-center align-items-center gap-2 mt-4 mb-4 flex-wrap">
                <button class="btn btn-outline-primary btn-sm button_sub" :disabled="currentPage === 1"
                    @click="goToPage(currentPage - 1)">&laquo; Prev</button>
                <template v-for="page in pageRange" :key="page">
                    <span v-if="page === '...'" class="px-2">…</span>
                    <button v-else class="btn btn-sm button_main"
                        :class="page === currentPage ? 'btn-primary' : 'btn-outline-primary'" @click="goToPage(page)">{{
                            page }}</button>
                </template>
                <button class="btn btn-outline-primary btn-sm button_sub" :disabled="currentPage === totalPages"
                    @click="goToPage(currentPage + 1)">Next &raquo;</button>
            </div>
            <div v-if="recipeSearchResults.length > 0" class="text-center text-muted mb-3" style="font-size:0.9rem;">
                Showing {{ (currentPage - 1) * pageSize + 1 }}–{{ Math.min(currentPage * pageSize,
                    recipeSearchResults.length) }} of
                {{ recipeSearchResults.length }} results
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import Papa from 'papaparse';
import RecipeCardOverview from '@/components/RecipeCardOverview.vue';
import { routerPushWithBase } from '@/utils/routerManipulation';
import { useRouter } from 'vue-router';
import { selectedRecipe } from '@/utils/recipeSelector';
import { ingredientFilter as ingredientFilters, dietaryFilter as categoryFilters } from '@/utils/recipeFilters';

const errormsg = ref("");
const searching = ref(false);
const recipeSearchResults = ref([]);
const allRecipes = ref([]);
const showFilters = ref(false);
const selectedIngredients = ref([]);
const selectedCategories = ref([]);
const currentPage = ref(1);
const pageSize = 20;

const activeFilterCount = computed(() => selectedIngredients.value.length + selectedCategories.value.length);

const totalPages = computed(() => Math.ceil(recipeSearchResults.value.length / pageSize));

const paginatedResults = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    return recipeSearchResults.value.slice(start, start + pageSize);
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

const goToPage = (page) => {
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const toggleIngredient = (value) => {
    const idx = selectedIngredients.value.indexOf(value);
    if (idx === -1) selectedIngredients.value.push(value);
    else selectedIngredients.value.splice(idx, 1);
};

const toggleCategory = (value) => {
    const idx = selectedCategories.value.indexOf(value);
    if (idx === -1) selectedCategories.value.push(value);
    else selectedCategories.value.splice(idx, 1);
};

const clearFilters = () => {
    selectedIngredients.value = [];
    selectedCategories.value = [];
};

onMounted(async () => {
    try {
        searching.value = true;
        const res = await fetch(import.meta.env.BASE_URL + 'recipes.csv');
        const csvText = await res.text();
        const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
        allRecipes.value = parsed.data;
        recipeSearchResults.value = parsed.data;
    } catch {
        errormsg.value = "Failed to load recipe data.";
    } finally {
        searching.value = false;
    }
});

const router = useRouter();

const toRecipeDetailed = (recipeObject) => {
    router.push(routerPushWithBase("/recipeDetailed"));
    selectedRecipe.value = recipeObject;
};

function applyFilters() {
    errormsg.value = "";
    searching.value = true;

    const hasIngredientFilter = selectedIngredients.value.length > 0;
    const hasCategoryFilter = selectedCategories.value.length > 0;

    if (!hasIngredientFilter && !hasCategoryFilter) {
        recipeSearchResults.value = allRecipes.value;
        currentPage.value = 1;
        searching.value = false;
        return;
    }

    const results = allRecipes.value
        .map(recipe => {
            const ingredientsLower = (recipe.ingredients || "").toLowerCase();
            const matchCount = hasIngredientFilter
                ? selectedIngredients.value.filter(kw => ingredientsLower.includes(kw)).length
                : 1;
            return { ...recipe, matchCount };
        })
        .filter(r => {
            if (hasIngredientFilter && r.matchCount === 0) return false;
            if (hasCategoryFilter) {
                const cuisinePath = (r.cuisine_path || "");
                return selectedCategories.value.some(cat => cuisinePath.includes(cat));
            }
            return true;
        })
        .sort((a, b) => {
            if (b.matchCount !== a.matchCount) return b.matchCount - a.matchCount;
            return (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0);
        });

    recipeSearchResults.value = results;
    currentPage.value = 1;
    searching.value = false;

    if (results.length === 0) {
        errormsg.value = "No recipes found matching the selected filters.";
    }
}
</script>