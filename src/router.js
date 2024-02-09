// ./src/router.js

import { createRouter, createWebHistory } from "vue-router";
import Overview from "./components/Overview.vue";
import Dashboard from "./components/Dashboard.vue";

// Define route components
const routes = [
  { path: "/", component: Dashboard },
  { path: "/overview", component: Overview }];
// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

export default router;
