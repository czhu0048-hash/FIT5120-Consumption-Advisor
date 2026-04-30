<template>
    <div class="col-12 col-md-6 col-lg-5">
        <div class="card border-0 shadow-sm overflow-hidden h-100">
            <div class="position-relative">
                <img :src="imageSrc" :alt="featureName" class="card-img-top object-fit-cover" style="height: 260px;">
            </div>
            <div class="card-body d-flex flex-column gap-2">
                <h5 class="card-title fw-bold font_sub mb-0">{{ featureName }}</h5>
                <p class="card-text text-muted small">{{ featureDescription }}</p>
                <button class="btn mt-auto align-self-start px-4 fw-semibold"
                    style="background-color: darkgreen; color: white; border-radius: 2rem;" @click="gotoFeature">
                    Explore →
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps({
    featureName: {
        type: String,
        default: () => ("")
    },
    featureDescription: {
        type: String,
        default: () => ("")
    },
    routerPath: {
        type: String,
        default: () => ("")
    },
    imageSrc: {
        type: String,
        default: () => ("")
    },
})

const gotoFeature = () => {
    router.push(props.routerPath)
}

</script>