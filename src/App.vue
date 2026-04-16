<script setup>

</script>

<template>
  <div class="app-wrapper d-flex flex-row flex-md-column min-vh-100">
    <nav class="nav-sidebar flex-shrink-0 bg_main">
      <div class="nav-brand d-flex align-items-center justify-content-center gap-2">
        <img src="@/assets/Icon_reduse.png" alt="RedUse Logo" class="nav_logo" />
        <span class="font_main nav-brand-text">RedUse</span>
      </div>
      <ul class="nav-links w-100 d-flex flex-column flex-md-row p-0 m-0">
        <li class="nav-link-item">
          <router-link to="/" class="nav_item_custom d-flex align-items-center justify-content-center gap-2">
            <!-- <i class="pi pi-chart-bar"></i> -->
            <span>Awareness</span>
          </router-link>
        </li>
        <li class="nav-link-item">
          <router-link to="/food" class="nav_item_custom d-flex align-items-center justify-content-center gap-2">
            <!-- <i class="pi pi-apple"></i> -->
            <span>Food Guidance</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <main class="flex-grow-1 basic main-content">
      <div class="content-layer">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<style scoped>
.main-content {
  position: relative;
  background-image: url('./assets/BackgroundBlurred.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.content-layer {
  position: relative;
  z-index: 1;
}

/* Brand */
.nav-brand {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}

.nav-brand-text {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  color: white;
}

.nav_logo {
  height: 2em;
  width: auto;
  display: block;
}

/* Nav links list */
ul.nav-links {
  list-style: none;
}

.nav-link-item {
  width: 100%;
}

/* Individual link */
.nav_item_custom {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.65rem 1.25rem;
  border-radius: 0.5rem;
  margin: 0.2rem 0.5rem;
  transition: background-color 0.2s ease, color 0.2s ease;
  gap: 0.5rem;
}

.nav_item_custom i {
  font-size: 1rem;
  opacity: 0.85;
}

.nav_item_custom:hover {
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
}

.nav_item_custom.router-link-active {
  background-color: rgba(255, 255, 255, 0.25);
  color: white;
  box-shadow: inset 3px 0 0 white;
}

/* Mobile sidebar */
.nav-sidebar {
  width: 130px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Desktop top bar */
@media (min-width: 800px) {
  .nav-sidebar {
    width: 100%;
    min-height: auto;
    flex-direction: row;
    align-items: center;
  }

  .nav-brand {
    border-bottom: none;
    border-right: 1px solid rgba(255, 255, 255, 0.15);
    padding: 0.5rem 1.25rem;
    white-space: nowrap;
  }

  ul.nav-links {
    flex-direction: row !important;
    padding: 0.25rem 0.5rem !important;
  }

  .nav-link-item {
    width: auto;
  }

  .nav_item_custom.router-link-active {
    box-shadow: inset 0 -3px 0 white;
  }
}
</style>
