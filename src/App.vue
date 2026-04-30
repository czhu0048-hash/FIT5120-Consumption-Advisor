<script setup>
import Menubar from 'primevue/menubar'
import { useRouter } from 'vue-router'

const router = useRouter()
const go = (path) => router.push(path)

const navItems = [
  {
    label: 'About',
    command: () => go('/'),
  },
  {
    label: 'Food Guidance',
    items: [
      {
        label: 'Kitchen-raid Recipes',
        command: () => go('/food1'),
      },
      {
        label: 'Food Disposal',
        command: () => go('/food2'),
      },
    ],
  },
  {
    label: 'Clothing Guidance',
    items: [
      {
        label: 'Awareness',
        command: () => go('/clothing/awareness'),
      },
      {
        label: 'Before You Buy',
        command: () => go('/clothing/decision'),
      },
      {
        label: 'Calculator',
        command: () => go('/clothing/calculator'),
      },
    ],
  },
]
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <Menubar :model="navItems" class="app-menubar">
      <template #start>
        <img src="@/assets/Icon_reduse.png" alt="RedUse Logo" class="nav-logo" />
        <span class="logo-text">RedUse</span>
      </template>
    </Menubar>

    <main class="flex-grow-1 main-content">
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

.nav-logo {
  height: 2em;
  width: auto;
}

.logo-text {
  font-size: 1.3rem;
  font-weight: 700;
  color: black;
  font-family: 'Nunito', sans-serif;
  white-space: nowrap;
}
</style>

<style>
.app-menubar.p-menubar {
  background: white;
  border: none;
  border-radius: 0;
  padding: 0.5rem 1.25rem;
  overflow: visible;
}

.app-menubar .p-menubar-item {
  overflow: visible;
}

/* ── All item links: base state ── */
.app-menubar .p-menubar-item-link {
  color: black;
  border-radius: 5rem;
  transition: background-color 0.25s ease-out, color 0.25s ease-out;
  gap: 0.4rem;
}

.app-menubar .p-menubar-item :hover {
  color: black;
}

.app-menubar .p-menubar-submenu {
  position: absolute;
  z-index: 9999;
  overflow: visible;
}

.app-menubar .p-menubar-submenu .p-menubar-item-link {
  color: grey;
}

/* ── Mobile hamburger button — push to the far right ── */
.app-menubar .p-menubar-start {
  flex: 1 1 auto;
}

.app-menubar .p-menubar-button {
  order: 99;
  margin-left: auto;
  color: aliceblue;
  background: transparent;
  border: none;
}

.app-menubar .p-menubar-button:hover {
  background: rgba(255, 255, 255, 0.18);
}

/* Mobile panel */
.app-menubar .p-menubar-mobile .p-menubar-root-list {
  background: darkgreen;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
}
</style>
