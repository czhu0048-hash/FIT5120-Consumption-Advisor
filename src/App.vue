<script setup>
// import { useRouter } from 'vue-router';

// const router = useRouter();

// const toHome = () => {
//   router.push("/")
// }
</script>

<template>
  <div class="app-wrapper d-flex flex-row flex-md-column min-vh-100">
    <nav class="nav-sidebar flex-shrink-0 bg_main">
      <div class="row align-items-center justify-content-center">
        <label class="font_main" style="font-size: 150%; text-align: center;">Consumption Advisor</label>
      </div>
      <ul class="col-5 d-flex flex-column flex-md-row p-2 m-0">
        <li class="m-2">
          <router-link to="/" class="nav_item_custom text-black d-block p-2 button_sub">Dashboard</router-link>
        </li>
        <li class="m-2">
          <router-link to="/food" class="nav_item_custom d-block p-2 button_sub">Food
            Guidance</router-link>
        </li>
        <li class="m-2">
          <router-link to="/household" class="nav_item_custom d-block p-2 button_sub">Household</router-link>
        </li>
      </ul>
    </nav>

    <main class="flex-grow-1 basic">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
.nav_item_custom {
  text-decoration: none;
  color: black;
  transition: background-color 0.3s ease-out, color 0.3s ease-out;
}

.nav_item_custom:hover {
  background-color: white;
}

.nav_item_custom.router-link-active {
  background-color: white;
  font-weight: bold;
}


ul {
  list-style: none;
}

/* Movile nav bar */
.nav-sidebar {
  width: 120px;
  min-height: 100vh;
}

/* Desktop nav bar */
@media (min-width: 768px) {
  .nav-sidebar {
    width: 100%;
    min-height: auto;
  }

}
</style>
