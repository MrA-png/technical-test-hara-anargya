<template >
  
  <SideBar />
  <NavBar />
  <router-view />
  
</template>

<script>
import NavBar from "./components/NavBar.vue";
import SideBar from "./components/SideBar.vue";

export default {
  components: {
    SideBar,
    NavBar,
  },
};
</script>

<style scoped>
/* Styles for body element */
</style>