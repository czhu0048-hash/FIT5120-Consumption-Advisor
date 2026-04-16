<template>
    <div style="text-align: center;">
        <h1>Understanding Your Environmental Impact
        </h1>
    </div>
    <div class="row">
        <div class="d-flex flex-column align-items-center">
            <div class="row justify-content-center gap-2 mt-5 px-2 w-100">
                <!-- Card 1 -->
                <div class="card sdg-card col-12 col-md-3 p-3 text-center">
                    <div class="mb-2">
                        <i class="pi pi-globe" style="font-size: 2.5rem; color: darkgreen;"></i>
                    </div>
                    <h6 class="fw-bold font_sub">Average Carbon Footprint</h6>
                    <p class="stat-main">16 tons/year</p>
                    <p class="stat-highlight">25%</p>
                    <p class="small text-muted mb-0">reduction goal by 2030</p>
                </div>
                <!-- Card 2 -->
                <div class="card sdg-card col-12 col-md-3 p-3 text-center">
                    <div class="mb-2">
                        <i class="pi pi-trash" style="font-size: 2.5rem; color: darkgreen;"></i>
                    </div>
                    <h6 class="fw-bold font_sub">Food Waste Impact</h6>
                    <p class="stat-main">30–40%</p>
                    <p class="stat-highlight">50%</p>
                    <p class="small text-muted mb-0">can be prevented</p>
                </div>
                <!-- Card 3-->
                <div class="card sdg-card col-12 col-md-3 p-3 text-center">
                    <div class="mb-2">
                        <i class="pi pi-bolt" style="font-size: 2.5rem; color: darkgreen;"></i>
                    </div>
                    <h6 class="fw-bold font_sub">Household Energy</h6>
                    <p class="stat-main">20%</p>
                    <p class="stat-highlight">15%</p>
                    <p class="small text-muted mb-0">typical savings potential</p>
                </div>
            </div>

            <!-- Data Sources card -->
            <div class="row justify-content-center mt-4 px-2 mb-4 w-100">
                <div class="card sdg-card col-12 col-md-10 p-4">
                    <h6 class="fw-bold font_sub mb-3">Data Sources &amp; References</h6>
                    <ul class="small text-muted mb-0 text-start">
                        <li><strong>Carbon Footprint Data:</strong> U.S. Environmental Protection Agency (EPA) —
                            <em>Household Carbon Footprint Calculator</em>
                        </li>
                        <li><strong>Food Waste Statistics:</strong> USDA &amp; EPA — <em>Food Waste FAQs</em></li>
                        <li><strong>Home Energy Usage:</strong> U.S. Department of Energy (DOE) — <em>Energy Saver
                                Guide</em></li>
                        <li><strong>Plant-Based Diet Impact:</strong> University of Oxford Research — <em>Environmental
                                Cost of Food</em></li>
                        <li><strong>Recycling &amp; Waste Reduction:</strong> National Resources Defense Council (NRDC)
                            — <em>Food Waste Resources</em></li>
                    </ul>
                </div>
            </div>

            <div class="mt-5"></div>
        </div>
    </div>
</template>

<style scoped>
.sdg-card {
    border: 1.5px solid darkgreen;
    border-radius: 1rem;
    background-color: #f9fff9;
}

.stat-main {
    font-size: 1.6rem;
    font-weight: 700;
    color: #222;
    margin-bottom: 0.15rem;
}

.stat-highlight {
    font-size: 1.25rem;
    font-weight: 600;
    color: darkgreen;
    margin-bottom: 0.15rem;
}
</style>