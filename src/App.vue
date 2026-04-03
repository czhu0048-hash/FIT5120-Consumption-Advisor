<script setup>
// import { useRouter } from 'vue-router';

// const router = useRouter();

// const toHome = () => {
//   router.push("/")
// }
</script>

<template>
  <div class="app-wrapper d-flex flex-row flex-md-column min-vh-100">
    <nav class="nav-sidebar flex-shrink-0" style="background-color:darkgrey;">
      <div class="row align-items-center justify-content-center">
        <label style="font-size: 150%; text-align: center;">Consumption Advisor</label>
      </div>
      <ul class="col-5 d-flex flex-column flex-md-row p-2 m-0">
        <li>
          <router-link to="/" class="nav_item_custom text-black d-block p-2">Dashboard</router-link>
        </li>
        <li>
          <router-link to="/food" class="nav_item_custom text-black d-block p-2">Food Guidance</router-link>
        </li>
        <li>
          <router-link to="/household" class="nav_item_custom text-black d-block p-2">Household</router-link>
        </li>
      </ul>
    </nav>

    <main class="flex-grow-1">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
.nav_item_custom {
  text-decoration: none;
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
