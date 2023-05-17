<template>
  <v-app>
    <NavBar />
    <v-main class="main">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",

  components: {
    NavBar,
  },
};
</script>
<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  /* color: #a1b1cb; */
}
.main {
  background-color: black;
}
</style>
